import { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";

const Login = () => {

    const [username, setUsername] = useState( "" );
    const [password, setPassword] = useState( "" );
    const [jwt, setJwt] = useLocalState( "", "jwt" );

    function sendLoginRequest() {
        fetch( "/api/auth/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify( {
                username: username,
                password: password
            } )
        } )
            .then( response => {
                if ( response.status === 200 ) {
                    return response;
                } else {
                    return Promise.reject( "Invalid login attempt" );
                }
            })
            .then( response => {
                setJwt( response.headers.get( "authorization" ) );
                window.location.href = "dashboard";
             } )
            .catch( message => {
                alert( message );
            } );
    }

    return (
        <>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="email"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button id="submit" type="button" onClick={() => sendLoginRequest()}>Log In</button>
            </div>
        </>
    )
}

export default Login;