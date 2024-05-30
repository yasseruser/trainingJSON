package open.mind.its.recruitment.application.personemanagment.WEB;

import lombok.AllArgsConstructor;
import open.mind.its.recruitment.application.personemanagment.DTOS.CandidateDto;
import open.mind.its.recruitment.application.personemanagment.DTOS.PageableCandidateDTO;
import open.mind.its.recruitment.application.personemanagment.EXCEPTIONS.CandidateNotFoundException;
import open.mind.its.recruitment.application.personemanagment.EXCEPTIONS.PersonIdNotFoundException;
import open.mind.its.recruitment.application.personemanagment.EXCEPTIONS.UserNotFoundException;
import open.mind.its.recruitment.application.personemanagment.SERVICE.PersonService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/candidate")
public class CandidateApi {
    private PersonService personService;
    @GetMapping("/{candidate_id}")
    public CandidateDto getCandidateById(@PathVariable String candidate_id) throws PersonIdNotFoundException, CandidateNotFoundException {
        return personService.getCandidateById(candidate_id);
    }
    @PostMapping("/savecandidate")
    @PreAuthorize("hasAnyAuthority('HR','CANDIDATE')")
    public CandidateDto saveCandidate(@RequestBody CandidateDto candidateDto){
        return   personService.saveCandidate(candidateDto);
    }
    @PostMapping("/updatecandidate")
    @PreAuthorize("hasAnyAuthority('HR','CANDIDATE')")
    public CandidateDto updateCandidate(@RequestBody CandidateDto candidateDto) throws CandidateNotFoundException, PersonIdNotFoundException {
        return   personService.updateCandidate(candidateDto);
    }

    @PostMapping("/getallcandidatebyids")
    @PreAuthorize("hasAnyAuthority('HR','RECRUITOR','VALIDATOR')")
    public List<CandidateDto> getAllCandidateByIds(@RequestBody Map<String,List<String>> candidate_ids){
        return   personService.getAllCandidateByIds(candidate_ids.get("candidate_ids"));
    }

    @GetMapping("/company/candidates")
    @PreAuthorize("hasAnyAuthority('HR','RECRUITOR','VALIDATOR')")
    public PageableCandidateDTO getCandidated(@RequestParam(name="page",defaultValue = "0") int page,
                                                      @RequestParam(name="size",defaultValue = "5")int size,
                                              @RequestParam(name="keyword",defaultValue = "") String keyword)  {
        return  personService.listCandidates(keyword,size,page);
    }

    @GetMapping("/filterbylastname")
    @PreAuthorize("hasAnyAuthority('HR','RECRUITOR','VALIDATOR')")
    public List<CandidateDto> filterCandidateByLastName(@RequestParam(name = "keyword",defaultValue = "") String keyword){
        return  this.personService.getCandidateByName(keyword);
    }

    @GetMapping("/user/{userid}")
    public CandidateDto getCandidateByUserId(@PathVariable String userid) throws UserNotFoundException {
        return  this.personService.getCandidateeByUserId(userid);
    }
}
