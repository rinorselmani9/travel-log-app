import React from 'react'
import {Link} from 'react-router-dom'
import './Button.css'

const Button = props => {
    
    if(props.href){
        return (
                <button className='href'>My HREF Button</button>
            )
    }
    if(props.to){
        return(
        <Link to={props.to}>
            <button className='link'>Edit</button>
        </Link>
        )
    }
    if(props.danger){
        return(
            <button className='danger' onClick={props.onClick}>{props.children}</button>
        )
    }
    

    return (
        <>
            <button className='my-button' onClick={props.onClick}>{props.children}</button>
        </>
    )
 
}

export default Button