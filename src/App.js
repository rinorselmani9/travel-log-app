import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Users from './user/pages/Users';
import Places from './places/pages/Places';
import MainHeader from './shared/components/Navigation/MainHeader';
import UserPlaces from './places/pages/UserPlaces';
import NewPlaces from './places/pages/NewPlaces';
import UpdatePlaces from './places/pages/UpdatePlaces';

function App() {
  
  return (
    <div>
      
    <BrowserRouter>
      <MainHeader/>
      <Routes>
          
          <Route path='/' element={<Users/>}/>
          <Route path='/:id/places' element={<UserPlaces/>}/>
          <Route  path='/places' element={<Places/>}/>
          <Route path='/newplaces' element={<NewPlaces/>}/>
          <Route path='/places/:placesId' element={<UpdatePlaces/>}/>


      </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
