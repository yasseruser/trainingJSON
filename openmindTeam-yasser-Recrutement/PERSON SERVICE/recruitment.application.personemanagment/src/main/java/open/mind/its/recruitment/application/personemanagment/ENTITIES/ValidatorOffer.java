package open.mind.its.recruitment.application.personemanagment.ENTITIES;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ValidatorOffer {
    private String id;
    private String offerid;
    private String validatorid;
    private Date createdat;

}
