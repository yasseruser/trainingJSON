package open.mind.its.recruitment.application.personemanagment.MAPPERS;

import open.mind.its.recruitment.application.personemanagment.DTOS.CandidateDto;
import open.mind.its.recruitment.application.personemanagment.DTOS.RecruitorDto;
import open.mind.its.recruitment.application.personemanagment.DTOS.ValidatorDto;
import open.mind.its.recruitment.application.personemanagment.ENTITIES.Candidate;
import open.mind.its.recruitment.application.personemanagment.ENTITIES.Recruitor;
import open.mind.its.recruitment.application.personemanagment.ENTITIES.Validator;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class PersonMapper {

    public ValidatorDto fromValidatorToDto(Validator v){
        ValidatorDto dto = new ValidatorDto();
        BeanUtils.copyProperties(v,dto);
        return  dto;
    }

    public Validator fromValidatorDtoToValidator(ValidatorDto dto){
        Validator v = new Validator();
        BeanUtils.copyProperties(dto,v);
        return  v;
    }

    public Candidate fromCandidateDtoToCandidate(CandidateDto dto){
        Candidate c = new Candidate();
        BeanUtils.copyProperties(dto,c);
        return  c;
    }

    public CandidateDto fromCandidateToCandidateDto(Candidate candidate){
        CandidateDto dto = new CandidateDto();
        BeanUtils.copyProperties(candidate,dto);
        return  dto;
    }

    public Recruitor fromRecruitorDtoToRecruitor(RecruitorDto dto){
        Recruitor c = new Recruitor();
        BeanUtils.copyProperties(dto,c);
        return  c;
    }

    public RecruitorDto fromRecruitorToRecruitorDto(Recruitor d){
        RecruitorDto c = new RecruitorDto();
        BeanUtils.copyProperties(d,c);
        return  c;
    }

}
