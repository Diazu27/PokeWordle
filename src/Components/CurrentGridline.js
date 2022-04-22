import React from 'react'
import LetterBox from './LetterBox'

const CurrentGridline = ({word, secretWord}) => {
  return (
    <div className='GridLine'>
       {word.split("").map((letter,i)=><LetterBox key={i} lt={letter} status={''}/> )}
       {Array.from(Array(secretWord.length-word.length)).map((_,i)=><LetterBox key={i} lt={''} status={''}/>)}
    </div>
  )
}

export default CurrentGridline