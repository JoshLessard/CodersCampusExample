package dev.joshlessard.CodersCampusExample.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.joshlessard.CodersCampusExample.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername( String username );
}
