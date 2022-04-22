import React, {useEffect, useState } from 'react'
import Header from './Components/Header'
import Keyboard from './Components/Keyboard';
import { WordGrid } from './Components/WordGrid'


import confetti from 'canvas-confetti';
import FinalModal from './Components/FinalModal';

const App = () => {
  
  const keys = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  //Sounds

  const WinSound = new Audio("Sounds/GameWin.wav");
  const LossSound = new Audio("Sounds/GameLoss.wav");

  //Variables and states
  let secretWord = "ABEJA";
  let secretLength = secretWord.length;
  let LimitTries = 6; 

  const [CurrentWord, setCurrentWord] = useState("")
  const [tries, setTries] = useState(1);
  const [ListWord, setListWord] = useState([]);
  const [Status, setStatus] = useState('Playing');
  const [LetterList, setLetterList] = useState([]);

  //functions

  const handleKey = (event)=>{
    const letter = event.key.toUpperCase();

    if(event.key === 'Enter' && CurrentWord.length === secretLength && Status === 'Playing' ){
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
      setStatus("Win");
      confetti();
      WinSound.play();
      console.log("ganó");
      return;
    }


    if(tries === LimitTries && Status === 'Playing'){
      console.log("perdió")
      setListWord([...ListWord, CurrentWord])
      setTries(tries+1);
      LossSound.play();
      setStatus("Loss");
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

      {Status === 'Win' ? <FinalModal/> : ''}
      <Header tries={tries} />
      <WordGrid CurrentWord={CurrentWord} ListWord={ListWord} secretWord={secretWord} tries={tries} LimitTries={LimitTries} Status={Status} />
      <Keyboard keys={keys} LetterList={LetterList}/>
    </div>
  )
}

export default App