import logo from './logo.svg';
import './App.css';

function App() {

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
    .then( response => response.headers.get( "authorization" ) )
    .then( authorization => console.log( authorization ) )

  return (
    <div className="App">
      <h1>Hello world!</h1>
    </div>
  );
}

export default App;
