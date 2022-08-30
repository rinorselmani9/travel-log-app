import React, { useState, useReducer, useCallback, useContext } from 'react'
import Card from '../../shared/components/UI Elements/Card'
import Input from '../../shared/components/FormElements/Input'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from '../../shared/utils/validators'
import './Login.css'
import Button from '../../shared/components/FormElements/Button'
import { AuthContext } from '../../shared/context/authContext'
import { useNavigate } from 'react-router-dom'

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

const Login = (props) => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      email: {
        value: '',
        isValid: false,
      },
      password: {
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

  const placeSubmitHandler = async (event) => {
    event.preventDefault()
    if (auth.isLoggedIn) {
      auth.login(true)
    } else {
      try {
        const response = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        })
        const responseData = await response.json()
        localStorage.setItem('token',responseData.message.token)
        if (!response.ok) {
          throw new Error('Invalid credencials')
        }
        auth.login(responseData.user._id)
        navigate('/')
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className='login-div'>
      <Card className='login-card'>
        <form onSubmit={placeSubmitHandler}>
          <Input
            id='email'
            element='input'
            type='email'
            label='Email &nbsp; &nbsp; &nbsp;&nbsp;'
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email!'
            onInput={inputHandler}
          />
          <Input
            id='password'
            element='input'
            type='password'
            label='Password'
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
            errorText='Please enter a valid password!'
            onInput={inputHandler}
          />
          <Button>Log In</Button>
        </form>
      </Card>
    </div>
  )
}

export default Login
