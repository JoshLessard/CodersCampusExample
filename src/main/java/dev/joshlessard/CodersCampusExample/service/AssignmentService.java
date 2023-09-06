package dev.joshlessard.CodersCampusExample.service;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.joshlessard.CodersCampusExample.domain.Assignment;
import dev.joshlessard.CodersCampusExample.domain.User;
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
        assignment.setStatus( "Needs to be Submitted" );
        assignment.setUser( user );

        return assignmentRepository.save( assignment );
    }

    public Assignment save( Assignment assignment ) {
        return assignmentRepository.save( assignment );
    }

    public Collection<Assignment> findByUser( User user ) {
        return assignmentRepository.findByUser( user );
    }

    public Optional<Assignment> findById( long id ) {
        return assignmentRepository.findById( id );
    }
}
