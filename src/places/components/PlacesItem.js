import React, { useState } from 'react'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UI Elements/Card'
import './PlacesItem.css'

const PlacesItem = props => {

  
  const [showAlert,setShowAlert] = useState(false)
  
  const deleteHandler = () => {
    setShowAlert(true)
  }
  
  const deletePlace = () => {
    console.log('Deleted places ' + props.id);
  }

  const deletePlaceNegative = () => {
    setShowAlert(false)
  }


  if(showAlert){
    return(
     <Card className='places-item-delete'>
        <h1>Do you want to delete {props.title}?</h1>
        <Button danger onClick={deletePlace}>Yes!</Button>
        <Button d onClick={deletePlaceNegative}>No,Go back!</Button>
    </Card>
    )
  }else{
    return (

    <Card className='places-item'>

            
            <div className='places-item__info'>
                <img src={props.image}></img>
                <h3>{props.title}</h3>

                <h4>{props.description}</h4>
                <div>
                  <Button to = {`/places/${props.id}`}></Button>
                  <Button href></Button>
                  <Button danger onClick={deleteHandler}>Delete</Button>
                </div>
            </div>
            
       
    </Card>
  )
  }
}

export default PlacesItem