package open.mind.its.recrutement.application.offermanagment.DTOS;

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
    private  String offer_title;
    private String companyName;
}
