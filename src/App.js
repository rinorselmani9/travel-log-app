import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Users from './user/pages/Users';
import Places from './places/pages/Places';
import MainHeader from './shared/components/Navigation/MainHeader';
import UserPlaces from './places/pages/UserPlaces';
import NewPlaces from './places/pages/NewPlaces';
import UpdatePlaces from './places/pages/UpdatePlaces';
import Login from './login/pages/Login';
import Register from './login/pages/Register';
import { AuthContext } from './shared/context/authContext'
import { useCallback, useState } from 'react';

function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(false)

  const login = useCallback(()=>{
    setIsLoggedIn(true)
  },[])
  const logout = useCallback(()=>{
    setIsLoggedIn(false)
  },[])

  let routes;

  if(isLoggedIn){
     routes = (
      
        <Routes>
        
          <Route path='/' element={<Users/>}/>
          <Route path='/:id/places' element={<UserPlaces/>}/>
          <Route  path='/places' element={<Places/>}/>
          <Route path='/newplaces' element={<NewPlaces/>}/>
          <Route path='/places/:placesId' element={<UpdatePlaces/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>

      </Routes>

    )
  }else{
    routes=(
    
        <Routes>
         <Route path='/' element={<Users/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
        </Routes>

    )
  }
  
  return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn, login:login, logout:logout}} >
      
        <BrowserRouter>
        <MainHeader/>
          <main>{routes}</main>
        </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
