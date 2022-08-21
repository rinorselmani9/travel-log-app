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
                fName={user.firstName}
                lName={user.lastName}
                places={user.places}
                img={user.image}
            />
        )}
    </div>    
  )
}

export default UserList