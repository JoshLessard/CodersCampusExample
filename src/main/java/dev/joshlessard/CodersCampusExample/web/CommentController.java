package dev.joshlessard.CodersCampusExample.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.joshlessard.CodersCampusExample.domain.Comment;
import dev.joshlessard.CodersCampusExample.domain.User;
import dev.joshlessard.CodersCampusExample.dto.CommentDto;
import dev.joshlessard.CodersCampusExample.service.CommentService;

@RestController
@RequestMapping( "/api/comments" )
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController( CommentService commentService ) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<CommentView> createComment( @RequestBody CommentDto commentDto, @AuthenticationPrincipal User user ) {
        Comment newComment = commentService.save( commentDto, user );
        return ResponseEntity.ok( CommentView.from( newComment ) );
    }

    @PutMapping( "/{commentId}" )
    public ResponseEntity<CommentView> updateComment( @PathVariable long commentId, @RequestBody CommentDto commentDto, @AuthenticationPrincipal User user ) {
        Comment updatedComment = commentService.updateText( commentId, user, commentDto.getText() );
        return ResponseEntity.ok( CommentView.from( updatedComment ) );
    }

    @DeleteMapping( "/{commentId}" )
    public ResponseEntity<Void> deleteComment( @PathVariable long commentId, @AuthenticationPrincipal User user ) {
        commentService.deleteComment( commentId, user );
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<CommentView>> getCommentsByAssignment( @RequestParam long assignmentId ) {
        List<CommentView> commentViews = commentService.getCommentsByAssignmentId( assignmentId )
            .stream()
            .map( CommentView::from )
            .toList();
        return ResponseEntity.ok( commentViews );
    }
}
