package open.mind.its.recruitment.application.personemanagment.DTOS;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class ValidatorByNameRequest {
    private String firstName;
    private String lastName;
}
