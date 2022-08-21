import React from 'react'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UI Elements/Card'
import './PlacesItem.css'

const PlacesItem = props => {
  return (
    <Card className='places-item'>

            
            <div className='places-item__info'>
                <img src={props.image}></img>
                <h3>{props.title}</h3>

                <h4>{props.description}</h4>
                <div>
                  <Button to = {`/places/${props.id}`}></Button>
                  <Button href></Button>
                  <Button danger>Delete</Button>
                </div>
            </div>
            
       
    </Card>
  )
}

export default PlacesItem