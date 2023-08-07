package dev.joshlessard.CodersCampusExample.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import dev.joshlessard.CodersCampusExample.repository.UserRepository;

public class DefaultUserDetailsService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder; // TODO Get rid of me
    private final UserRepository userRepository;

    @Autowired
    public DefaultUserDetailsService( PasswordEncoder passwordEncoder, UserRepository userRepository ) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername( String username ) throws UsernameNotFoundException {
        return userRepository.findByUsername( username )
            .orElseThrow( () -> new UsernameNotFoundException( "Invalid credentials" ) );
    }
}
