package open.mind.its.recruitment.application.personemanagment.DTOS;

import lombok.*;
import open.mind.its.recruitment.application.personemanagment.ENTITIES.Person;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ValidatorCompanyIdSave {

    private String id;
    private String firstName;
    private String lastName;
    private LocalDate createdDate;
    private String phone;
    private String city;
    private String country;
    private String email;
    private String company_id;
    private String userId;

}
