import React from 'react'

const Keyboard = ({keys,LetterList}) => {

    const setStatus=(letter)=>{
        if(LetterList.includes(letter)) return 'KeyUsed'
        return '';
    }



  return (
    <div className='Keyboard'>
       {
          keys.map((e,i)=><div key={i} className={`Key ${setStatus(e)}`}>{e}</div>)
       }
    </div>
  )
}

export default Keyboard