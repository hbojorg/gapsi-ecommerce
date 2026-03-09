package com.gapsi.ecommerce.infrastructure.exception;

import com.gapsi.ecommerce.domain.exception.ProveedorDuplicadoException;
import com.gapsi.ecommerce.domain.exception.ProveedorNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Manejador global de excepciones para los controladores REST.
 * Centraliza el manejo de errores y garantiza respuestas consistentes.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Maneja excepciones de proveedor duplicado.
     *
     * @param ex excepcion de proveedor duplicado
     * @return respuesta 409 Conflict
     */
    @ExceptionHandler(ProveedorDuplicadoException.class)
    public ResponseEntity<Map<String, String>> handleProveedorDuplicado(ProveedorDuplicadoException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    /**
     * Maneja excepciones de proveedor no encontrado.
     *
     * @param ex excepcion de proveedor no encontrado
     * @return respuesta 404 Not Found
     */
    @ExceptionHandler(ProveedorNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleProveedorNotFound(ProveedorNotFoundException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    /**
     * Maneja excepciones de validacion de argumentos (Bean Validation).
     *
     * @param ex excepcion de validacion
     * @return respuesta 400 Bad Request con detalle de errores
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", "Error de validacion");

        Map<String, String> fieldErrors = ex.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(
                        fieldError -> fieldError.getField(),
                        fieldError -> fieldError.getDefaultMessage() != null ? fieldError.getDefaultMessage() : "Error de validacion",
                        (existing, replacement) -> existing
                ));

        response.put("details", fieldErrors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    /**
     * Maneja excepciones genericas no controladas.
     *
     * @param ex excepcion generica
     * @return respuesta 500 Internal Server Error
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Error interno del servidor");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
