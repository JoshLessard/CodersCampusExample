import { useEffect, useRef, useState } from "react";
import ajax from "../Services/fetchService";
import { Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import StatusBadge from "../StatusBadge";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../UserProvider";
import CommentContainer from "../CommentContainer";

const AssignmentView = () => {
    const navigate = useNavigate();
    const user = useUser();
    const { assignmentId } = useParams();
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

                        {assignment.status === "Completed" ? (
                            <>
                                <Form.Group as={Row} className="d-flex align-items-center mb-3" controlId="formCodeReviewVideoUrl">
                                    <Form.Label column sm="3" md="2">
                                        Code Review Video URL:
                                    </Form.Label>
                                    <Col sm="9" md="8" lg="6">
                                        <a
                                            href={assignment.codeReviewVideoUrl}
                                            style={{ fontWeight: "bold" }}
                                        >
                                            {assignment.codeReviewVideoUrl}
                                        </a>
                                    </Col>
                                </Form.Group>
                                <div className="d-flex gap-5">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        onClick={ () => navigate( "/dashboard" ) }
                                    >
                                        Back
                                    </Button>
                                </div>
                            </>
                        ) : assignment.status === "Pending Submission" ? (
                            <div className="d-flex gap-5">
                                <Button size="lg" onClick={ () => save( "Submitted" ) }>Submit Assignment</Button>
                                <Button size="lg" variant="secondary" onClick={ () => navigate( "/dashboard" ) }>Back</Button>
                            </div>
                        ) : (
                            <div className="d-flex gap-5">
                                <Button size="lg" onClick={ () => save( "Resubmitted" ) }>Resubmit Assignment</Button>
                                <Button size="lg" variant="secondary" onClick={ () => navigate( "/dashboard" ) }>Back</Button>
                            </div>
                        )}

                        <CommentContainer assignmentId={assignmentId} />
                    </>
                )
                : <></>
            }
        </Container>
    )
}

export default AssignmentView;