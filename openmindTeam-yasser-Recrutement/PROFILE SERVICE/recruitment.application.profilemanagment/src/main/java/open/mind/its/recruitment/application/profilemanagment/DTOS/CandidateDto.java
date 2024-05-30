package open.mind.its.recruitment.application.profilemanagment.DTOS;

import lombok.*;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.Skill;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CandidateDto {
    private String id;
    private String firstName;
    private String lastName;
    private LocalDate createdDate;
    private String phone;
    private String city;
    private String country;
    private String email;
    private String status;
    private LocalDate birthDate;
}
