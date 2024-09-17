package dev.joshlessard.CodersCampusExample.configuration;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import dev.joshlessard.CodersCampusExample.domain.Assignment;
import dev.joshlessard.CodersCampusExample.domain.Authority;
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
        User me = new User();
        me.setUsername( "josh.lessard@gmail.com" );
        me.setPassword( "$2a$10$tLwHdYyGRHPjgKGqvBWMbe2DYaZ6rfx2GBFkAYwYLRe1x2K1HywHW" );
        Authority studentRole = new Authority( "ROLE_STUDENT" );
        studentRole.setUser( me );
        me.setAuthorities( List.of( studentRole ) );
        userRepository.save( me );

        User codeReviewer = new User();
        codeReviewer.setUsername( "code_reviewer" );
        codeReviewer.setPassword( "$2a$10$tLwHdYyGRHPjgKGqvBWMbe2DYaZ6rfx2GBFkAYwYLRe1x2K1HywHW" );
        Authority codeReviewerRole = new Authority( "ROLE_CODE_REVIEWER" );
        codeReviewerRole.setUser( codeReviewer );
        codeReviewer.setAuthorities( List.of( codeReviewerRole ) );
        userRepository.save( codeReviewer );

        assignmentRepository.save( createAssignment( me ) );
        assignmentRepository.save( createAssignment( me ) );
        assignmentRepository.save( createAssignment( me ) );
        assignmentRepository.save( createAssignment( me ) );
        assignmentRepository.save( createAssignment( me ) );
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
