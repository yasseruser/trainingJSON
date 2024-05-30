package open.mind.its.recruitement.application.companymanagment.SERVICE;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendHtmlEmail(String to, String subject, String htmlBody) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        try {
            helper.setTo(to);
            helper.setSubject(subject);
            //Resource resource = new ClassPathResource("attachment.jpg");
            //File file;
            //file = resource.getFile();
            //ClassPathResource resource1 = new ClassPathResource("attachment.jpg");
            //byte[] fileBytes = Files.readAllBytes(resource1.getFile().toPath());

            // Encode the image bytes to Base64
            //String base64Image = Base64.getEncoder().encodeToString(fileBytes);

            // Embed the image into the HTML body
            //String htmlBodyWithImage = "<html><body>"+htmlBody+" <br> <img src='data:image/jpg;base64," + base64Image + "' /></body></html>";
            //FileSystemResource fileResource = new FileSystemResource(file);
            //helper.addAttachment("attachment.jpg", file);
            helper.setText(htmlBody , true);

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
