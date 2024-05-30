package open.mind.its.recruitement.application.companymanagment.WEB;

import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import open.mind.its.recruitement.application.companymanagment.DTOS.EmailRequest;
import open.mind.its.recruitement.application.companymanagment.SERVICE.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/mail")
public class EmailApi {

    private EmailService emailService;

    @PostMapping("/send")
    @PreAuthorize("hasAnyAuthority('HR','RECRUITOR','VALIDATOR')")
    public ResponseEntity<Object> sendEmail(@RequestBody EmailRequest emailRequest) throws MessagingException {
        this.emailService.sendHtmlEmail(emailRequest.getTo(),emailRequest.getSubject(),emailRequest.getHtmlBody());
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        return ResponseEntity.ok().body(response);
    }
}
