import { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import { Badge, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";

const AssignmentView = () => {
    const [jwt, setJwt] = useLocalState( "", "jwt" );
    const assignmentId = window.location.href.split( "/assignments/" )[1]; // PUKE...should pass in the assignment ID as an argument
    const [assignment, setAssignment] = useState( {
        githubUrl: "",
        branch: ""
    } );
    const [assignmentEnums, setAssignmentEnums] = useState( [] );

    function updateAssignment( prop, value ) {
        const updatedAssignment = {...assignment};
        updatedAssignment[prop] = value;
        setAssignment( updatedAssignment );
        console.log( updatedAssignment );
    }

    function save() {
        ajax( `/api/assignments/${assignmentId}`, "PUT", jwt, assignment )
            .then( assignmentData => { setAssignment( assignmentData ); } );
    }

    useEffect( () => {
        ajax( `/api/assignments/${assignmentId}`, "GET", jwt )
            .then( assignmentResponse => {
                setAssignment( assignmentResponse.assignment );
                setAssignmentEnums( assignmentResponse.assignmentEnums );
            } );
    }, [] );

    return (
        <Container className="mt-5">
            <Row className="d-flex align-items-center">
                <Col>
                    <h1>Assignment {assignmentId}</h1>
                </Col>
                <Col>
                    <Badge pill bg="info" style={{ fontSize: "1em" }}>{assignment.status}</Badge>
                </Col>
            </Row>
            
            { assignment
                ? (
                    <>
                        <Form.Group as={Row} className="my-3" controlId="formAssignmentNumber">
                            <Form.Label column sm="3" md="2">
                                Assignment Number:
                            </Form.Label>
                            <Col sm="9" md="8" lg="6">
                                <DropdownButton
                                    as={ButtonGroup}
                                    id="assignmentName"
                                    variant={"info"}
                                    title="Assignment 1"
                                >
                                    {assignmentEnums.map( assignmentEnum => (
                                        <Dropdown.Item eventKey={assignmentEnum.assignmentNumber}>
                                            {assignmentEnum.assignmentNumber} ({assignmentEnum.assignmentName})
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="my-3" controlId="formGithubUrl">
                            <Form.Label column sm="3" md="2">
                                GitHub URL:
                            </Form.Label>
                            <Col sm="9" md="8" lg="6">
                                <Form.Control
                                    id="githubUrl"
                                    type="url"
                                    value={assignment.githubUrl}
                                    onChange={ e => updateAssignment( "githubUrl", e.target.value ) }
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formBranch">
                            <Form.Label column sm="3" md="2">
                                Branch:
                            </Form.Label>
                            <Col sm="9" md="8" lg="6">
                                <Form.Control
                                    id="branch"
                                    type="text"
                                    value={assignment.branch}
                                    onChange={ e => updateAssignment( "branch", e.target.value ) }
                                />
                            </Col>
                        </Form.Group>
                        <Button size="lg" onClick={ () => save() }>Submit Assignment</Button>
                    </>
                )
                : <></>
            }
        </Container>
    )
}

export default AssignmentView;