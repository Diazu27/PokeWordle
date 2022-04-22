import React from 'react'
import {FaWikipediaW} from 'react-icons/fa'

const FinalModal = () => {

    let imgUrl = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/4/41/latest/20190811112248/EP803_Charizard_de_Ash.png/1200px-EP803_Charizard_de_Ash.png';
  return (  
    <div className='ModalBox'>
        <div className='Modal'>
            <div className='ModalImg'style={{backgroundImage: `url(${imgUrl})`}}  >
            </div>
            <div className='ModalCont'>
                <div className='textSection'>
                    <h1>Congratulations 🎉</h1>

                    <h2>🔥 The pokemon is Charizard </h2>
                    <p>
                        <span>Charizard</span> es una de las 898 criaturas ficticias de la franquicia Pokémon. Se trata de un pokémon tipo Fuego/Volador, que aparece por primera vez en Pokémon Red y Blue
                    </p>
                </div>

                <div className='buttonSection'>
                    <a className='Btn-wiki'><FaWikipediaW className='i'/>Watch</a>
                    <a className='Btn-play'>Play again</a>
                </div>
            </div>
            
        </div>
    </div>
  ) 
}

export default FinalModal   