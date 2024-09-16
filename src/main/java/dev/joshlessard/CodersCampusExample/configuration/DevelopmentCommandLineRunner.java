package dev.joshlessard.CodersCampusExample.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import dev.joshlessard.CodersCampusExample.domain.Assignment;
import dev.joshlessard.CodersCampusExample.domain.User;
import dev.joshlessard.CodersCampusExample.repository.AssignmentRepository;
import dev.joshlessard.CodersCampusExample.repository.UserRepository;

@Component
public class DevelopmentCommandLineRunner implements CommandLineRunner {

    private final UserRepository userRepository;
    private final AssignmentRepository assignmentRepository;

    @Autowired
    public DevelopmentCommandLineRunner( UserRepository userRepository, AssignmentRepository assignmentRepository ) {
        this.userRepository = userRepository;
        this.assignmentRepository = assignmentRepository;
    }

    @Override
    public void run( String... args ) throws Exception {
        User user = new User();
        user.setUsername( "josh.lessard@gmail.com" );
        user.setPassword( "$2a$10$tLwHdYyGRHPjgKGqvBWMbe2DYaZ6rfx2GBFkAYwYLRe1x2K1HywHW" );
        userRepository.save( user );

        assignmentRepository.save( createAssignment( user ) );
        assignmentRepository.save( createAssignment( user ) );
        assignmentRepository.save( createAssignment( user ) );
        assignmentRepository.save( createAssignment( user ) );
        assignmentRepository.save( createAssignment( user ) );
    }

    private Assignment createAssignment( User user ) {
        Assignment assignment = new Assignment();
        assignment.setUser( user );
        assignment.setStatus( "Pending Submission" );
        assignment.setGithubUrl( "https://www.byteme.com" );
        assignment.setBranch( "master" );
        return assignment;
    }
}
