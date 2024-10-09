package dev.joshlessard.CodersCampusExample.web;

import dev.joshlessard.CodersCampusExample.domain.Comment;

public class CreateCommentResponse {

    private final long commentId;

    private CreateCommentResponse( long commentId ) {
        this.commentId = commentId;
    }

    public static CreateCommentResponse from( Comment comment ) {
        return new CreateCommentResponse( comment.getId() );
    }

    public long getCommentId() {
        return commentId;
    }
}
