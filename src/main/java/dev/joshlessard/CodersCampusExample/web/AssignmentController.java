package dev.joshlessard.CodersCampusExample.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.joshlessard.CodersCampusExample.domain.Assignment;
import dev.joshlessard.CodersCampusExample.domain.User;
import dev.joshlessard.CodersCampusExample.service.AssignmentService;

@RestController
@RequestMapping( "/api/assignments" )
public class AssignmentController {

    private AssignmentService assignmentService;

    @Autowired
    public AssignmentController( AssignmentService assignmentService ) {
        this.assignmentService = assignmentService;
    }

    @GetMapping
    public ResponseEntity<?> getAssignments( @AuthenticationPrincipal User user ) {
        return ResponseEntity.ok( assignmentService.findByUser( user ) );
    }

    @GetMapping( "{assignmentId}" )
    public ResponseEntity<?> getAssignment( @AuthenticationPrincipal User user, @PathVariable long assignmentId ) {
        return assignmentService.findById( assignmentId )
            .map( ResponseEntity::ok )
            .orElseGet( ResponseEntity.notFound()::build );
    }

    @PostMapping
    public ResponseEntity<?> createAssignment( @AuthenticationPrincipal User user ) {
        Assignment newAssignment = assignmentService.save( user );

        return ResponseEntity.ok( newAssignment );
    }
}
