import React, { useCallback, useReducer, useContext } from 'react'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators'
import './NewPlaces.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../shared/context/authContext'

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      }
    default:
      return state
  }
}

const NewPlaces = () => {
  let navigate = useNavigate()
  const auth = useContext(AuthContext)
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    isValid: false,
  })

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id,
    })
  }, [])

  const placeSubmitHandler = async(event) => {
    event.preventDefault()
        try {
          const response = await fetch(`http://localhost:3000/api/places/add-places`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: formState.inputs.title.value,
              description: formState.inputs.description.value,
              address: formState.inputs.address.value,
              creator: auth.userId,
            }),
          })

          const responseData = await response.json()

          if (!response.ok) {
            throw new Error(responseData.message)
          }
          navigate('/')
        } catch (err) {
          throw new Error(err.message)
        }
      }

    console.log(formState.inputs)

    return (
        <form className='place-form' onSubmit={placeSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title!'
            onInput={inputHandler}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (at least 5 characters)!'
            onInput={inputHandler}
          />
          <Input
            id='address'
            element='input'
            label='Address'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid address!'
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!formState.isValid}>
            Add Place
          </Button>
        </form>
      )
  }



export default NewPlaces
