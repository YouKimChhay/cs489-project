package edu.miu.cs489.budgetbuddysystem.advice;

import edu.miu.cs489.budgetbuddysystem.dto.response.CustomResponse;
import edu.miu.cs489.budgetbuddysystem.exception.EntityAlreadyExistException;
import edu.miu.cs489.budgetbuddysystem.exception.UnauthorizedException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlerAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(EntityAlreadyExistException.class)
    public CustomResponse handleBadRequest(Exception exception) {
        return CustomResponse.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(exception.getMessage())
                .build();
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler({BadCredentialsException.class, UnauthorizedException.class})
    public CustomResponse handleUnauthorized(Exception exception) {
        return CustomResponse.builder()
                .statusCode(HttpStatus.UNAUTHORIZED.value())
                .message(exception.getMessage())
                .build();
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EntityNotFoundException.class)
    public CustomResponse handleNotFound(EntityNotFoundException exception) {
        return CustomResponse.builder()
                .statusCode(HttpStatus.NOT_FOUND.value())
                .message(exception.getMessage())
                .build();
    }

    @ResponseBody
    @ExceptionHandler(Exception.class)
    public CustomResponse handleGenericException(Exception exception) {
        HttpStatus httpStatus = getResponseStatus(exception.getClass());
        return CustomResponse.builder()
                .statusCode(httpStatus.value())
                .message(exception.getMessage())
                .build();
    }

    private HttpStatus getResponseStatus(Class<?> exceptionClass) {
        ResponseStatus responseStatus = exceptionClass.getAnnotation(ResponseStatus.class);
        if (responseStatus != null)
            return responseStatus.value();
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
