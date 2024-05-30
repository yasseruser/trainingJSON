package open.mind.its.recruitment.application.profilemanagment.OPENFEIGNCLINET;

import open.mind.its.recruitment.application.profilemanagment.DTOS.CandidateDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(name = "PERSONSERVICE")
public interface ProfileClientPerson {

    @GetMapping("/candidate/{candidate_id}")
    public CandidateDto getCandidatebyId(@PathVariable String candidate_id);

}
