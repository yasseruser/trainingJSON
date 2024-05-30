package open.mind.its.recruitment.application.personemanagment.WEB;

import lombok.AllArgsConstructor;
import open.mind.its.recruitment.application.personemanagment.DTOS.CandidateDto;
import open.mind.its.recruitment.application.personemanagment.DTOS.PageableRecruitorDTO;
import open.mind.its.recruitment.application.personemanagment.DTOS.RecruitorDto;
import open.mind.its.recruitment.application.personemanagment.EXCEPTIONS.CompanyNotFoundException;
import open.mind.its.recruitment.application.personemanagment.EXCEPTIONS.RecruitorNotFoundException;
import open.mind.its.recruitment.application.personemanagment.EXCEPTIONS.UserNotFoundException;
import open.mind.its.recruitment.application.personemanagment.SERVICE.PersonService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/recruitor")
public class RecruitorApi {

    private PersonService personService;
    @PostMapping("/save")
    @PreAuthorize("hasAuthority('HR')")
    public RecruitorDto saveRecruitor(@RequestBody RecruitorDto recruitorDto){
        return personService.saveRecruitor(recruitorDto);
    }

    @GetMapping("/recruitors")
    @PreAuthorize("hasAuthority('HR')")
    public List<RecruitorDto> getRectors(){
        return  personService.getAllRecruitors();
    }

    @GetMapping("/recruitorspaginable")
    @PreAuthorize("hasAuthority('HR')")
    public PageableRecruitorDTO getRectorsPagableObject(@RequestParam(name = "keyword",defaultValue = "") String keyword,
                                                        @RequestParam(name = "page", defaultValue = "0")int page,
                                                        @RequestParam (name = "size",defaultValue = "5") int size){
        return this.personService.getAllRecruitors(keyword,page,size);
    }

    @GetMapping("/company/{company_id}/recruitorsnopagination")
    @PreAuthorize("hasAuthority('HR')")
    public List<RecruitorDto> ValidatorsByCompanyId(@PathVariable String company_id) throws CompanyNotFoundException {
        return  personService.listRecruitorssByCompanyIdwithoutPagination(company_id);
    }

    @PostMapping("/updaterecrutor")
    @PreAuthorize("hasAnyAuthority('HR','RECRUITOR')")
    public RecruitorDto updateRecruitor(@RequestBody RecruitorDto recruitorDto) throws RecruitorNotFoundException {
        return personService.updateRecruitor(recruitorDto);
    }

    @GetMapping("/{recruitor_id}")
    public RecruitorDto getRecruitorById(@PathVariable String recruitor_id) throws  RecruitorNotFoundException {
        return this.personService.getRecruitorById(recruitor_id);
    }

    @GetMapping("/user/{userid}")
    public RecruitorDto getRecruitorByUserId(@PathVariable String userid) throws UserNotFoundException {
        return  this.personService.getRecruitoreByUserId(userid);
    }
}
