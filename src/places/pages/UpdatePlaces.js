import React, {useReducer,useCallback, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { 
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/utils/validators'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'

const formReducer = ( state, action ) => {
    switch(action.type){
      case 'SET_DATA':
          return {
            inputs:action.inputs,
            isValid:action.isValid
        } 
      default:
          return state
    }
}
  
const UpdatePlaces = () => {

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

    const placeId = useParams().placesId
    const placeToEdit = dummy_places.find((place) => place.id === placeId) 

    const [formState, dispatch] = useReducer (formReducer,{
        inputs:{
            title:{
                value: placeToEdit.title,
                isValid:true
            },
            description:{
                value:placeToEdit.description,
                isValid:true
            }
        },
        isValid:false
    })
    console.log(formState);
    // setTitle(placeToEdit.title);
    const inputHandler = useCallback((id,value,isValid) => {
        dispatch({
            type:'SET_DATA',
            value:value,
            isValid:isValid,
            inputId:id
        })
    },[])

    const placeSubmitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title!"
            onInput={inputHandler}
        />
        <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)!"
            onInput={inputHandler}
        />
   
        <Button type="submit" disabled={!formState.isValid}>
            Update Place
        </Button>
    </form>
    )
}

export default UpdatePlaces
