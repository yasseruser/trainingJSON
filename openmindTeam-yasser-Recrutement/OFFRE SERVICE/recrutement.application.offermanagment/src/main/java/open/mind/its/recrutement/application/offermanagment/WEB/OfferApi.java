package open.mind.its.recrutement.application.offermanagment.WEB;

import lombok.AllArgsConstructor;
import open.mind.its.recrutement.application.offermanagment.DTOS.*;
import open.mind.its.recrutement.application.offermanagment.ENTITIES.RecruitmentProcess;
import open.mind.its.recrutement.application.offermanagment.ENTITIES.ValidatorOffer;
import open.mind.its.recrutement.application.offermanagment.EXCEPTIONS.*;
import open.mind.its.recrutement.application.offermanagment.SERVICES.OfferService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/offer")
public class OfferApi {
    private OfferService offerService;

    @PostMapping("/saveoffer")
    @PreAuthorize("hasAuthority('HR')")
    public OfferDto saveOffer(@RequestBody SaveOfferRequest saveofferrequest) throws CompanyNotFoundException, FileNotFoundException {
        OfferDto offerDto = OfferDto.builder()
                .id("")
                .offer_description(saveofferrequest.getOffer_description())
                .offer_title(saveofferrequest.getOffer_title())
                .offer_availability(saveofferrequest.getOffer_availability())
                .benefits(saveofferrequest.getBenefits())
                .Desired_profile(saveofferrequest.getDesired_profile())
                .key_points(saveofferrequest.getKey_points())
                .localisation(saveofferrequest.getLocalisation())
                .remuneration(saveofferrequest.getRemuneration())
                .currency(saveofferrequest.getCurrency())
                .build();
        return offerService.saveOffer(offerDto, saveofferrequest.getCompany_id());

    }
    @PostMapping("/savevalidatoroffer")
    @PreAuthorize("hasAuthority('HR')")
    public ResponseEntity<Object> saveOfferValidator(@RequestBody SaveOfferValidatorRequest validator) throws ValidatorIdNotFoundException {
        this.offerService.saveofferValidator(validator.getOffer_id(),validator.getValidator_id());
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/saverecruitoroffer")
    @PreAuthorize("hasAuthority('HR')")
    public ResponseEntity<Object> saveOfferRecruitor(@RequestBody SaveOfferRecruitorRequest request) throws RecruitorNotFoundException {
        this.offerService.saveofferRecruitor(request.getOffer_id(),request.getRecruitor_id());
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        return ResponseEntity.ok().body(response);
    }


    @DeleteMapping("/application/delete")
    public ResponseEntity<Object> deleteAnApplication(@RequestBody RecruitmentProcess recruitmentProcess ){
        this.offerService.deleteAnApplication(recruitmentProcess.getId());
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        return ResponseEntity.ok().body(response);
    }


    @GetMapping("/getoffersofanvalidator/{validator_id}")
    @PreAuthorize("hasAuthority('HR')")
    public List<ValidatorOffer> getOffersOfAnValidator(@PathVariable String validator_id){
        return  this.offerService.getOffersOfAnValidator(validator_id);
    }




    @PostMapping("/updateoffer")
    @PreAuthorize("hasAuthority('HR')")
    public OfferDto updateOffer(@RequestBody SaveOfferRequest saveofferrequest) throws CompanyNotFoundException, FileNotFoundException, OfferNotFoundException {
        OfferDto offerDto = OfferDto.builder()
                .id(saveofferrequest.getId())
                .offer_description(saveofferrequest.getOffer_description())
                .offer_title(saveofferrequest.getOffer_title())
                .offer_availability(saveofferrequest.getOffer_availability())
                .benefits(saveofferrequest.getBenefits())
                .Desired_profile(saveofferrequest.getDesired_profile())
                .key_points(saveofferrequest.getKey_points())
                .localisation(saveofferrequest.getLocalisation())
                .remuneration(saveofferrequest.getRemuneration())
                .currency(saveofferrequest.getCurrency())
                .build();
        return offerService.updateOffer(offerDto, saveofferrequest.getCompany_id());
    }

    @GetMapping("/company/{company_id}/offers")
    @PreAuthorize("hasAuthority('HR')")
    public PageableOfferDto getOfferByCompanyById(@PathVariable String company_id,
                                                  @RequestParam(name="page",defaultValue = "0") int page,
                                                  @RequestParam(name="size",defaultValue = "5")int size) throws CompanyNotFoundException {

        return  offerService.getOffersByCompanyid(company_id,size,page);
    }


    @GetMapping("/offers")
    @PreAuthorize("hasAnyAuthority('HR','CANDIDATE')")
    public PageableOfferDto getOffers(@RequestParam(name="page",defaultValue = "0") int page,
                                                  @RequestParam(name="size",defaultValue = "5")int size,
                                                  @RequestParam(name = "keyword",defaultValue = "") String keyword) {
        return offerService.searchOfferByName(keyword,size, page);
    }

    @GetMapping("/offersnosearsh")
    @PreAuthorize("hasAnyAuthority('HR','CANDIDATE')")
    public PageableOfferDto getOffers(@RequestParam(name="page",defaultValue = "0") int page,
                                      @RequestParam(name="size",defaultValue = "5")int size) {
        return offerService.getOfferPage(size, page);
    }

    @GetMapping("/offers/of/{validatorid}/validator")
    @PreAuthorize("hasAuthority('VALIDATOR')")
    public PageableOfferDto getOffersOfValidator(@RequestParam(name="page",defaultValue = "0") int page,
                                      @RequestParam(name="size",defaultValue = "5")int size,
                                                 @PathVariable String validatorid) throws ValidatorIdNotFoundException, OfferNotFoundException {
        return offerService.getOfferByValidator(validatorid,size,page);
    }

    @GetMapping("/offers/of/{recruitorid}/recruitor")
    @PreAuthorize("hasAuthority('RECRUITOR')")
    public PageableOfferDto getOffersOfRecruitor(@RequestParam(name="page",defaultValue = "0") int page,
                                                 @RequestParam(name="size",defaultValue = "5")int size,
                                                 @PathVariable String recruitorid) throws  OfferNotFoundException, RecruitorNotFoundException {
        return offerService.getOfferByRecruitor(recruitorid,size,page);
    }


    @GetMapping("/offersnopagination")
    @PreAuthorize("hasAuthority('HR')")
    public List<OfferDto> getOffers() {
        return offerService.getAllOffer();
    }

    @GetMapping("/{offer_id}/applications")
    @PreAuthorize("hasAnyAuthority('HR','RECRUITOR')")
    public PageableApplicationDto getAoolicationsByOffer(@PathVariable String offer_id,
                                                         @RequestParam(name="page",defaultValue = "0") int page,
                                                         @RequestParam(name="name",defaultValue = "") String name,
                                                         @RequestParam(name="tag",defaultValue = "") String tag,
                                                         @RequestParam(name="profile",defaultValue = "") String profile,
                                                         @RequestParam(name="size",defaultValue = "5")int size) throws OfferNotFoundException {
        return  offerService.getAllApplicationsByOffer(name,tag,profile,offer_id,false,false,size,page);
    }


    @GetMapping("/{offer_id}/applications/validatedbyreccruitor")
    @PreAuthorize("hasAnyAuthority('VALIDATOR','RECRUITOR')")
    public PageableApplicationDto getAoolicationsByOfferValidatedByRecruitor(@PathVariable String offer_id,
                                                         @RequestParam(name="page",defaultValue = "0") int page,
                                                                             @RequestParam(name="name",defaultValue = "") String name,
                                                                             @RequestParam(name="tag",defaultValue = "") String tag,
                                                                             @RequestParam(name="profile",defaultValue = "") String profile,
                                                         @RequestParam(name="size",defaultValue = "5")int size) throws OfferNotFoundException {
        return  offerService.getAllApplicationsByOffer(name,tag,profile,offer_id,true,false,size,page);
    }

    @GetMapping("/{offer_id}/applications/validatedbyvalidator")
    @PreAuthorize("hasAuthority('VALIDATOR')")
    public PageableApplicationDto getAoolicationsByOfferValidatedByValidator(@PathVariable String offer_id,
                                                                             @RequestParam(name="page",defaultValue = "0") int page,
                                                                             @RequestParam(name="name",defaultValue = "") String name,
                                                                             @RequestParam(name="tag",defaultValue = "") String tag,
                                                                             @RequestParam(name="profile",defaultValue = "") String profile,
                                                                             @RequestParam(name="size",defaultValue = "5")int size) throws OfferNotFoundException {
        return  offerService.getAllApplicationsByOffer(name,tag,profile,offer_id,true,true,size,page);
    }

    @DeleteMapping("/deleteoffer/{offer_id}")
    @PreAuthorize("hasAuthority('HR')")
    public ResponseEntity<?> deleteOfferById(@PathVariable String offer_id){
        offerService.deleteByOfferId(offer_id);
        return new ResponseEntity<>("Offer has been deleted", HttpStatus.OK);
    }


    @PostMapping("/validator/applay")
    @PreAuthorize("hasAuthority('VALIDATOR')")
    public ResponseEntity<?> ApplayToAnOfferbyvalidator(@RequestBody RecruitmentProcess recruitmentProcess) throws ProfileNotFoundException, OfferNotFoundException {
        offerService.ApplyToAnOfferByValidator(recruitmentProcess);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/recruitor/applay")
    @PreAuthorize("hasAuthority('RECRUITOR')")
    public ResponseEntity<?> ApplayToAnOfferbyrecruitor(@RequestBody RecruitmentProcess recruitmentProcess) throws ProfileNotFoundException, OfferNotFoundException {
        offerService.ApplyToAnOfferByRecruitor(recruitmentProcess);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/hr/applay")
    @PreAuthorize("hasAuthority('HR')")
    public ResponseEntity<?> ApplayToAnOfferbyhr(@RequestBody RecruitmentProcess recruitmentProcess) throws ProfileNotFoundException, OfferNotFoundException {
        offerService.ApplyToAnOfferByHrOrCandidate(recruitmentProcess);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/applay")
    public ResponseEntity<?> ApplayToAnOfferbyCandidate(@RequestBody RecruitmentProcess recruitmentProcess) throws ProfileNotFoundException, OfferNotFoundException {
        recruitmentProcess.setTag("init");
        offerService.ApplyToAnOfferByHrOrCandidate(recruitmentProcess);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/applay/{offer_id}/profile/{profile_id}")
    public RecruitmentProcess getApplayById(@PathVariable String offer_id, @PathVariable String profile_id ) throws  ApplicationNotFoundException {
        return this.offerService.getRecruitmentProcessById(offer_id,profile_id);
    }

    @GetMapping("/validators")
    @PreAuthorize("hasAuthority('HR')")
    public PageableValidatorsOfferDto getValidatorOffers(@RequestParam(name="page",defaultValue = "0") int page,
                                                         @RequestParam(name="size",defaultValue = "5")int size) throws OfferNotFoundException {
        return  offerService.getValidatorswithAssocoiatedOffer(size,page);
    }

    @GetMapping("/{offer_id}")
    public OfferDto getOfferById(@PathVariable String offer_id) throws OfferNotFoundException {
        return this.offerService.getOfferById(offer_id);
    }

    @GetMapping("/getofferwithoutValidatordetails/{offer_id}")
    public OfferDto getOfferByIdWithoutValidatotrDetails(@PathVariable String offer_id) throws OfferNotFoundException {
        return this.offerService.getOfferByIdWithoutValidatorDetails(offer_id);
    }

    @GetMapping("/is/{profile_id}/associated/{offer_id}")
    public Map<String,Boolean> isProfileAssociatedToOffer(@PathVariable String offer_id, @PathVariable String profile_id){
        Boolean isIt =  this.offerService.isProfileAssociatedToOfferPrevously(offer_id,profile_id);
        Map<String ,Boolean> is = new HashMap<String,Boolean>();
        is.put("isIt",isIt);
        return is;
    }

    @GetMapping("/profile/{profile_id}/applications")
    public PageableApplicationDto getApplicationsOfAnProfile(@PathVariable  String profile_id,
                                                     @RequestParam(name="page",defaultValue = "0") int page,
                                                     @RequestParam(name="size",defaultValue = "5")int size) throws OfferNotFoundException {
        return this.offerService.getApplicationsOfAnProfile(profile_id,page,size);
    }


}
