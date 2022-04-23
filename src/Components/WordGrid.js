import { GameStatus } from '../Types/Types';
import CurrentGridline from './CurrentGridline'
import GridLine from './GridLine'
import GridLineEmpty from './GridLineEmpty'

export const WordGrid = ({CurrentWord,ListWord,secretWord,tries,LimitTries,Status}) => {
  
  let cont = 0;

  if(tries < LimitTries){
    cont = LimitTries-tries;
  }else{
    cont = 0;
  }

  return (
    <div className='WordGrid'>
      {ListWord.map((w,i)=><GridLine word={w} key={i} secretWord={secretWord}/>)}
      {Status === GameStatus.Playing ? <CurrentGridline word={CurrentWord} secretWord={secretWord}/> : ''}
      {Array.from(Array(cont)).map((_,i)=> <GridLineEmpty key={i} secretWord={secretWord}/>)}
    </div>
  )
}
