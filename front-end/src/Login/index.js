import { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
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
                window.location.href = "/dashboard";
             } )
            .catch( message => {
                alert( message );
            } );
    }

    return (
        <>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className="fs-4">Username</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email address"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3 " controlId="password">
                            <Form.Label className="fs-4">Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8" lg="6" className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-md-between">
                        <Button
                            id="submit"
                            type="button"
                            size="lg"
                            onClick={() => sendLoginRequest()}
                        >
                            Log In
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            size="lg"
                            onClick={() => {navigate("/")}}
                        >
                            Exit
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login;