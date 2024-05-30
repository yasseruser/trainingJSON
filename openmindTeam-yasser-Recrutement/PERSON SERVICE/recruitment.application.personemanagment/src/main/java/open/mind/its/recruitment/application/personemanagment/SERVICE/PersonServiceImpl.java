package open.mind.its.recruitment.application.personemanagment.SERVICE;

import lombok.NoArgsConstructor;
import open.mind.its.recruitment.application.personemanagment.DTOS.*;
import open.mind.its.recruitment.application.personemanagment.ENTITIES.*;
import open.mind.its.recruitment.application.personemanagment.EXCEPTIONS.*;
import open.mind.its.recruitment.application.personemanagment.MAPPERS.PersonMapper;
import open.mind.its.recruitment.application.personemanagment.OPENFEIGNCLIENT.CompanyClient;
import open.mind.its.recruitment.application.personemanagment.OPENFEIGNCLIENT.OfferClint;
import open.mind.its.recruitment.application.personemanagment.REPO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@NoArgsConstructor
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonRepo personRepo;
    @Autowired
    private PersonMapper personMapper;
    @Autowired
    private CompanyClient companyClient;
    @Autowired
    private OfferClint offerClint;
    @Autowired
    private CandidateRepo candidateRepo;
    @Autowired
    private RecruitorRepo recruitorRepo;
    @Autowired
    private ValidatorRepo validatorRepo;




    @Override
    public ValidatorDto saveValidator(ValidatorDto dto,String company_id) throws CompanyNotFoundException {
        CompanyDto companyDto = companyClient.getCompany(company_id);
        if(companyDto == null) throw new CompanyNotFoundException("company id related to this validator not found");
        Validator validator = personMapper.fromValidatorDtoToValidator(dto);
        validator.setCompanyid(company_id);
        validator.setId(UUID.randomUUID().toString());
        validator.setCreatedDate(LocalDate.now());
        System.out.println(dto.getUserId());
        System.out.println("********************");

        Validator savedValidator = personRepo.save(validator);
        return personMapper.fromValidatorToDto(savedValidator);
    }

    @Override
    public ValidatorDto updateValidator(ValidatorDto dto,String company_id) throws CompanyNotFoundException, PersonIdNotFoundException {
        CompanyDto companyDto = companyClient.getCompany(company_id);
        if(companyDto == null) throw new CompanyNotFoundException("company id related to this validator not found");
        Validator validator = personMapper.fromValidatorDtoToValidator(dto);
        validator.setCompanyid(company_id);
        validator.setCreatedDate(LocalDate.now());
        ValidatorDto Old= getValidatorById(validator.getId());
        validator.setUserId(Old.getUserId());
        Validator savedValidator = personRepo.save(validator);
        return personMapper.fromValidatorToDto(savedValidator);
    }

    @Override
    public ValidatorDto getValidatorById(String validator_id) throws PersonIdNotFoundException {
        Person p = personRepo.findById(validator_id).orElseThrow(() -> new PersonIdNotFoundException("validator id not fount exception") );
        if(p==null) throw  new PersonIdNotFoundException("validator id not found exception");
        if(p instanceof Validator){
            return personMapper.fromValidatorToDto((Validator) p);
        }
        else throw new PersonIdNotFoundException("this is not a id for validator entity");
    }

    @Override
    public List<ValidatorDto> listValidators() {
        return null;
    }

    @Override
    public List<ValidatorDto> listValidatorsByCompany(String company_id) {
        return null;
    }

    @Override
    public List<ValidatorDto> listValidatorsByOffer(String offer_id) {
        return null;
    }

    @Override
    public List<ValidatorDto> listValidatorByIds(List<String> validator_ids) {
        List<Person> peaple = personRepo.findAllByIdIn(validator_ids);
        List<ValidatorDto> validatorDtos = peaple.stream().map(va ->{
            return  personMapper.fromValidatorToDto( (Validator) va);
        }).collect(Collectors.toList());
        return validatorDtos;
    }

    @Override
    public CandidateDto getCandidateById(String candidate_id) throws CandidateNotFoundException, PersonIdNotFoundException {
        Person p = personRepo.findById(candidate_id).orElseThrow(() -> new PersonIdNotFoundException("person id not fount exception") );
       if(p instanceof Candidate) return personMapper.fromCandidateToCandidateDto((Candidate) p);
       else  throw  new CandidateNotFoundException("candidate id not found exception");
    }

    @Override
    public CandidateDto saveCandidate(CandidateDto candidateDto) {
        Candidate candidate = personMapper.fromCandidateDtoToCandidate(candidateDto);
        candidate.setId(UUID.randomUUID().toString());
        candidate.setCreatedDate(LocalDate.now());
        Candidate savedCandidate = personRepo.save(candidate);
        return  personMapper.fromCandidateToCandidateDto(savedCandidate);
    }

    @Override
    public CandidateDto updateCandidate(CandidateDto candidateDto) throws CandidateNotFoundException, PersonIdNotFoundException {
        Candidate candidate = candidateRepo.findById(candidateDto.getId()).orElseThrow(()->
            new CandidateNotFoundException("candidate id "+candidateDto.getId()+" not found")
        );
        Candidate c = personMapper.fromCandidateDtoToCandidate(candidateDto);
        c.setCreatedDate(candidate.getCreatedDate());
        c.setUserId(candidate.getUserId());
        Candidate savedCandidate= candidateRepo.save(c);
        return  personMapper.fromCandidateToCandidateDto(savedCandidate);
    }

    @Override
    public List<CandidateDto> getAllCandidateByIds(List<String> candidate_ids) {
        List<Person> peaple = personRepo.findAllByIdIn(candidate_ids);
        List<CandidateDto> candidateDtos = peaple.stream().map(ca ->{
            return personMapper.fromCandidateToCandidateDto((Candidate) ca);
        }).collect(Collectors.toList());
        return candidateDtos;
    }

    @Override
    public void deleteoffer(String offerid) {
    }

    @Override
    public PageableValidatorDTO listValidatorsByCompanyId(String company_id, int size, int page) throws CompanyNotFoundException {
        CompanyDto cpnDTO = companyClient.getCompany(company_id);
        if(cpnDTO == null) throw new CompanyNotFoundException("Company not found");
        Page<Validator> ValPage = personRepo.findByCompanyid(company_id, PageRequest.of(page, size));
        List<ValidatorDto> validatorDtos = ValPage.getContent().stream().map(validator -> {
                return personMapper.fromValidatorToDto(validator);
        }).collect(Collectors.toList());
        PageableValidatorDTO pageableValidatorDTO = PageableValidatorDTO.builder()
                .currentPage(page)
                .totalPages(ValPage.getTotalPages())
                .pageSize(size)
                .validatorDtos(validatorDtos)
                .build();

        return pageableValidatorDTO;
    }

    public List<ValidatorDto> listValidatorsByCompanyIdwithoutPagination(String company_id) throws CompanyNotFoundException {
        CompanyDto cpnDTO = companyClient.getCompany(company_id);
        if(cpnDTO == null) throw new CompanyNotFoundException("Company not found");
        Page<Validator> ValPage = personRepo.findByCompanyid(company_id,Pageable.unpaged());
        List<ValidatorDto> validatorDtos = ValPage.getContent().stream().map(validator -> {
            return personMapper.fromValidatorToDto(validator);
        }).collect(Collectors.toList());
        return validatorDtos;
    }

    @Override
    public List<RecruitorDto> listRecruitorssByCompanyIdwithoutPagination(String company_id) throws CompanyNotFoundException {
        CompanyDto cpnDTO = companyClient.getCompany(company_id);
        if(cpnDTO == null) throw new CompanyNotFoundException("Company not found");
        List<Recruitor> recruitors= this.recruitorRepo.findByCompanyid(company_id);
        List<RecruitorDto> recruitorDtos = recruitors.stream().map(r -> {
            return personMapper.fromRecruitorToRecruitorDto(r);
        }).collect(Collectors.toList());
        return recruitorDtos ;
    }

    @Override
    public ValidatorDto getValidatorByName(String firstname, String lastName) throws ValidatorNotFoundException {
        Person p = personRepo.findByFirstNameAndLastName(firstname,lastName);
        if(p== null || !(p instanceof Validator)) throw  new ValidatorNotFoundException("validator with this firstName: "+firstname+" and LastName"+lastName+" not Found");
        return personMapper.fromValidatorToDto((Validator) p);
    }

    @Override
    public List<CandidateDto> getCandidateByName(String lastname) {
        List<CandidateDto> candidatesDtos = this.candidateRepo.filterCandidateByName(lastname).stream().map(can ->{
            return this.personMapper.fromCandidateToCandidateDto(can);
        }).collect(Collectors.toList());
        return candidatesDtos;
    }

    @Override
    public RecruitorDto saveRecruitor(RecruitorDto recruitorDto) {
        Recruitor recruitor = personMapper.fromRecruitorDtoToRecruitor(recruitorDto);
        recruitor.setId(UUID.randomUUID().toString());
        recruitor.setCreatedDate(LocalDate.now());
        Recruitor savedObject = recruitorRepo.save(recruitor);
        return personMapper.fromRecruitorToRecruitorDto(savedObject);
    }

    @Override
    public RecruitorDto updateRecruitor(RecruitorDto recruitorDto) throws RecruitorNotFoundException {
        Recruitor recruitor = recruitorRepo.findById(recruitorDto.getId()).orElseThrow(() ->
                new RecruitorNotFoundException("Recruitor id " + recruitorDto.getId() + " not found")
        );
        Recruitor updatedRecruitor = personMapper.fromRecruitorDtoToRecruitor(recruitorDto);
        updatedRecruitor.setCreatedDate(recruitor.getCreatedDate());
        updatedRecruitor.setUserId(recruitor.getUserId());
        Recruitor savedRecruitor = recruitorRepo.save(updatedRecruitor);
        return personMapper.fromRecruitorToRecruitorDto(savedRecruitor);
    }

    @Override
    public List<RecruitorDto> getAllRecruitors() {
        List<RecruitorDto> recruitorDtos = recruitorRepo.findAll().stream().map(recruitor -> {
            return personMapper.fromRecruitorToRecruitorDto(recruitor);
        }).collect(Collectors.toList());
        return recruitorDtos;
    }

    @Override
    public RecruitorDto getRecruitorById(String id) throws RecruitorNotFoundException {
        Recruitor recruitor = this.recruitorRepo.findById(id).orElseThrow(()-> new RecruitorNotFoundException("recruitor with id "+id+" not found "));
        CompanyDto companyDto = this.companyClient.getCompany(recruitor.getCompanyid());
        RecruitorDto recruitorDto = personMapper.fromRecruitorToRecruitorDto(recruitor);
        recruitorDto.setCompanyDto(companyDto);
        return recruitorDto;
    }


    @Override
    public PageableRecruitorDTO getAllRecruitors(String kw, int page, int size) {
        if(kw.equals("")){
                Page<Recruitor> recruitors = this.recruitorRepo.findByOrderByCreatedDateDesc(PageRequest.of(page,size));
                List<RecruitorDto> recruitorDtos= new ArrayList<>();
            for ( Recruitor r: recruitors.getContent()) {
                RecruitorDto recruitorDto=this.personMapper.fromRecruitorToRecruitorDto(r);
                CompanyDto companyDto = this.companyClient.getCompany(r.getCompanyid());
                recruitorDto.setCompanyDto(companyDto);
                recruitorDtos.add(recruitorDto);
            }
                PageableRecruitorDTO pageableRecruitorDTO= PageableRecruitorDTO.builder()
                        .currentPage(page)
                        .pageSize(size)
                        .totalPages(recruitors.getTotalPages())
                        .recruitorDtos(recruitorDtos)
                        .build();
                return  pageableRecruitorDTO;
        }
        else {
            Page<Recruitor> recruitors = this.recruitorRepo.filterRecruitorsByName(kw,PageRequest.of(page,size));
            List<RecruitorDto> recruitorDtos= new ArrayList<>();
            for ( Recruitor r: recruitors.getContent()) {
                RecruitorDto recruitorDto=this.personMapper.fromRecruitorToRecruitorDto(r);
                CompanyDto companyDto = this.companyClient.getCompany(r.getCompanyid());
                recruitorDto.setCompanyDto(companyDto);
                recruitorDtos.add(recruitorDto);
            }
            PageableRecruitorDTO pageableRecruitorDTO =PageableRecruitorDTO.builder()
                    .recruitorDtos(recruitorDtos)
                    .totalPages(recruitors.getTotalPages())
                    .pageSize(size)
                    .currentPage(page)
                    .build();
            return pageableRecruitorDTO;

        }
    }


    @Override
    public PageableValidatorDTO getAllValidators(String kw, int page, int size) {
        Page<Validator> validators;
        if(!kw.equals("")) {
            validators = this.validatorRepo.filterValidatorsByName(kw, PageRequest.of(page, size));
        }
        else {
            validators = this.validatorRepo.findByOrderByCreatedDateDesc(PageRequest.of(page,size));

        }
            List<ValidatorDto> validatorDtos= new ArrayList<>();
            for ( Validator r: validators.getContent()) {
                List<ValidatorOffer> validatorOffers=this.offerClint.getOffersOfAnValidator(r.getId());
                if(!validatorOffers.isEmpty()){
                    CompanyDto companyDto = this.companyClient.getCompany(r.getCompanyid());
                    for ( ValidatorOffer vo : validatorOffers ) {
                        ValidatorDto validatorDto=this.personMapper.fromValidatorToDto(r);
                        OfferDto offerDto = this.offerClint.getOfferById(vo.getOfferid());
                        validatorDto.setOfferDto(offerDto);
                        validatorDto.setCompanyDto(companyDto);
                        validatorDtos.add(validatorDto);
                    }

                }
                else {
                    ValidatorDto validatorDto=this.personMapper.fromValidatorToDto(r);
                    CompanyDto companyDto = this.companyClient.getCompany(r.getCompanyid());
                    validatorDto.setCompanyDto(companyDto);
                    validatorDtos.add(validatorDto);
                }
            }
            PageableValidatorDTO pageableValidatorDTO= PageableValidatorDTO.builder()
                    .currentPage(page)
                    .pageSize(size)
                    .totalPages(validators.getTotalPages())
                    .validatorDtos(validatorDtos)
                    .build();
            return  pageableValidatorDTO;

    }

    @Override
    public CandidateDto getCandidateeByUserId(String userId) throws UserNotFoundException {
        List<Candidate> c =  this.candidateRepo.findByUserId(userId);
        if(c == null || c.size()==0) throw  new UserNotFoundException("user id not found : "+userId);
        return personMapper.fromCandidateToCandidateDto(c.get(0));
    }

    @Override
    public RecruitorDto getRecruitoreByUserId(String userId) throws UserNotFoundException {
        List<Recruitor> c =  this.recruitorRepo.findByUserId(userId);
        if(c == null) throw  new UserNotFoundException("user id not found : "+userId);
        return personMapper.fromRecruitorToRecruitorDto(c.get(0));
    }

    @Override
    public ValidatorDto getValidatoreByUserId(String userId) throws UserNotFoundException {
        List<Validator> c =  this.validatorRepo.findByUserId(userId);
        if(c == null) throw  new UserNotFoundException("user id not found : "+userId);
        return personMapper.fromValidatorToDto(c.get(0));
    }

    @Override
    public PageableCandidateDTO listCandidates(String lastName,int size, int page)  {
        Page<Candidate> candPage = candidateRepo.filterCandidateByName(lastName,PageRequest.of(page,size));
        List<CandidateDto> candidateDtos = candPage.getContent().stream().map(ca ->{
            return personMapper.fromCandidateToCandidateDto(ca);
        }).collect(Collectors.toList());
        PageableCandidateDTO pageableCandidateDTO = PageableCandidateDTO.builder()
                .currentPage(page)
                .totalPages(candPage.getTotalPages())
                .pageSize(size)
                .candidateDTOs(candidateDtos)
                .build();

        return pageableCandidateDTO;
    }
}
