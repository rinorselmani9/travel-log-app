import React, { useState } from 'react'
import PlacesItem from './PlacesItem'
import './PlacesList.css'

const PlacesList = (props) => {
  
  return (
    <div className='places-list'>
      {props.items.map((places) => (
        <PlacesItem
          key={places._id}
          id={places._id}
          title={places.title}
          description={places.description}
          image={places.image}
          address={places.address}
          creator={places.creator}
        />
      ))}
    </div>
  )
}

export default PlacesList
