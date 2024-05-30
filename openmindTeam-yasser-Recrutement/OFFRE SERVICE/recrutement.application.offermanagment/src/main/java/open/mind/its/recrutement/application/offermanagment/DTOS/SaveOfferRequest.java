package open.mind.its.recrutement.application.offermanagment.DTOS;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SaveOfferRequest {
    private String id;
    private  String offer_title;
    private  String localisation;
    private  Double remuneration;
    private  Boolean offer_availability;
    private String desired_profile;
    private String offer_description;
    private String key_points;
    private String benefits;
    private String company_id;
    private String currency;

    private Collection<String> validator_ids;


}
