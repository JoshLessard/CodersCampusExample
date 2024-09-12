package dev.joshlessard.CodersCampusExample.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.joshlessard.CodersCampusExample.domain.User;
import dev.joshlessard.CodersCampusExample.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;

@RestController
@RequestMapping( "/api/auth" )
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthenticationController( HttpSecurity httpSecurity, JwtUtil jwtUtil ) throws Exception {
        this.authenticationManager = httpSecurity.getSharedObject( AuthenticationManagerBuilder.class ).build();
        this.jwtUtil = jwtUtil;
    }

    @PostMapping( "/login" )
    public ResponseEntity<?> logIn( @RequestBody AuthenticationCredentialsRequest request ) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken( request.getUsername(), request.getPassword() )
            );

            User user = (User) authentication.getPrincipal();

            return ResponseEntity.ok()
                .header(
                    HttpHeaders.AUTHORIZATION,
                    jwtUtil.generateToken( user )
                )
                .body( user );
        } catch ( BadCredentialsException e ) {
            return ResponseEntity.status( HttpStatus.UNAUTHORIZED ).build();
        }
    }

    @GetMapping( "/validate" )
    public ResponseEntity<?> validateToken(@RequestParam String token, @AuthenticationPrincipal User user ) {
        try {
            return ResponseEntity.ok( jwtUtil.validateToken( token, user ) );
        } catch ( ExpiredJwtException e ) {
            return ResponseEntity.ok( false );
        }
    }
}
