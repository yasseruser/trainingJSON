package open.mind.its.recruitement.application.companymanagment.DTOS;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class EmailRequest {
    private String to;
    private String htmlBody;
    private String subject;
}
