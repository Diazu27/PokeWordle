import React from 'react'
import {FaWikipediaW} from 'react-icons/fa'
import { GameStatus } from '../Types/Types';

const FinalModal = ({resetGame,Status,Pokemon, pokemonDesc}) => {

  return (  
    <div className='ModalBox'>
        <div className='Modal'>
            <div className='ModalImg'style={{backgroundImage: `url(${Pokemon.sprites.front_default})`}}  >
            </div>
            <div className='ModalCont'>
                <div className='textSection'>

                    {Status === GameStatus.GameWin ? <h1>Congratulations 🎉</h1> : <h1>Good luck next time 😥</h1> }
                    
                    <h2>🔥 The pokemon is {Pokemon.name} </h2>
                    <p>
                        {pokemonDesc}
                    </p>
                </div>

                <div className='buttonSection'>
                    <a className='Btn-wiki' href={`https://pokemon.fandom.com/es/wiki/${Pokemon.name}`} target="_blank" rel="noopener noreferrer"><FaWikipediaW className='i'/>More</a>
                    <a className='Btn-play' href={() => false} onClick={()=>{resetGame()}}>Play again</a>
                </div>
            </div>
            
        </div>
    </div>
  ) 
}

export default FinalModal   