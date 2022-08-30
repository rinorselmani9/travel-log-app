import React from 'react'
import UserItem from './UserItem'
import './UserList.css'

const UserList = props => {
  
  return (
    <div className='user-list'>
        {props.items.map((user)=>
            <UserItem
                key={user.id}
                id={user.id}
                name={user.name}
                places={user.places.length}
                img={user.image}
            />
        )}
    </div>    
  )
}

export default UserList