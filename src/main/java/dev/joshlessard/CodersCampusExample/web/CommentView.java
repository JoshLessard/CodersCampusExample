package dev.joshlessard.CodersCampusExample.web;

import dev.joshlessard.CodersCampusExample.domain.Comment;

public class CommentView {

    private final long id;
    private final String author;
    private final String text;

    public static CommentView from( Comment comment ) {
        return new CommentView( comment.getId(), comment.creator().getUsername(), comment.text() );
    }

    private CommentView( long id, String author, String text ) {
        this.id = id;
        this.author = author;
        this.text = text;
    }

    public long getId() {
        return id;
    }

    public String getAuthor() {
        return author;
    }

    public String getText() {
        return text;
    }
}
