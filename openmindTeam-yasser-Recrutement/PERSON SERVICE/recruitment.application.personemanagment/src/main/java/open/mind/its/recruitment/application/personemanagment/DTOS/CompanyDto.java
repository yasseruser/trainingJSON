package open.mind.its.recruitment.application.personemanagment.DTOS;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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
