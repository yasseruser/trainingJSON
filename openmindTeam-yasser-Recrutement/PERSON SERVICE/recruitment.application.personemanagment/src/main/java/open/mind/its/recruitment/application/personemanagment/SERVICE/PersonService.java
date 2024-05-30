package open.mind.its.recruitment.application.personemanagment.SERVICE;

import open.mind.its.recruitment.application.personemanagment.DTOS.*;
import open.mind.its.recruitment.application.personemanagment.EXCEPTIONS.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PersonService {
    ValidatorDto saveValidator(ValidatorDto dto,String company_id) throws CompanyNotFoundException;
     ValidatorDto updateValidator(ValidatorDto dto,String company_id) throws CompanyNotFoundException, PersonIdNotFoundException;

    ValidatorDto getValidatorById(String validator_id) throws PersonIdNotFoundException;
    List<ValidatorDto> listValidators();
    List<ValidatorDto> listValidatorsByCompany(String company_id);
    List<ValidatorDto> listValidatorsByOffer(String offer_id);
    List<ValidatorDto> listValidatorByIds(List<String> validator_ids);
    CandidateDto getCandidateById(String candidate_id) throws CandidateNotFoundException, PersonIdNotFoundException;
    CandidateDto saveCandidate(CandidateDto candidateDto);
    CandidateDto updateCandidate(CandidateDto candidateDto) throws CandidateNotFoundException, PersonIdNotFoundException;

    List<CandidateDto> getAllCandidateByIds(List<String> candidate_ids);
    void deleteoffer(String offerid);
    PageableValidatorDTO listValidatorsByCompanyId(String company_id, int size, int page) throws CompanyNotFoundException;

    PageableCandidateDTO listCandidates( String lastName,int size, int page) ;
    List<ValidatorDto> listValidatorsByCompanyIdwithoutPagination(String company_id) throws CompanyNotFoundException;
    List<RecruitorDto> listRecruitorssByCompanyIdwithoutPagination(String company_id) throws CompanyNotFoundException;


    ValidatorDto getValidatorByName(String firstname, String lastName) throws ValidatorNotFoundException;
    List<CandidateDto> getCandidateByName(String lastname);

    RecruitorDto saveRecruitor(RecruitorDto recruitorDto);

    RecruitorDto updateRecruitor(RecruitorDto recruitorDto) throws RecruitorNotFoundException;

    List<RecruitorDto> getAllRecruitors();
    RecruitorDto getRecruitorById(String id) throws RecruitorNotFoundException ;
    PageableRecruitorDTO getAllRecruitors(String kw,int page,int size);
    PageableValidatorDTO getAllValidators(String kw, int page, int size);
    CandidateDto getCandidateeByUserId(String userId) throws UserNotFoundException;
    RecruitorDto getRecruitoreByUserId(String userId) throws UserNotFoundException;
    ValidatorDto getValidatoreByUserId(String userId) throws UserNotFoundException;






}
