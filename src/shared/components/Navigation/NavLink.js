import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavLink.css'

const Navlink = () => {
  return (
    <div className='nav-links'>
        <li id='list-item'>
            <NavLink to='/'>Users</NavLink>
            </li>
        <li id='list-item'>
            <NavLink to='/places'>Places</NavLink>
        </li>
        <li id='list-item'>
            <NavLink to='/newplaces'>Add Places</NavLink>
        </li>
    </div>
  )
}

export default Navlink