import React, {useReducer,useCallback,useContext} from 'react'
import Card from '../../shared/components/UI Elements/Card'
import Input from '../../shared/components/FormElements/Input'
import { 
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL
} from '../../shared/utils/validators'
import './Login.css'
import Button from '../../shared/components/FormElements/Button'
import { AuthContext } from '../../shared/context/authContext'
import { useNavigate } from 'react-router-dom'


const formReducer = ( state, action ) => {
    switch(action.type){
      case 'INPUT_CHANGE':
          let formIsValid = true;
          for(const inputId in state.inputs){
              if(inputId === action.inputId){
                  formIsValid = formIsValid && action.isValid
              }else{
                  formIsValid = formIsValid && state.inputs[inputId].isValid
              }
          }
      return{
          ...state,
          inputs:{
              ...state.inputs,
              [action.inputId]:{value:action.value, isValid:action.isValid}
          },
          isValid:formIsValid
      }   
      default:
          return state
    }
}

const Register = props => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const [formState, dispatch] = useReducer (formReducer,{
        inputs:{
            name:{
                value:'',
                isValid:false
            },
            email:{
                value:'',
                isValid:false
            },
            password:{
                value:'',
                isValid:false
            },
        },
        isValid:false
    })
    const inputHandler = useCallback((id,value,isValid) => {
        dispatch({
            type:"INPUT_CHANGE",
            value:value,
            isValid:isValid,
            inputId:id
        })
    },[])    

    const placeSubmitHandler = async(event) => {
        event.preventDefault()
        if(auth.isLoggedIn){
        }else{
            try{
                const response = await fetch('http://localhost:3000/api/users/register',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        name:formState.inputs.name.value,
                        email:formState.inputs.email.value,
                        password:formState.inputs.password.value
                    })
                })
                if(!response.ok){
                    throw new Error('Invalid credentials')
                }
                auth.login();
                navigate('/')
            }catch(err){
                console.log(err);
            }
        }
    }
  return (
    <div className='login-div'>
    <Card className="login-card">
       <form onSubmit={placeSubmitHandler}>
            
            <Input
                id="name"
                element="input"
                type="text"
                label="Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid email!"
                onInput={inputHandler}
            />

            <Input
                id="email"
                element="input"
                type="text"
                label="Email  &nbsp; &nbsp; &nbsp;&nbsp;"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email!"
                onInput={inputHandler}
            />
            <Input
                id="password"
                element="input"
                type="password"
                label="Password"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
                errorText="Please enter a valid password!"
                onInput={inputHandler}
            />  
            <Button>
                Register
            </Button>
            </form>
    </Card>
    </div>
  )
}

export default Register