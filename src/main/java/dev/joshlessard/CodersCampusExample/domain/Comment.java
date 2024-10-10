package dev.joshlessard.CodersCampusExample.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table( name = "comments" )
public class Comment {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long id;

    @ManyToOne
    private Assignment assignment;
    @ManyToOne
    private User creator;
    private LocalDateTime createdDate;
    @Column( columnDefinition = "TEXT" )
    private String text;

    @SuppressWarnings("unused")
    private Comment() {
        // Hibernate
    }

    public Comment( User creator, Assignment assignment, String text, LocalDateTime createdDate ) {
        this.creator = creator;
        this.assignment = assignment;
        this.text = text;
        this.createdDate = createdDate;
    }

    public long getId() {
        return id;
    }

    public User creator() {
        return creator;
    }

    public String text() {
        return text;
    }
}
