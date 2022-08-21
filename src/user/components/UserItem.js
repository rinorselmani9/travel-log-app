import React from 'react'
import Avatar from '../../shared/components/UI Elements/Avatar'
import Card from '../../shared/components/UI Elements/Card'
import './UserItem.css'
import {Link} from 'react-router-dom'


const UserItem = props => {
    return (
     
      
        <Card className="user-item">
          <Link to={`/${props.id}/places`}>

          <Avatar img={props.img}/>

          <div className='user-item__info'>
            <h2>{props.fName} {props.lName}</h2>
            <h3>{props.places} Places</h3>

          </div>
          </Link>
        </Card>
  )
}

export default UserItem