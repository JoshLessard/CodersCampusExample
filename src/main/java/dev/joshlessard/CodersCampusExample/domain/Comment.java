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
}
