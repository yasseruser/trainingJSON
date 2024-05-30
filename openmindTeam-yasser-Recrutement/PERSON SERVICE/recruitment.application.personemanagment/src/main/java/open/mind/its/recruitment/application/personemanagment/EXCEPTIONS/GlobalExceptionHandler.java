package open.mind.its.recruitment.application.personemanagment.EXCEPTIONS;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(CompanyNotFoundException.class)
    public ResponseEntity<Object> handleCompanyNotFoundException(CompanyNotFoundException ex) {
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("error", "Company not found ");
        responseBody.put("message", ex.getMessage());
        responseBody.put("timestamp", LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
    @ExceptionHandler(PersonIdNotFoundException.class)
    public ResponseEntity<Object> handlePersonIdNotFoundException(PersonIdNotFoundException ex) {
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("error", "Person id  not found ");
        responseBody.put("message", ex.getMessage());
        responseBody.put("timestamp", LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(CandidateNotFoundException.class)
    public ResponseEntity<Object> handleCandidateNotFoundException(CandidateNotFoundException ex) {
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("error", "candidate id  not found ");
        responseBody.put("message", ex.getMessage());
        responseBody.put("timestamp", LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(ValidatorNotFoundException.class)
    public ResponseEntity<Object> ValidatorNotFoundExceptionException(ValidatorNotFoundException ex) {
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("error", "validator  not found ");
        responseBody.put("message", ex.getMessage());
        responseBody.put("timestamp", LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(RecruitorNotFoundException.class)
    public ResponseEntity<Object> handleRecruitorNotFoundException(RecruitorNotFoundException ex) {
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("error", " not found ");
        responseBody.put("message", ex.getMessage());
        responseBody.put("timestamp", LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException ex) {
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("error", " not found ");
        responseBody.put("message", ex.getMessage());
        responseBody.put("timestamp", LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
