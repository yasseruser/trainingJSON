package open.mind.its.recrutement.application.offermanagment.DTOS;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SaveOfferRecruitorRequest {
    private String id;
    private String recruitor_id;
    private String offer_id;
}
