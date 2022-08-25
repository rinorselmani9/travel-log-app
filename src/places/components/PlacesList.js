import React from 'react'
import PlacesItem from './PlacesItem'
import './PlacesList.css'

const PlacesList = props => {

    
  return (
        <div className='places-list'>
            {props.items.map((places)=>
                <PlacesItem
                    key={places.id}
                    id={places.id}
                    title={places.title}
                    description={places.description}
                    image={places.imageUrl}
                    address={places.address}
                    location={places.location}
                    creator={places.creator}
                />
            )}
        </div>
  )
}

export default PlacesList