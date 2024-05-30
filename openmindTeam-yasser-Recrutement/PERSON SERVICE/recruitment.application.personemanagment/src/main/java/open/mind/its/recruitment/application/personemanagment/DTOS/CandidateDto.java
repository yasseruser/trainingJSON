package open.mind.its.recruitment.application.personemanagment.DTOS;

import lombok.*;

import java.time.LocalDate;
import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
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
    private Boolean hasAccount;
    private String userId;
    private Collection<LocalDate> slots;
}
