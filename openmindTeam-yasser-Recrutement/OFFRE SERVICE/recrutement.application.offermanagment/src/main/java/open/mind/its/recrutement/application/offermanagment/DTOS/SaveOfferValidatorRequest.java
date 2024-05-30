package open.mind.its.recrutement.application.offermanagment.DTOS;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class SaveOfferValidatorRequest {
    private String offer_id;
    private String validator_id;
}
