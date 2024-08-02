import { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

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
            <Container className="mt-5">
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="username" className="fs-4">Username</Form.Label>
                    <Form.Control
                        type="email"
                        id="username"
                        placeholder="Enter your email address"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="password" className="fs-4">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Row>
                    <Col className="mt-2">
                        <div>
                            <Button
                                id="submit"
                                type="button"
                                onClick={() => sendLoginRequest()}
                            >
                                Log In
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login;