package open.mind.its.recrutement.application.offermanagment.OPENFEIGNCLIENT;

import jakarta.ws.rs.POST;
import open.mind.its.recrutement.application.offermanagment.DTOS.ProfileDto;
import open.mind.its.recrutement.application.offermanagment.DTOS.ValidatorDto;
import open.mind.its.recrutement.application.offermanagment.ENTITIES.RecruitmentProcess;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@FeignClient(name = "PROFILESERVICE")
public interface OfferClientProfile {
    @PostMapping("/profile/getallprofilebyids")
    Collection<ProfileDto> getallprofilebyids(@RequestBody Map<String, List<String>> profile_ids);

    @PostMapping("/profile/getprofilesbyidsandprofiletitle")
    Collection<ProfileDto> getallprofilebyidsandbyprofileTitle(@RequestBody Map<String, List<String>> profile_ids,@RequestParam(name = "profiletitle",defaultValue = "") String profiletitle);
    @DeleteMapping("/profile/deleteoffer/{offer_id}")
    ResponseEntity<String> deleteProfileByOfferId(@PathVariable String offer_id);

    @GetMapping("/profile/{profile_id}")
    ProfileDto getProfilrById(@PathVariable String profile_id);

    @PostMapping("/profile/applay")
    RecruitmentProcess ApplayToAnOffer(@RequestBody RecruitmentProcess recruitmentProcess);

    @DeleteMapping("/profile/application/delete")
    ResponseEntity<Object> deleteAnApplication(@RequestBody RecruitmentProcess recruitmentProcess);
}
