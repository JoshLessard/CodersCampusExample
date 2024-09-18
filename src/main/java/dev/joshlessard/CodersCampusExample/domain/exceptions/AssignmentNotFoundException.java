package dev.joshlessard.CodersCampusExample.domain.exceptions;

// TODO: Map this to a reasonable return code and error message
public class AssignmentNotFoundException extends RuntimeException {

    private final long assignmentId;

    public AssignmentNotFoundException(long assignmentId ) {
        this.assignmentId = assignmentId;
    }
}
