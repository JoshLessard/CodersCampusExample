package dev.joshlessard.CodersCampusExample.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.joshlessard.CodersCampusExample.domain.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
}
