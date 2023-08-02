package dev.joshlessard.CodersCampusExample.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import dev.joshlessard.CodersCampusExample.domain.User;

public class DefaultUserDetailsService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DefaultUserDetailsService( PasswordEncoder passwordEncoder ) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername( String username ) throws UsernameNotFoundException {
        User user = new User();
        user.setUsername( username );
        user.setPassword( passwordEncoder.encode( "asdfasdf" ) );
        user.setId( 1L );
        return user;
    }
}
