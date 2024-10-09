package dev.joshlessard.CodersCampusExample.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.joshlessard.CodersCampusExample.domain.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
