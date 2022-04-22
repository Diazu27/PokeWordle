import React, {useEffect, useState } from 'react'
import Header from './Components/Header'
import { WordGrid } from './Components/WordGrid'

const App = () => {
  
  const keys = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z"];

  //Variables and states
  let secretWord = "ABEJA";
  let secretLength = secretWord.length;
  let LimitTries = 6; 

  const [CurrentWord, setCurrentWord] = useState("")
  const [tries, setTries] = useState(1);
  const [ListWord, setListWord] = useState([]);
  const [Status, setStatus] = useState('Playing');

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
      setListWord([...ListWord, CurrentWord])
      setStatus("Win");
      console.log("ganó");
      return;
    }


    if(tries === LimitTries && Status === 'Playing'){
      console.log("perdió")
      setListWord([...ListWord, CurrentWord])
      setTries(tries+1);
      setStatus("Loss");
      return;
    }

    setTries(tries+1);
    setListWord([...ListWord, CurrentWord])
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
      <Header tries={tries} />
      <WordGrid CurrentWord={CurrentWord} ListWord={ListWord} secretWord={secretWord} tries={tries} LimitTries={LimitTries} Status={Status} />
    </div>
  )
}

export default App