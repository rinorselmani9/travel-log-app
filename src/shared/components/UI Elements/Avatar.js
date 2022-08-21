import React from 'react'
import './Avatar.css'

const Avatar = props => {
  return (
    <div className='avatar'>
        <img
            src={props.img}
        >
        </img>
    </div>
  )
}

export default Avatar