package open.mind.its.recrutement.application.offermanagment.OPENFEIGNCLIENT;

import open.mind.its.recrutement.application.offermanagment.DTOS.CompanyDto;
import open.mind.its.recrutement.application.offermanagment.DTOS.RecruitorDto;
import open.mind.its.recrutement.application.offermanagment.DTOS.ValidatorDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@FeignClient(name = "PERSONSERVICE")
public interface OfferClientValidator {
    @PostMapping("/validator/getallvalidatorsbyids")
    Collection<ValidatorDto> getallvalidatorbyids(@RequestBody Map<String,List<String>> validator_ids);
    @GetMapping("/validator/{validator_id}")
    ValidatorDto getvalidatorbyid(@PathVariable String validator_id);
    @DeleteMapping("/Validator/deleteoffer/{offer_id}")
    ResponseEntity<String> deleteValidatorByOfferId(@PathVariable String offer_id);

    @GetMapping("/recruitor/{recruitor_id}")
    RecruitorDto getRecruitorById(@PathVariable String recruitor_id);
}
