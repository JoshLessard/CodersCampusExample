package dev.joshlessard.CodersCampusExample.web;

import dev.joshlessard.CodersCampusExample.domain.Comment;

public class CommentView {

    private final long id;
    private final String createdDate;
    private final String author;
    private final String authorUsername;
    private final String text;

    public static CommentView from( Comment comment ) {
        return new CommentView(
            comment.getId(),
            comment.createdDate().toString(),
            comment.creator().getName(),
            comment.creator().getUsername(),
            comment.text()
        );
    }

    private CommentView( long id, String createdDate, String author, String authorUsername, String text ) {
        this.id = id;
        this.createdDate = createdDate;
        this.author = author;
        this.authorUsername = authorUsername;
        this.text = text;
    }

    public long getId() {
        return id;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public String getAuthor() {
        return author;
    }

    public String getAuthorUsername() {
        return authorUsername;
    }

    public String getText() {
        return text;
    }
}
