import React from 'react'
import { useParams } from 'react-router-dom'
import PlacesList from '../components/PlacesList'

const UserPlaces = props => {

  const dummy_places = [
    {
        id: 'p1',
        title: 'Empire State',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:'https://www.history.com/.image/t_share/MTU3ODc4NjA0ODYzOTA3NTUx/image-placeholder-title.jpg',
        address: '29 w 34th St, New York, NY 10001',
        location: {
            lat: 40.74844405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Hamburger Aba',
        description: 'One of the most famous burger shops in the world!',
        imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Hamburger_Aba_Prishtina.jpg/1600px-Hamburger_Aba_Prishtina.jpg?20181001133614',
        address: 'Prishtine, 10000',
        location: {
            lat: 42.667542,
            lng: 21.166191
        },
        creator: 'u1'
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