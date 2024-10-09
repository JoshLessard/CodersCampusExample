package dev.joshlessard.CodersCampusExample.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public ResponseEntity<CreateCommentResponse> createComment( @RequestBody CommentDto commentDto, @AuthenticationPrincipal User user ) {
        Comment newComment = commentService.save( commentDto, user );
        return ResponseEntity.ok( CreateCommentResponse.from( newComment ) );
    }
}
