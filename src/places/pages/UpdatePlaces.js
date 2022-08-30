import React, { useReducer, useCallback, useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
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
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.isValid,
      }
    default:
      return state
  }
}

const UpdatePlaces = () => {
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
    },
    isValid: false,
  })
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const placeId = useParams().placesId

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id,
    })
  }, [])

  const setFormData = useCallback((inputData, formValidaty) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidaty,
    })
  })
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/places/${placeId}`)
        const responseData = await response.json()
        
        setFormData(
          {
            title: {
              value: response.place.title,
              isValid: true,
            },
            description: {
              value: response.place.description,
              isValid: true,
            },
          },
          true
        )
        console.log(responseData)
      } catch (err) {
        throw new Error(err.message)
      }
    }

    fetchPlace()
  }, [ placeId, setFormData])

  const placeSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`http://localhost:3000/api/places/update-place/${placeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
      })
      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message)
      }
      navigate(`/${auth.userId}/places`)
    } catch (err) {
      throw new Error(err.message)
    }
  }

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
        value={formState.inputs.title.value}
        isValid={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description (at least 5 characters)!'
        onInput={inputHandler}
        value={formState.inputs.description.value}
        isValid={formState.inputs.description.isValid}
      />

      <Button type='submit' disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  )
}

export default UpdatePlaces
