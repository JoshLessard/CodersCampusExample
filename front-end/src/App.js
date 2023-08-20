 import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useLocalState } from './util/useLocalStorage';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Homepage from './Homepage';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

function App() {

  const [jwt, setJwt] = useLocalState( "", "jwt" )

  // useEffect( () => {
  //   if ( ! jwt ) {
  //     fetch( "api/auth/login", {
  //       headers: {
  //          "Content-Type": "application/json"
  //       },
  //       method: "POST",
  //       body: JSON.stringify( {
  //         "username": "josh",
  //         "password": "asdfasdf" 
  //       } )
  //     } )
  //       .then( response => setJwt( response.headers.get( "authorization" ) ) )
  //   }
  // },
  // [] )

  useEffect( () => {
    console.log( `JWT is: ${jwt}` )
  }, [jwt] )

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  )
}

export default App;
