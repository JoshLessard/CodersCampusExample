package dev.joshlessard.CodersCampusExample.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import dev.joshlessard.CodersCampusExample.domain.Assignment;
import dev.joshlessard.CodersCampusExample.domain.User;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    Collection<Assignment> findByUser( User user );

    @Query( """
            SELECT
                a
            FROM Assignment a
            WHERE a.status = 'Submitted'
            OR a.codeReviewer = :codeReviewer
            """
    )
    Collection<Assignment> findByCodeReviewer( User codeReviewer );
}
