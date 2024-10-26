package dev.joshlessard.CodersCampusExample.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.joshlessard.CodersCampusExample.domain.Assignment;
import dev.joshlessard.CodersCampusExample.domain.Comment;
import dev.joshlessard.CodersCampusExample.domain.User;
import dev.joshlessard.CodersCampusExample.dto.CommentDto;
import dev.joshlessard.CodersCampusExample.repository.AssignmentRepository;
import dev.joshlessard.CodersCampusExample.repository.CommentRepository;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final AssignmentRepository assignmentRepository;

    @Autowired
    public CommentService( CommentRepository commentRepository, AssignmentRepository assignmentRepository ) {
        this.commentRepository = commentRepository;
        this.assignmentRepository = assignmentRepository;
    }

    public Comment save( CommentDto commentDto, User user ) {
        Assignment assignment = assignmentRepository.getReferenceById( commentDto.getAssignmentId() );
        Comment comment = new Comment( user, assignment, commentDto.getText(), LocalDateTime.now() );
        return commentRepository.save( comment );
    }

    public List<Comment> getCommentsByAssignmentId( long assignmentId ) {
        return commentRepository.findByAssignmentId( assignmentId );
    }

    public Comment updateText( long commentId, CommentDto commentDto, User user ) {
        Comment commentToUpdate = commentRepository.findById( commentId ).orElseThrow();
        if ( ! user.getId().equals( commentToUpdate.creator().getId() ) ) {
            throw new IllegalStateException();
        }
        commentToUpdate.updateText( commentDto.getText() );
        return commentRepository.save( commentToUpdate );
    }

    public void deleteComment( long commentId, User user ) {
        Comment commentToDelete = commentRepository.findById( commentId ).orElseThrow();
        if ( ! user.getId().equals( commentToDelete.creator().getId() ) ) {
            throw new IllegalStateException();
        }
        commentRepository.delete( commentToDelete );
    }
}
