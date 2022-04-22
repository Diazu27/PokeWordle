import React from 'react'

const LetterBox = ({lt, status}) => {
  return (
    <div className={`LetterBox ${status}`}>{lt}</div>
  )
}

export default LetterBox