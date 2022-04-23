import React, {useEffect, useState } from 'react'
import Header from './Components/Header'
import Keyboard from './Components/Keyboard';
import { WordGrid } from './Components/WordGrid'


import confetti from 'canvas-confetti';
import FinalModal from './Components/FinalModal';
import { GameStatus, keys } from './Types/Types';
import axios from 'axios';

const App = () => {
  //Sounds
  const LossSound = new Audio("Sounds/GameLoss.wav");
  const WinSound = new Audio("Sounds/GameWin.wav");

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  const getPokemon=()=>{
    let id = getRandomInt(0,500);

    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((Response)=>{
          setPokemon(Response.data);
          setsecretWord(Response.data.name.toUpperCase());       
     })
     axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((Response)=>{
        setPokemonDesc(Response.data.flavor_text_entries[6].flavor_text.replace('\n',' ').replace('\f',' '));
     })
}

  //api request
  const [Pokemon, setPokemon] = useState({})
  const [secretWord, setsecretWord] = useState("")
  const [pokemonDesc, setPokemonDesc] = useState("");
  
  useEffect(() => {
    getPokemon();
  },[])
  
 // let secretWord = "abeja";
  //Variables and states
  let secretLength = secretWord.length;
  let LimitTries = 6; 



  const [CurrentWord, setCurrentWord] = useState("")
  const [tries, setTries] = useState(1);
  const [ListWord, setListWord] = useState([]);
  const [Status, setStatus] = useState(GameStatus.Playing);
  const [LetterList, setLetterList] = useState([]);

  //functions
  const resetGame = ()=>{
    getPokemon();
    setCurrentWord("")
    setTries(1);
    setListWord([]);
    setStatus(GameStatus.Playing);
    setLetterList([])
  }

  const handleKey = (event)=>{
    const letter = event.key.toUpperCase();
    if(event.key === 'Enter' && CurrentWord.length === secretLength && Status === GameStatus.Playing ){
       onEnter();
      return;
    }
    if(event.key === 'Backspace' && CurrentWord.length > 0){
        onDelete();
      return;
    }
    
    if(CurrentWord.length > secretLength-1) return;

    if(keys.includes(letter)){
      onInput(letter);
      return;
    }    
  }

  const onInput=(letter)=>{
      let word = CurrentWord+letter;
      setCurrentWord(word);
  }

  const onEnter=()=>{
    //ganó
    if(CurrentWord === secretWord){
      setListWord([...ListWord, CurrentWord]);
      setStatus(GameStatus.GameWin);
      confetti();
      WinSound.play();
      return;
    }

    if(tries === LimitTries && Status === GameStatus.Playing){
      setListWord([...ListWord, CurrentWord])
      setTries(tries+1);
      LossSound.play();
      setStatus(GameStatus.GameLoss);
      return;
    }

    setTries(tries+1);
    setListWord([...ListWord, CurrentWord]);

    //letters used
    let lettersUsedWord = [];
    CurrentWord.split("").forEach((e)=>{
      if(!lettersUsedWord.includes(e)){
        lettersUsedWord.push(e)       
      }
    })
    let finalLetter=[];
    lettersUsedWord.forEach((e)=>{
      if(!CurrentWord.split().includes(e)){
        finalLetter.push(e);
      }
    })

    let finallist = finalLetter.concat(LetterList);
    setLetterList(finallist);
    
    setCurrentWord("");
    return;
    
  }

  const onDelete=()=>{
    let word = CurrentWord.slice(0,-1);
    setCurrentWord(word);
  }

  //Catch keys
  useEffect(() => {
    document.addEventListener("keydown",handleKey);
    return () => {
      document.removeEventListener("keydown",handleKey);
    }
  })
  

  return (
    <div className='container'>
      {Status === GameStatus.GameWin || Status === GameStatus.GameLoss ? <FinalModal resetGame={resetGame} pokemonDesc={pokemonDesc} Pokemon={Pokemon} Status={Status}/> : ''}
      <Header tries={tries} />
      <WordGrid CurrentWord={CurrentWord} ListWord={ListWord} secretWord={secretWord} tries={tries} LimitTries={LimitTries} Status={Status} />
      <Keyboard keys={keys} LetterList={LetterList}/>
    </div>
  )
}

export default App