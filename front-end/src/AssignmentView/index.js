import { useEffect, useRef, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import { Badge, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";

const AssignmentView = () => {
    const [jwt, setJwt] = useLocalState( "", "jwt" );
    const assignmentId = window.location.href.split( "/assignments/" )[1]; // PUKE...should pass in the assignment ID as an argument
    const [assignment, setAssignment] = useState( {
        githubUrl: "",
        branch: "",
        number: null,
        status: null
    } );
    const [assignmentEnums, setAssignmentEnums] = useState( [] );
    const [assignmentStatuses, setAssignmentStatuses] = useState( [] );
    const previousAssignment = useRef( assignment );

    function updateAssignment( prop, value ) {
        const updatedAssignment = {...assignment};
        updatedAssignment[prop] = value;
        setAssignment( updatedAssignment );
    }

    function save() {
        // this implies that the student is submitting the assignment for the first time
        if ( assignment.status === assignmentStatuses[0].status ) {
            updateAssignment( "status", assignmentStatuses[1].status );
        } else {
            putAssignment();
        }

    }

    function putAssignment() {
        ajax( `/api/assignments/${assignmentId}`, "PUT", jwt, assignment )
            .then( assignmentData => { setAssignment( assignmentData ); } );
    }

    useEffect( () => {
        if ( previousAssignment.current.status !== assignment.status ) {
            putAssignment();
        }
        previousAssignment.current = assignment;
    }, [assignment]);

    useEffect( () => {
        ajax( `/api/assignments/${assignmentId}`, "GET", jwt )
            .then( assignmentResponse => {
                setAssignment( assignmentResponse.assignment );
                setAssignmentEnums( assignmentResponse.assignmentEnums );
                setAssignmentStatuses( assignmentResponse.statusEnums );
            } );
    }, [jwt, assignmentId] );

    return (
        <Container className="mt-5">
            <Row className="d-flex align-items-center">
                <Col>
                    {
                        assignment.number ? (
                            <h1>Assignment {assignment.number}</h1>
                        ) : (
                            <></>
                        )
                    }
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
                                    variant={"info"}
                                    title={
                                        assignment.number
                                            ? `Assignment ${assignment.number}`
                                            : "Select an assignment"
                                    }
                                    onSelect={selectedIndex => {
                                        updateAssignment( "number", selectedIndex )}
                                    }
                                >
                                    {assignmentEnums.map( assignmentEnum => (
                                        <Dropdown.Item key={assignmentEnum.assignmentNumber} eventKey={assignmentEnum.assignmentNumber}>
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