import { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Link } from "react-router-dom";
import ajax from "../Services/fetchService";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";

const CodeReviewerDashboard = () => {

    const [jwt, setJwt] = useLocalState( "", "jwt" )
    const [assignments, setAssignments] = useState( null );

    function editReview( assignmentId ) {
        window.location.href = `/assignments/${assignmentId}`;
    }

    function claimAssignment( assignmentId ) {
        ajax( `/api/assignments/${assignmentId}/claim`, "POST", jwt )
            .then( assignment => {
                const assignmentsCopy = [...assignments];
                const index = assignmentsCopy.findIndex( a => a.id === assignment.id );
                assignmentsCopy[index] = assignment;
                setAssignments( assignmentsCopy );
            } );
    }

    useEffect( () => {
      ajax( "/api/assignments", "GET", jwt )
        .then( assignmentsData => setAssignments( assignmentsData ) );
    }, [jwt] );

    function createAssignment() {
      ajax( "/api/assignments", "POST", jwt )
        .then( assignment => window.location.href = `/assignments/${assignment.id}` );
    }

    return (
        <Container>
          <Row>
              <Col>
                  <div
                    className="d-flex justify-content-end"
                    style={{ cursor: "pointer" }}
                    href="#"
                    onClick={ () => {
                        setJwt( null );
                        window.location.href = '/login';
                    }}
                  >
                      Log Out
                  </div>
              </Col>
          </Row>
          <Row>
            <Col>
              <div className="h1">Code Reviewer Dashboard</div>
            </Col>
          </Row>
          <div className="assignment-wrapper in-review">
            <div className="h3 px-2 assignment-wrapper-title">In Review</div>
            { assignments ? (
                <div
                className="d-grid gap-5"
                style={{ gridTemplateColumns: "repeat( auto-fill, 18rem )" }}
                >
                { assignments.filter( assignment => assignment.status === "In Review" ).map( assignment => (
                    <Card
                        key={assignment.id}
                        style={{ width: "18rem", height: "18rem" }}
                    >
                        <Card.Body className="d-flex flex-column justify-content-around">
                        <Card.Title>Assignment #{assignment.number}</Card.Title>
                        <div className="align-items-start">
                            <Badge pill bg="info" className="" style={{ fontSize: "1em" }}>
                            {assignment.status}
                            </Badge>
                        </div>
                        <Card.Text style={{ marginTop: "1em" }}>
                            <p>
                            <b>GitHub URL:</b> {assignment.githubUrl}
                            </p>
                            <p>
                            <b>Branch:</b> {assignment.branch}
                            </p>
                        </Card.Text>
                        <Button
                            variant="secondary"
                            onClick={ () => {
                             editReview( assignment.id )
                            }}
                        >
                            Edit
                        </Button>
                        </Card.Body>
                    </Card>
                ))}
                </div>
            ) : (
                <></>
            ) }
          </div>
          
          <div className="assignment-wrapper submitted">
            <div className="h3 px-2 assignment-wrapper-title">Awaiting Review</div>
            { assignments ? (
                <div
                className="d-grid gap-5"
                style={{ gridTemplateColumns: "repeat( auto-fill, 18rem )" }}
                >
                { assignments.filter( assignment => assignment.status === "Submitted" ).map( assignment => (
                    <Card
                        key={assignment.id}
                        style={{ width: "18rem", height: "18rem" }}
                    >
                        <Card.Body className="d-flex flex-column justify-content-around">
                        <Card.Title>Assignment #{assignment.number}</Card.Title>
                        <div className="align-items-start">
                            <Badge pill bg="info" className="" style={{ fontSize: "1em" }}>
                            {assignment.status}
                            </Badge>
                        </div>
                        <Card.Text style={{ marginTop: "1em" }}>
                            <p>
                            <b>GitHub URL:</b> {assignment.githubUrl}
                            </p>
                            <p>
                            <b>Branch:</b> {assignment.branch}
                            </p>
                        </Card.Text>
                        <Button
                            variant="secondary"
                            onClick={ () => {
                             claimAssignment( assignment.id )
                            }}
                        >
                            Claim
                        </Button>
                        </Card.Body>
                    </Card>
                ))}
                </div>
            ) : (
                <></>
            ) }
          </div>

          <div className="assignment-wrapper needs-update">
            <div className="h3 px-2 assignment-wrapper-title">Needs Update</div>
            { assignments ? (
                <div
                className="d-grid gap-5"
                style={{ gridTemplateColumns: "repeat( auto-fill, 18rem )" }}
                >
                { assignments.filter( assignment => assignment.status === "Needs Update" ).map( assignment => (
                    <Card
                        key={assignment.id}
                        style={{ width: "18rem", height: "18rem" }}
                    >
                        <Card.Body className="d-flex flex-column justify-content-around">
                        <Card.Title>Assignment #{assignment.number}</Card.Title>
                        <div className="align-items-start">
                            <Badge pill bg="info" className="" style={{ fontSize: "1em" }}>
                            {assignment.status}
                            </Badge>
                        </div>
                        <Card.Text style={{ marginTop: "1em" }}>
                            <p>
                            <b>GitHub URL:</b> {assignment.githubUrl}
                            </p>
                            <p>
                            <b>Branch:</b> {assignment.branch}
                            </p>
                        </Card.Text>
                        <Button
                            variant="secondary"
                            onClick={ () => {
                             window.location.href = `/assignments/${assignment.id}`
                            }}
                        >
                            View
                        </Button>
                        </Card.Body>
                    </Card>
                ))}
                </div>
            ) : (
                <></>
            ) }

          </div>
        </Container>
    )
}

export default CodeReviewerDashboard;