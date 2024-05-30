package open.mind.its.recruitment.application.personemanagment.DTOS;

import lombok.*;

import java.time.LocalDate;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ValidatorDto {

    private String id;
    private String firstName;
    private String lastName;
    private LocalDate createdDate;
    private String phone;
    private String city;
    private String country;
    private String email;
    private CompanyDto companyDto;
    private OfferDto offerDto;
    private String userId;
    private String companyid;


}
