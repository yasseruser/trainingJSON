package open.mind.its.recruitment.application.personemanagment.WEB;

import lombok.AllArgsConstructor;
import open.mind.its.recruitment.application.personemanagment.DTOS.*;
import open.mind.its.recruitment.application.personemanagment.EXCEPTIONS.CompanyNotFoundException;
import open.mind.its.recruitment.application.personemanagment.EXCEPTIONS.PersonIdNotFoundException;
import open.mind.its.recruitment.application.personemanagment.EXCEPTIONS.UserNotFoundException;
import open.mind.its.recruitment.application.personemanagment.EXCEPTIONS.ValidatorNotFoundException;
import open.mind.its.recruitment.application.personemanagment.SERVICE.PersonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/validator")
public class ValidatorApi {
    private PersonService personService;

    @PostMapping("/savevalidator")
    @PreAuthorize("hasAuthority('HR')")
    public ValidatorDto saveValidator(@RequestBody ValidatorCompanyIdSave saveobject) throws CompanyNotFoundException {
        ValidatorDto dto = ValidatorDto.builder()
                .id(saveobject.getId())
                .email(saveobject.getEmail())
                .city(saveobject.getCity())
                .lastName(saveobject.getLastName())
                .firstName(saveobject.getFirstName())
                .country(saveobject.getCountry())
                .createdDate(saveobject.getCreatedDate())
                .phone(saveobject.getPhone())
                .userId(saveobject.getUserId())
                .build();
        return personService.saveValidator(dto,saveobject.getCompany_id());
    }

    @PostMapping("/updatevalidator")
    @PreAuthorize("hasAnyAuthority('HR','VALIDATOR')")
    public ValidatorDto updateValidator(@RequestBody ValidatorCompanyIdSave saveobject) throws CompanyNotFoundException, PersonIdNotFoundException {
        ValidatorDto dto = ValidatorDto.builder()
                .id(saveobject.getId())
                .email(saveobject.getEmail())
                .city(saveobject.getCity())
                .lastName(saveobject.getLastName())
                .firstName(saveobject.getFirstName())
                .country(saveobject.getCountry())
                .createdDate(saveobject.getCreatedDate())
                .phone(saveobject.getPhone())
                .build();
        return personService.updateValidator(dto,saveobject.getCompany_id());
    }


    @GetMapping("/{validator_id}")
    public ValidatorDto getValidatorById(@PathVariable String validator_id) throws PersonIdNotFoundException {
        return  personService.getValidatorById(validator_id);
    }

    @PostMapping("/getallvalidatorsbyids")
    public List<ValidatorDto> getValidatorsByIds(@RequestBody Map<String,List<String>> validator_ids){
        List<String> ids = validator_ids.get("validator_ids");
        return personService.listValidatorByIds(ids);
    }

    @GetMapping("/company/{company_id}/validators")
    @PreAuthorize("hasAuthority('HR')")
    public PageableValidatorDTO ValidatorsByCompanyId(@PathVariable String company_id, @RequestParam(name="page",defaultValue = "0") int page,
                                                      @RequestParam(name="size",defaultValue = "5")int size) throws CompanyNotFoundException {
        return  personService.listValidatorsByCompanyId(company_id, size,page);
    }

    @GetMapping("/company/{company_id}/validatorsnopagination")
    @PreAuthorize("hasAnyAuthority('HR')")
    public List<ValidatorDto> ValidatorsByCompanyId(@PathVariable String company_id) throws CompanyNotFoundException {
        return  personService.listValidatorsByCompanyIdwithoutPagination(company_id);
    }

    @PostMapping("/validatorbyname")
    @PreAuthorize("hasAnyAuthority('HR')")
    public ValidatorDto ValidatorsByName(@RequestBody ValidatorByNameRequest request) throws ValidatorNotFoundException {
        return  personService.getValidatorByName(request.getFirstName(),request.getLastName());
    }

    @GetMapping("/validators")
    @PreAuthorize("hasAuthority('HR')")
    public PageableValidatorDTO getValidators(@RequestParam(name = "keyword",defaultValue = "") String keyword,
                                              @RequestParam(name = "page", defaultValue = "0")int page,
                                              @RequestParam (name = "size",defaultValue = "5") int size){
        return  this.personService.getAllValidators(keyword,page,size);
    }

    @GetMapping("/user/{userid}")
    public ValidatorDto getValidatirByUserId(@PathVariable String userid) throws UserNotFoundException {
        return  this.personService.getValidatoreByUserId(userid);
    }


}
