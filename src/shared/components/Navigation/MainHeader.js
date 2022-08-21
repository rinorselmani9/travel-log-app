import React from 'react'
import Navigation from './Navigation'
import './MainHeader.css'

const MainHeader = () => {
  return (
    <div className='main-header'>

        <div className='logo'>
            <h1>Travel Log</h1>
        </div>
        
        <div className='navigation'>
            <Navigation/>
        </div>
    </div>
  )
}

export default MainHeader