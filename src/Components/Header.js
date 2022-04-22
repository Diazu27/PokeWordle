import React from 'react'
import {MdCatchingPokemon} from 'react-icons/md'
import {AiFillSetting} from 'react-icons/ai'

const Header = ({tries}) => {
  return (
    <div className='Header'>
        <AiFillSetting className='Icon'/>
        <h1> PokeWordle</h1>
        <div>
            <MdCatchingPokemon className='Icon'/>
            <p>{tries-1}/6</p>
        </div>
    </div>
  )
}

export default Header