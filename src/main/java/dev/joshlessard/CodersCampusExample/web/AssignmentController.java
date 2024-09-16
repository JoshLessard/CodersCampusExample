package dev.joshlessard.CodersCampusExample.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.joshlessard.CodersCampusExample.domain.Assignment;
import dev.joshlessard.CodersCampusExample.domain.User;
import dev.joshlessard.CodersCampusExample.dto.AssignmentResponseDto;
import dev.joshlessard.CodersCampusExample.enums.AssignmentStatusEnum;
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
            .map( AssignmentResponseDto::new )
            .map( ResponseEntity::ok )
            .orElseGet( ResponseEntity.notFound()::build );
    }

    @PostMapping
    public ResponseEntity<?> createAssignment( @AuthenticationPrincipal User user ) {
        Assignment newAssignment = assignmentService.saveNewAssignmentFor( user );

        return ResponseEntity.ok( newAssignment );
    }

    @PutMapping( "{assignmentId}" )
    public ResponseEntity<?> updateAssignment( @AuthenticationPrincipal User user, @PathVariable long assignmentId, @RequestBody Assignment assignment ) {
        if ( assignment.getStatus().equals( AssignmentStatusEnum.PENDING_SUBMISSION.status() ) ) {
            // Hack to get around the author's terrible use of a "set" hook in a synchronous way
            assignment.setStatus( AssignmentStatusEnum.SUBMITTED.status() );
        }
        Assignment updatedAssignment = assignmentService.save( assignment );

        return ResponseEntity.ok( updatedAssignment );
    }
}
