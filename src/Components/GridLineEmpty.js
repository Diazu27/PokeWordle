import React from 'react'
import LetterBox from './LetterBox'

const GridLineEmpty = ({secretWord}) => {
  return (
    <div className='GridLine'>
        {Array.from(Array(secretWord.length)).map((_,i)=><LetterBox key={i} lt={''} status={''}/>)}  
    </div>
  )
}

export default GridLineEmpty