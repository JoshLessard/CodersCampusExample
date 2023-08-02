package dev.joshlessard.CodersCampusExample.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

//@EnableWebSecurity TODO Do we need this?
@Component
public class SecurityConfiguration {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService( PasswordEncoder passwordEncoder ) {
        return new DefaultUserDetailsService( passwordEncoder );
    }
}
