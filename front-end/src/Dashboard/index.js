import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ajax from "../Services/fetchService";
import { Button, Card, Col, Row } from "react-bootstrap";
import StatusBadge from "../StatusBadge";
import { useUser } from "../UserProvider";

const Dashboard = () => {
    const navigate = useNavigate();
    const user = useUser();
    const [assignments, setAssignments] = useState( null );

    useEffect( () => {
      ajax( "/api/assignments", "GET", user.jwt )
        .then( assignmentsData => setAssignments( assignmentsData ) );
    }, [user.jwt] );

    function createAssignment() {
      ajax( "/api/assignments", "POST", user.jwt )
        .then( assignment => navigate( `/assignments/${assignment.id}` ) );
    }

    return (
        <div style={{ margin: "2em" }}>
          <Row>
              <Col>
                  <div
                    className="d-flex justify-content-end"
                    style={{ cursor: "pointer" }}
                    href="#"
                    onClick={ () => {
                        user.setJwt( null );
                        navigate( '/login' );
                    }}
                  >
                      Log Out
                  </div>
              </Col>
          </Row>
          <div className="mb-5">
            <Button size="lg" onClick={() => createAssignment()}>Submit New Assignment</Button>
          </div>
          { assignments ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat( auto-fill, 18rem )" }}
            >
              { assignments.map( assignment => (
                  <Card
                    key={assignment.id}
                    style={{ width: "18rem", height: "18rem" }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-around">
                      <Card.Title>Assignment #{assignment.number}</Card.Title>
                      <div className="align-items-start">
                        <StatusBadge text={assignment.status} />
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
                          navigate( `/assignments/${assignment.id}` );
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
    )
}

export default Dashboard;