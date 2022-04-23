import { letterStatus } from '../Types/Types'
import LetterBox from './LetterBox'

const GridLine = ({word, secretWord}) => {

    const CheckLetter= (letter,position) => {
      if(letter.toUpperCase() === secretWord[position].toUpperCase()){
        return letterStatus.Ok
      }else if(secretWord.toUpperCase().includes(letter.toUpperCase())){
        return letterStatus.Exist
      }else{
        return letterStatus.No
      }
    }
      
  return (
    <div className='GridLine'>
        {Array.from(Array(secretWord.length)).map((_,i)=><LetterBox key={i} lt={word[i]} status={CheckLetter(word[i],i)}/>)}  
    </div>
  )
}

export default GridLine