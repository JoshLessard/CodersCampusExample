package dev.joshlessard.CodersCampusExample.dto;

public class CommentDto {

    private Long id;
    private long assignmentId;
    private String text;

    public CommentDto( Long id, long assignmentId, String text ) {
        this.id = id;
        this.assignmentId = assignmentId;
        this.text = text;
    }

    public Long getId() {
        return id;
    }

    public long getAssignmentId() {
        return assignmentId;
    }

    public String getText() {
        return text;
    }
}
