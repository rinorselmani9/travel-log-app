import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlacesList from '../components/PlacesList'

const UserPlaces = (props) => {
  const [placesList, setPlacesList] = useState([])

  const userId = useParams().id
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/places/${userId}/places`)

        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(responseData.message)
        }

        setPlacesList(responseData.result)
      } catch (err) {
        throw new Error(err.message)
      }
    }
    sendRequest()
  }, [placesList])

  return <PlacesList items={placesList} />
}

export default UserPlaces
