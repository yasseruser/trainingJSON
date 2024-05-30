package open.mind.its.recruitment.application.personemanagment.OPENFEIGNCLIENT;

import open.mind.its.recruitment.application.personemanagment.DTOS.OfferDto;
import open.mind.its.recruitment.application.personemanagment.ENTITIES.ValidatorOffer;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


@FeignClient(name = "OFFERSERVICE")
public interface OfferClint {
    @GetMapping("/offer/getoffersofanvalidator/{validator_id}")
     List<ValidatorOffer> getOffersOfAnValidator (@PathVariable String validator_id);

    @GetMapping("/offer/getofferwithoutValidatordetails/{offer_id}")
    OfferDto getOfferById (@PathVariable String offer_id);
}
