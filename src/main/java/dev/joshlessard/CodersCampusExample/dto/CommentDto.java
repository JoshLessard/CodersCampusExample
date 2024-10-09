package dev.joshlessard.CodersCampusExample.dto;

public class CommentDto {

    private long assignmentId;
    private String text;

    public CommentDto( long assignmentId, String text ) {
        this.assignmentId = assignmentId;
        this.text = text;
    }

    public long getAssignmentId() {
        return assignmentId;
    }

    public String getText() {
        return text;
    }
}
