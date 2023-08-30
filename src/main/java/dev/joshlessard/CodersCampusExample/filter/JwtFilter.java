package dev.joshlessard.CodersCampusExample.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import dev.joshlessard.CodersCampusExample.repository.UserRepository;
import dev.joshlessard.CodersCampusExample.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Autowired
    public JwtFilter( UserRepository userRepository, JwtUtil jwtUtil ) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal( HttpServletRequest request, HttpServletResponse response, FilterChain chain ) throws ServletException, IOException {
        String authorizationToken = getAuthorizationToken( request );
        if (authorizationToken == null) {
            chain.doFilter(request, response);
            return;
        }

        UserDetails userDetails = null;
        try {
            userDetails = userRepository.findByUsername( jwtUtil.getUsernameFromToken( authorizationToken ) )
                .orElse( null );
//            Optional<User> appUserOpt = userRepository.findByUsername(jwtUtil.getUsernameFromToken(token));
//            userDetails = proffessoUserRepo
//                    .findByEmail(jwtUtil.getUsernameFromToken(token))
//                    .map(proffessoUser -> new User(proffessoUser, appUserOpt))
//                    .orElse(null);
        } catch (ExpiredJwtException e ){ //| SignatureException e) {
            chain.doFilter(request, response);
            return;
        }

        // Get jwt token and validate
        if (!jwtUtil.validateToken(authorizationToken, userDetails)) {
            chain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken
                authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null,
                userDetails == null
                    ? List.of()
                    : userDetails.getAuthorities()
        );

        authentication.setDetails(
            new WebAuthenticationDetailsSource().buildDetails(request)
        );

        // this is where the authentication magic happens and the user is now valid!
        SecurityContextHolder.getContext().setAuthentication(authentication);

        chain.doFilter(request, response);
    }

    private String getAuthorizationToken( HttpServletRequest request ) {
        return Optional.ofNullable( request.getHeader( "Authorization" ) )
            .map( h -> h.substring( 7 ) )
            .orElse( null );
    }
}
