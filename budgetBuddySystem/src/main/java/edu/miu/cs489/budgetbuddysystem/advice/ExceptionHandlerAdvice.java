package edu.miu.cs489.budgetbuddysystem.advice;

import edu.miu.cs489.budgetbuddysystem.dto.response.CustomResponse;
import edu.miu.cs489.budgetbuddysystem.exception.EntityAlreadyExistException;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlerAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    public CustomResponse handleBadRequestException(BadRequestException exception) {
        return CustomResponse.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(exception.getMessage())
                .build();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(EntityAlreadyExistException.class)
    public CustomResponse handleEntityAlreadyExistException(EntityAlreadyExistException exception) {
        return CustomResponse.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(exception.getMessage())
                .build();
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(BadCredentialsException.class)
    public CustomResponse handleBadCredentialException(BadCredentialsException exception) {
        return CustomResponse.builder()
                .statusCode(HttpStatus.UNAUTHORIZED.value())
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
