import React from 'react'
import { useParams } from 'react-router-dom'
import PlacesList from '../components/PlacesList'

const UserPlaces = props => {

  const dummy_places = [
    {
        id:'p1',
        title:'New Born',
        description:'Kosova newest country in the world',
        imageUrl:'https://pbs.twimg.com/media/EwCNjEQWQAQQMr9.jpg',
        address:'Pristina',
        location:{
            lat:45.333,
            lng:-73.09,
        },
        creator:'u1'
    },
    {
        id:'p2',
        title:'Germia National Park',
        description:'Kosova\'s National Park',
        imageUrl:'http://photos.wikimapia.org/p/00/01/49/52/35_big.jpg',
        address:'Pristina',
        location:{
            lat:49.333,
            lng:-80.09,
        },
        creator:'u1'
    },
    {
        id:'p3',
        title:'New Born',
        description:'Kosova newest country in the world',
        imageUrl:'https://pbs.twimg.com/media/EwCNjEQWQAQQMr9.jpg',
        address:'Pristina',
        location:{
            lat:45.333,
            lng:-73.09,
        },
        creator:'u2'
    }
  ] 
  const userId = useParams().id
  const loadedPlaces = dummy_places.filter((places)=>places.creator === userId)
  return (
        <PlacesList items={loadedPlaces}/>   
  )
}

export default UserPlaces