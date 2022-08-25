import React,{ useContext} from 'react'
import { NavLink } from 'react-router-dom'
import './NavLink.css'
import { AuthContext } from '../../context/authContext'

const Navlink = props => {
    const auth = useContext(AuthContext)
  return (
    <div className='nav-links'>
        <li id='list-item'>
            <NavLink to='/'>Users</NavLink>
        </li>

        {auth.isLoggedIn &&
            <li id='list-item'>
                <NavLink to='/places'>Places</NavLink>
            </li>
        }
        

        {auth.isLoggedIn && 
            <li id='list-item'>
                <NavLink to='/newplaces'>Add Places</NavLink>
            </li>}

        {!auth.isLoggedIn &&
            <li id='list-item'>
                <NavLink to='/login'>Login</NavLink>
            </li>
        }    
        {!auth.isLoggedIn && 
            <li id='list-item'>
                <NavLink to='/register'>Register</NavLink>
            </li>
        }
        {auth.isLoggedIn && 
            <buton id='list-item' onClick={()=>auth.logout()}>
                Log out
            </buton>}
        
    </div>
  )
}

export default Navlink