import { useEffect, useRef, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import { Badge, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import StatusBadge from "../StatusBadge";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

const CodeReviewerAssignmentView = () => {
    const navigate = useNavigate();
    const user = useUser();
    const assignmentId = window.location.href.split( "/assignments/" )[1]; // PUKE...should pass in the assignment ID as an argument
    const [assignment, setAssignment] = useState( {
        githubUrl: "",
        branch: "",
        number: null,
        status: null,
        codeReviewVideoUrl: null
    } );
    const [assignmentEnums, setAssignmentEnums] = useState( [] );
    const [assignmentStatuses, setAssignmentStatuses] = useState( [] );
    const previousAssignment = useRef( assignment );

    function updateAssignment( prop, value ) {
        const updatedAssignment = {...assignment};
        updatedAssignment[prop] = value;
        setAssignment( updatedAssignment );
    }

    function save( status ) {
        if ( assignment.status !== status ) {
            updateAssignment( "status", status );
        } else {
            putAssignment();
        }

    }

    function putAssignment() {
        ajax( `/api/assignments/${assignmentId}`, "PUT", user.jwt, assignment )
            .then( assignmentData => { setAssignment( assignmentData ); } );
    }

    useEffect( () => {
        if ( previousAssignment.current.status !== assignment.status ) {
            putAssignment();
        }
        previousAssignment.current = assignment;
    }, [assignment]);

    useEffect( () => {
        ajax( `/api/assignments/${assignmentId}`, "GET", user.jwt )
            .then( assignmentResponse => {
                setAssignment( assignmentResponse.assignment );
                setAssignmentEnums( assignmentResponse.assignmentEnums );
                setAssignmentStatuses( assignmentResponse.statusEnums );
            } );
    }, [user.jwt, assignmentId] );

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
                    <StatusBadge text={assignment.status} />
                </Col>
            </Row>
            
            { assignment
                ? (
                    <>
                        <Form.Group as={Row} className="my-3" controlId="formGithubUrl">
                            <Form.Label column sm="3" md="2">
                                GitHub URL:
                            </Form.Label>
                            <Col sm="9" md="8" lg="6">
                                <Form.Control
                                    type="url"
                                    value={assignment.githubUrl}
                                    readOnly
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
                                    readOnly
                                    onChange={ e => updateAssignment( "branch", e.target.value ) }
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="my-3" controlId="formVideoReviewUrl">
                            <Form.Label column sm="3" md="2">
                                Video Review URL:
                            </Form.Label>
                            <Col sm="9" md="8" lg="6">
                                <Form.Control
                                    type="url"
                                    value={assignment.codeReviewVideoUrl}
                                    onChange={ e => updateAssignment( "codeReviewVideoUrl", e.target.value ) }
                                    placeholder="https://screencast-o-matic.com/something"
                                />
                            </Col>
                        </Form.Group>

                        <div className="d-flex gap-5">
                            {assignment.status === "Completed" ? (
                            <Button
                                size="lg"
                                variant="secondary"
                                onClick={ () => save( assignmentStatuses[2].status ) }
                            >
                                Re-Claim
                            </Button>
                            ) : (
                                <Button
                                    size="lg"
                                    onClick={ () => save( assignmentStatuses[4].status ) }
                                >
                                    Complete Review
                                </Button>
                            )}
                            {assignment.status === "Needs Update" ? (
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    onClick={ () => save( assignmentStatuses[2].status ) }
                                >
                                    Re-Claim
                                </Button>
                            ) : (
                                <Button
                                    size="lg"
                                    variant="danger"
                                    onClick={ () => save( assignmentStatuses[3].status ) }
                                >
                                    Reject Assignment
                                </Button>
                            )}
                            <Button
                                size="lg"
                                variant="secondary"
                                onClick={ () => navigate( "/dashboard" ) }
                            >
                                Back
                            </Button>
                        </div>
                    </>
                )
                : <></>
            }
        </Container>
    )
}

export default CodeReviewerAssignmentView;