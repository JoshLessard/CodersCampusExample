 import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useLocalState } from './util/useLocalStorage';

function App() {

  const [jwt, setJwt] = useLocalState( "", "jwt" )

  useEffect( () => {
    if ( ! jwt ) {
      fetch( "api/auth/login", {
        headers: {
           "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify( {
          "username": "josh",
          "password": "asdfasdf" 
        } )
      } )
        .then( response => setJwt( response.headers.get( "authorization" ) ) )
    }
  },
  [] )

  useEffect( () => {
    console.log( `JWT is: ${jwt}` )
  }, [jwt] )

  return (
    <div className="App">
      <h1>Hello world!</h1>
      <div>JWT value is {jwt}</div>
    </div>
  )
}

export default App;
