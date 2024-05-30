package open.mind.its.recruitment.application.personemanagment.DTOS;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecruitorDto {
    private String id;
    private String firstName;
    private String lastName;
    private LocalDate createdDate;
    private String phone;
    private String city;
    private String country;
    private String email;
    private String companyid;
    private CompanyDto companyDto;
    private String userId;

}
