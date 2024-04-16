package edu.miu.cs489.budgetbuddysystem.advice;

import edu.miu.cs489.budgetbuddysystem.dto.response.CustomResponse;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@RestControllerAdvice
public class CustomResponseWrapperAdvice implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        if (body instanceof CustomResponse<?>)
            return body;

        if (body instanceof ResponseStatusException exception) {
            return CustomResponse.builder()
                    .statusCode(exception.getStatusCode().value())
                    .message(exception.getMessage())
                    .build();
        } else {
            return CustomResponse.builder()
                    .statusCode(HttpStatus.OK.value())
                    .message("Success")
                    .data(body)
                    .build();
        }
    }
}
