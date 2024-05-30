package open.mind.its.recrutement.application.offermanagment.DTOS;

import lombok.*;
import open.mind.its.recrutement.application.offermanagment.ENTITIES.Recruitor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OfferDto {
    private String id;
    private  String offer_title;
    private  String localisation;
    private  Double remuneration;
    private  Boolean offer_availability;
    private String Desired_profile;
    private String offer_description;
    private String key_points;
    private String benefits;
    private Date createdat;
    private String fileName;
    private String companyName;
    private String companyid;
    private String currency;
    private List<ValidatorDto> validators;
    private List<RecruitorDto> recruitors;

}
