package dev.joshlessard.CodersCampusExample.configuration;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import dev.joshlessard.CodersCampusExample.filter.JwtFilter;
import dev.joshlessard.CodersCampusExample.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;

//@EnableWebSecurity TODO Do we need this?
// TODO Should migrate to OAuth for JWT instead of custom security or filters according to https://www.toptal.com/spring/spring-security-tutorial
@Component
public class SecurityConfiguration {

    private final JwtFilter jwtFilter;

    @Autowired
    public SecurityConfiguration( JwtFilter jwtFilter ) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain( HttpSecurity http ) throws Exception {
        // TODO Might need to use deprecated no-arg methods
        http
            .csrf( AbstractHttpConfigurer::disable )
            .cors( AbstractHttpConfigurer::disable )
            .sessionManagement( customizer -> customizer.sessionCreationPolicy( SessionCreationPolicy.STATELESS ) )
            .exceptionHandling(
                customizer -> customizer
                    .authenticationEntryPoint(
                        (request, response, exception) ->
                            response.sendError( HttpServletResponse.SC_UNAUTHORIZED, exception.getMessage() )
                    )
            )
            .authorizeHttpRequests(
                customizer -> customizer
                    .anyRequest().authenticated()
            )
            .formLogin( withDefaults() )
            .addFilterBefore( jwtFilter, UsernamePasswordAuthenticationFilter.class );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder, UserRepository userRepository ) {
        return new DefaultUserDetailsService( passwordEncoder, userRepository );
    }
}
