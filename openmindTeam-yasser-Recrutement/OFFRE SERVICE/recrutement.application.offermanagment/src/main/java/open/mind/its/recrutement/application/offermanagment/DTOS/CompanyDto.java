package open.mind.its.recrutement.application.offermanagment.DTOS;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompanyDto {
    private String Id;
    private String name;
    private String address;
    private String country;
    private String contact;
    private String email;
    private String webSiteLink;
    private String sector;
    private String informations;

}
