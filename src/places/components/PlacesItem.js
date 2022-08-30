import React, { useState, useContext } from 'react'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UI Elements/Card'
import './PlacesItem.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../shared/context/authContext'

const PlacesItem = (props) => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)

  const deleteHandler = () => {
    setShowAlert(true)
  }
  const deletePlace = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/places/delete/${props.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Invalid place')
      }
    } catch (err) {
      throw new Error(err.message)
    }
    setShowAlert(false)
  }

  const deletePlaceNegative = () => {
    setShowAlert(false)
  }

  if (showAlert) {
    return (
      <Card className='places-item-delete'>
        <h1>Do you want to delete {props.title}?</h1>
        <Button danger onClick={deletePlace}>
          Yes!
        </Button>
        <Button d onClick={deletePlaceNegative}>
          No,Go back!
        </Button>
      </Card>
    )
  } else {
    return (
      <Card className='places-item'>
        <div className='places-item__info'>
          <img src={props.image}></img>
          <h3>{props.title}</h3>

          <h4>{props.description}</h4>
          <h4>{props.address}</h4>
          <div>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button href></Button>
            <Button danger onClick={deleteHandler}>
              Delete
            </Button>
          </div>
        </div>
      </Card>
    )
  }
}

export default PlacesItem
