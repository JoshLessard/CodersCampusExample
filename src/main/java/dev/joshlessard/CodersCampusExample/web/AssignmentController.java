package dev.joshlessard.CodersCampusExample.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @PostMapping
    public ResponseEntity<?> createAssignment( @AuthenticationPrincipal User user ) {
        Assignment newAssignment = assignmentService.save( user );

        return ResponseEntity.ok( newAssignment );
    }
}
