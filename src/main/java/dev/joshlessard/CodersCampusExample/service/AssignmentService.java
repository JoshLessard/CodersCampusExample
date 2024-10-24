package dev.joshlessard.CodersCampusExample.service;

import java.util.Collection;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.joshlessard.CodersCampusExample.domain.Assignment;
import dev.joshlessard.CodersCampusExample.domain.User;
import dev.joshlessard.CodersCampusExample.domain.exceptions.AssignmentNotFoundException;
import dev.joshlessard.CodersCampusExample.enums.AssignmentStatusEnum;
import dev.joshlessard.CodersCampusExample.enums.AuthorityEnum;
import dev.joshlessard.CodersCampusExample.repository.AssignmentRepository;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    @Autowired
    public AssignmentService( AssignmentRepository assignmentRepository ) {
        this.assignmentRepository = assignmentRepository;
    }

    public Assignment saveNewAssignmentFor( User user ) {
        Assignment assignment = new Assignment();
        assignment.setStatus( AssignmentStatusEnum.PENDING_SUBMISSION.status() );
        assignment.setUser( user );
        assignment.setNumber( nextAssignmentNumber( user ) );

        return assignmentRepository.save( assignment );
    }

    private int nextAssignmentNumber( User user ) {
        return assignmentRepository.findByUser( user )
            .stream()
            .map( Assignment::getNumber )
            .filter( Objects::nonNull )
            .max( Integer::compare )
            .orElse( 0 )
            + 1;
    }

    public Assignment save( Assignment assignment ) {
        return assignmentRepository.save( assignment );
    }

    public Collection<Assignment> findByUser( User user ) {
        return isCodeReviewer( user )
            ? assignmentRepository.findByCodeReviewer( user )
            : assignmentRepository.findByUser( user );
    }

    private boolean isCodeReviewer( User user ) {
        return user.getAuthorities()
            .stream()
            .anyMatch( auth -> AuthorityEnum.ROLE_CODE_REVIEWER.name().equals( auth.getAuthority() ) );
    }

    public Optional<Assignment> findById( long id ) {
        return assignmentRepository.findById( id );
    }

    public Assignment claimAssignment( long assignmentId, User codeReviewer ) {
        Assignment assignment = assignmentRepository.findById( assignmentId )
            .orElseThrow( () -> new AssignmentNotFoundException( assignmentId ) );
        if ( assignment.getCodeReviewer() == null ) {
            assignment.setCodeReviewer( codeReviewer );
            assignment.setStatus( AssignmentStatusEnum.IN_REVIEW.status() );
            return assignmentRepository.save( assignment );
        } else {
            return assignment;
        }
    }
}
