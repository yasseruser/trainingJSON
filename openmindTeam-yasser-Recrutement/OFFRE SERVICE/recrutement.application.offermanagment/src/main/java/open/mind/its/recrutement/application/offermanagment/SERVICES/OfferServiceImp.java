package open.mind.its.recrutement.application.offermanagment.SERVICES;

import jakarta.transaction.Transactional;
import open.mind.its.recrutement.application.offermanagment.DTOS.*;
import open.mind.its.recrutement.application.offermanagment.ENTITIES.*;
import open.mind.its.recrutement.application.offermanagment.EXCEPTIONS.*;
import open.mind.its.recrutement.application.offermanagment.MAPPERS.OfferMapper;
import open.mind.its.recrutement.application.offermanagment.OPENFEIGNCLIENT.OfferClientCompany;
import open.mind.its.recrutement.application.offermanagment.OPENFEIGNCLIENT.OfferClientProfile;
import open.mind.its.recrutement.application.offermanagment.OPENFEIGNCLIENT.OfferClientValidator;
import open.mind.its.recrutement.application.offermanagment.REPO.OfferRepo;
import open.mind.its.recrutement.application.offermanagment.REPO.RecruitmentPrecessRepo;
import open.mind.its.recrutement.application.offermanagment.REPO.RecruitorOfferRepo;
import open.mind.its.recrutement.application.offermanagment.REPO.ValidatorOfferRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class OfferServiceImp implements  OfferService{
    @Autowired
    private OfferRepo offerRepo;

    @Autowired
    private RecruitorOfferRepo recruitorOfferRepo;

    @Autowired
    private OfferMapper offerMapper;
    @Autowired
    private OfferClientCompany offerClientCompany;
    @Autowired
    private OfferClientValidator offerClientValidator;
    @Autowired
    private ValidatorOfferRepo validatorOfferRepo;
    @Autowired
    private RecruitmentPrecessRepo recruitmentPrecessRepo;
    @Autowired
    private OfferClientProfile offerClientProfile;
    @Autowired
    private PdfGeneratorService pdfGeneratorService;

    private String PATH="C:/Users/pp/Desktop/";
    @Override
    public OfferDto saveOffer(OfferDto offerDto, String company_id) throws CompanyNotFoundException, FileNotFoundException {
        CompanyDto companyDto=offerClientCompany.getCompany(company_id);
        if(companyDto == null) throw  new CompanyNotFoundException("COMPANY ID NOT FOUND OR NOT EXIST");
        Offer offer = offerMapper.frmOfferDtoToOffer(offerDto);
        offer.setCompanyid(companyDto.getId());
        offer.setId(UUID.randomUUID().toString());
        offer.setCreatedat(new Date());
        offer.setFileExtention("application/pdf");
        //offer.setFileName(file.getOriginalFilename());
        //String filepath = this.PATH+file.getOriginalFilename();
        //file.transferTo(new File(filepath));
        Offer savedOffer = offerRepo.save(offer);
        this.pdfGeneratorService.generatePdfFile(offerMapper.frmOfferToDto(offer),this.PATH);
        return offerMapper.frmOfferToDto(savedOffer);
    }

    @Override
    public void saveofferValidator(String offer_id,String validator_id) throws ValidatorIdNotFoundException {
        ValidatorDto validator = offerClientValidator.getvalidatorbyid(validator_id);
        if(validator== null) throw new ValidatorIdNotFoundException("id of validator doesn't exist");
        ValidatorOffer validatorOffer = validatorOfferRepo.save(
                    ValidatorOffer.builder()
                            .id(UUID.randomUUID().toString())
                            .validatorid(validator.getId())
                            .offerid(offer_id)
                            .createdat(new Date())
                            .build());
    }

    @Override
    public void saveofferRecruitor(String offerId, String recruitorId) throws RecruitorNotFoundException {
        RecruitorDto recruitorDto = this.offerClientValidator.getRecruitorById(recruitorId);
        if(recruitorDto==null) throw new RecruitorNotFoundException("recruitor not found with id "+recruitorId);
        RecruitorOffer ro =   RecruitorOffer.builder()
                .id(UUID.randomUUID().toString())
                .recruitorId(recruitorId)
                .offerId(offerId)
                .createdat(new Date())
                .build();
        this.recruitorOfferRepo.save(ro);
    }

    @Override
    public OfferDto updateOffer(OfferDto offerDto, String company_id) throws CompanyNotFoundException, FileNotFoundException, OfferNotFoundException {
        CompanyDto companyDto=offerClientCompany.getCompany(company_id);
        if(companyDto == null) throw  new CompanyNotFoundException("COMPANY ID NOT FOUND OR NOT EXIST");
        Offer offer = offerRepo.findById(offerDto.getId()).orElseThrow(()-> new OfferNotFoundException("offer Not Found Exception"));
        offer.setCompanyid(companyDto.getId());
        offer.setOffer_title(offerDto.getOffer_title());
        offer.setOffer_availability(offerDto.getOffer_availability());
        offer.setOffer_description(offer.getOffer_description());
        offer.setBenefits(offerDto.getBenefits());
        offer.setDesired_profile(offerDto.getDesired_profile());
        offer.setLocalisation(offerDto.getLocalisation());
        offer.setRemuneration(offerDto.getRemuneration());
        offer.setKey_points(offerDto.getKey_points());
        Offer savedOffer = offerRepo.save(offer);
        this.pdfGeneratorService.generatePdfFile(offerMapper.frmOfferToDto(offer),this.PATH);
        this.validatorOfferRepo.deleteByOfferid(savedOffer.getId());
        this.recruitorOfferRepo.deleteById(savedOffer.getId());
        return offerMapper.frmOfferToDto(savedOffer);
    }


    @Override
    public PageableApplicationDto getAllApplicationsByOffer(String lastName,String tag,String profile,String offer_id,boolean validatedByRecruitor,boolean validatedByValidator, int size , int page) throws OfferNotFoundException {
        Optional<Offer> offerOptional = offerRepo.findById(offer_id);
        Offer offer = offerOptional.orElseThrow(() -> new OfferNotFoundException("Offer not found with offer id : " + offer_id));
        Page<RecruitmentProcess> applications;
            if(tag.equals("")){
                applications = recruitmentPrecessRepo.findByOfferidAndValidatedByRecruitorAndValidatedByValidatorOrderByCreatedAtDesc(offer.getId(),validatedByRecruitor,validatedByValidator,PageRequest.of(page,size));
            }
            else {
                applications = recruitmentPrecessRepo.filterApplicationsByTag(offer.getId(),tag,validatedByRecruitor,validatedByValidator,PageRequest.of(page,size));
            }

        if(applications.getContent().size()==0) return null;
        Map<String,List<String>> profile_ids_map= new HashMap<>();
        List<String> p_ids= applications.getContent().stream().map(app -> {
            return  app.getProfileid();
        }).collect(Collectors.toList());
        profile_ids_map.put("profile_ids",p_ids);
        Collection<ProfileDto> profileDtos = offerClientProfile.getallprofilebyidsandbyprofileTitle(profile_ids_map,profile);
        List<ApplicationDto> applicationDtos = new ArrayList<>();
        for (ProfileDto pdt: profileDtos) {
            RecruitmentProcess applicationstatus = getapplicationsatusfromlist(applications.getContent(),pdt.getId());
            if(pdt.getSalaryExpectations()!=null){
                applicationDtos.add(
                        ApplicationDto.builder()
                                .id(applicationstatus.getId())
                                .profile_id(pdt.getId())
                                .audio(pdt.getAudio())
                                .email(pdt.getEmail())
                                .phone(pdt.getPhone())
                                .cv(pdt.getCv())
                                .candidate_id(pdt.getCandidate_id())
                                .city(pdt.getCity())
                                .country(pdt.getCountry())
                                .firstName(pdt.getFirstName())
                                .lastName(pdt.getLastName())
                                .profileTitle(pdt.getProfileTitle())
                                .profileType(pdt.getProfileType())
                                .salaryExpectations(pdt.getSalaryExpectations())
                                .recruitment_status(applicationstatus.getTag())
                                .validatedByRecruitor(applicationstatus.isValidatedByRecruitor())
                                .validatedByValidator(applicationstatus.isValidatedByValidator())
                                .build()
                );
            }
            else {
                applicationDtos.add(
                        ApplicationDto.builder()
                                .id(applicationstatus.getId())
                                .profile_id(pdt.getId())
                                .audio(pdt.getAudio())
                                .email(pdt.getEmail())
                                .phone(pdt.getPhone())
                                .cv(pdt.getCv())
                                .candidate_id(pdt.getCandidate_id())
                                .city(pdt.getCity())
                                .country(pdt.getCountry())
                                .firstName(pdt.getFirstName())
                                .lastName(pdt.getLastName())
                                .profileTitle(pdt.getProfileTitle())
                                .profileType(pdt.getProfileType())
                                .recruitment_status(applicationstatus.getTag())
                                .build()
                );
            }

        }

        return PageableApplicationDto.builder()
                .currentPage(page)
                .pageSize(size)
                .totalPages(applications.getTotalPages())
                .applicationDtos(applicationDtos)
                .build();
    }
    @Override
    public void deleteByOfferId(String offerId) {
        ResponseEntity<String> responseEntity = offerClientProfile.deleteProfileByOfferId(offerId);
        if(responseEntity.getStatusCode().is2xxSuccessful()){
                recruitmentPrecessRepo.deleteByOfferid(offerId);
                validatorOfferRepo.deleteByOfferid(offerId);
                offerRepo.deleteById(offerId);

        }
    }

    @Override
    public OfferDto getOfferById(String offer_id) throws OfferNotFoundException {
        Offer offer =  offerRepo.findById(offer_id).orElseThrow( ()->
                new OfferNotFoundException("offer id : "+offer_id+" not found")
        );
        List<ValidatorOffer> validatorOffers = this.validatorOfferRepo.findByOfferid(offer_id);
        List<String> validatorids =  validatorOffers.stream().map(
                validatorOffer -> {
                    return  validatorOffer.getValidatorid();
                }
        ).collect(Collectors.toList());
        Map<String,List<String>> map_validators = new HashMap<>();
        map_validators.put("validator_ids",validatorids);
        Collection<ValidatorDto> validatorDtos =  this.offerClientValidator.getallvalidatorbyids(map_validators);
        OfferDto of = offerMapper.frmOfferToDto(offer);
        of.setValidators((List<ValidatorDto>) validatorDtos);
        List<RecruitorDto> recruitorDtos=new ArrayList<>();
        List<RecruitorOffer> recruitorOffers=this.recruitorOfferRepo.findByOfferId(offer_id);
        for (RecruitorOffer ro: recruitorOffers) {
            RecruitorDto rdto = this.offerClientValidator.getRecruitorById(ro.getRecruitorId());
            recruitorDtos.add(rdto);
        }
        of.setRecruitors(recruitorDtos);
        return of;
    }



    @Override
    public OfferDto getOfferByIdWithoutValidatorDetails(String offer_id) throws OfferNotFoundException {
        Offer offer =  offerRepo.findById(offer_id).orElseThrow( ()->
                new OfferNotFoundException("offer id : "+offer_id+" not found")
        );

        OfferDto of = offerMapper.frmOfferToDto(offer);
        return of;
    }

    public byte[] downloadFileFromFileSystem(String offer_id) throws IOException, OfferNotFoundException {
        Offer offer =  offerRepo.findById(offer_id).orElseThrow( ()->
                new OfferNotFoundException("offer id : "+offer_id+" not found")
        );
        String filePath=this.PATH+offer.getId()+"."+offer.getFileExtention();
        byte[] file = Files.readAllBytes(new File(filePath).toPath());
        return file;
    }

    @Override
    public void UploadFile(MultipartFile file, String offer_id) throws OfferNotFoundException, IOException {

    }

    @Override
    public Boolean isProfileAssociatedToOfferPrevously(String offre_id, String profile_is) {
        RecruitmentProcess recruitmentProcess = this.recruitmentPrecessRepo.findByOfferidAndProfileid(offre_id,profile_is);
        if (recruitmentProcess==null)
            return  false;
        return true;
    }

    @Override
    public void deleteAnApplication(String applicationId) {
        RecruitmentProcess r = RecruitmentProcess.builder()
                .id(applicationId)
                .profileid("")
                .offerid("")
                .build();
        this.offerClientProfile.deleteAnApplication(r);
        this.recruitmentPrecessRepo.deleteById(applicationId);
    }

    @Override
    public List<ValidatorOffer> getOffersOfAnValidator(String validatorId) {
        return this.validatorOfferRepo.findByValidatorid(validatorId);
    }

    @Override
    public PageableApplicationDto getApplicationsOfAnProfile(String profileId, int page, int size) throws OfferNotFoundException {
        Page<RecruitmentProcess> recruitmentProcesses= this.recruitmentPrecessRepo.findByProfileid(profileId,PageRequest.of(page,size));
        //if(recruitmentProcesses.getContent().isEmpty() || recruitmentProcesses.getContent().size()==0)
        List<ApplicationDto> applicationDtos = new ArrayList<>();
        for (RecruitmentProcess r : recruitmentProcesses) {
            ProfileDto profileDto= this.offerClientProfile.getProfilrById(r.getProfileid());
            OfferDto offerDto = this.getOfferById(r.getOfferid());
            applicationDtos.add(ApplicationDto.builder()
                            .id(r.getId())
                            .profile_id(r.getProfileid())
                            .profileType(profileDto.getProfileType())
                            .city(profileDto.getCity())
                            .country(profileDto.getCountry())
                            .phone(profileDto.getPhone())
                            .email(profileDto.getEmail())
                            .profileTitle(profileDto.getProfileTitle())
                            .lastName(profileDto.getLastName())
                            .firstName(profileDto.getFirstName())
                            .salaryExpectations(profileDto.getSalaryExpectations())
                            .candidate_id(profileDto.getCandidate_id())
                            .offerDto(offerDto)
                            .recruitment_status(r.getTag())
                    .build());
        }
        return PageableApplicationDto.builder()
                .applicationDtos(applicationDtos)
                .totalPages(recruitmentProcesses.getTotalPages())
                .pageSize(size)
                .currentPage(page)
                .build();
    }
/*
    public void UploadFile(MultipartFile file,String offer_id) throws OfferNotFoundException, IOException {

        Offer offer = offerRepo.findById(offer_id).orElseThrow( ()-> new OfferNotFoundException("offer Not Found"));
        offer.setFileExtention(file.getContentType());
        offer.setFileName(file.getOriginalFilename());
        String filepath = this.PATH+file.getOriginalFilename();
        file.transferTo(new File(filepath));
        Offer savedOffer = offerRepo.save(offer);
    }

 */

    @Override
    public RecruitmentProcess ApplyToAnOfferByHrOrCandidate(RecruitmentProcess recruitmentProcess) throws OfferNotFoundException, ProfileNotFoundException {
        OfferDto offerDto = getOfferById(recruitmentProcess.getOfferid());
        ProfileDto profileDto = offerClientProfile.getProfilrById(recruitmentProcess.getProfileid());
        if(profileDto==null && offerDto==null) throw  new ProfileNotFoundException("profile id : "+recruitmentProcess.getProfileid()+" not found  or offer id ");
        if(recruitmentProcess.getId()==null || recruitmentProcess.getId().equals("")){
            recruitmentProcess.setId(UUID.randomUUID().toString());
            recruitmentProcess.setCreatedAt(LocalDate.now());
            recruitmentProcess.setValidatedByRecruitor(false);
            recruitmentProcess.setValidatedByValidator(false);
            RecruitmentProcess savedObjectInProfileDB=offerClientProfile.ApplayToAnOffer(recruitmentProcess);
            return recruitmentPrecessRepo.save(recruitmentProcess);
        }
        else {
            recruitmentProcess.setCreatedAt(LocalDate.now());
            recruitmentProcess.setValidatedByRecruitor(false);
            recruitmentProcess.setValidatedByValidator(false);
            RecruitmentProcess savedObjectInProfileDB=offerClientProfile.ApplayToAnOffer(recruitmentProcess);
            return recruitmentPrecessRepo.save(recruitmentProcess);
        }

    }
    @Override
    public RecruitmentProcess ApplyToAnOfferByRecruitor(RecruitmentProcess recruitmentProcess) throws OfferNotFoundException, ProfileNotFoundException {
        OfferDto offerDto = getOfferById(recruitmentProcess.getOfferid());
        ProfileDto profileDto = offerClientProfile.getProfilrById(recruitmentProcess.getProfileid());
        if(profileDto==null && offerDto==null) throw  new ProfileNotFoundException("profile id : "+recruitmentProcess.getProfileid()+" not found  or offer id ");
        if(recruitmentProcess.getId()==null || recruitmentProcess.getId().equals("")){
            recruitmentProcess.setId(UUID.randomUUID().toString());
            recruitmentProcess.setCreatedAt(LocalDate.now());
            recruitmentProcess.setValidatedByRecruitor(false);
            recruitmentProcess.setValidatedByValidator(false);
            RecruitmentProcess savedObjectInProfileDB=offerClientProfile.ApplayToAnOffer(recruitmentProcess);
            return recruitmentPrecessRepo.save(recruitmentProcess);
        }
        else {
            recruitmentProcess.setCreatedAt(LocalDate.now());
            recruitmentProcess.setValidatedByRecruitor(true);
            recruitmentProcess.setValidatedByValidator(false);
            RecruitmentProcess savedObjectInProfileDB=offerClientProfile.ApplayToAnOffer(recruitmentProcess);
            return recruitmentPrecessRepo.save(recruitmentProcess);
        }

    }

    @Override
    public RecruitmentProcess ApplyToAnOfferByValidator(RecruitmentProcess recruitmentProcess) throws OfferNotFoundException, ProfileNotFoundException {
        OfferDto offerDto = getOfferById(recruitmentProcess.getOfferid());
        ProfileDto profileDto = offerClientProfile.getProfilrById(recruitmentProcess.getProfileid());
        if(profileDto==null && offerDto==null) throw  new ProfileNotFoundException("profile id : "+recruitmentProcess.getProfileid()+" not found  or offer id ");
        if(recruitmentProcess.getId()==null || recruitmentProcess.getId().equals("")){
            recruitmentProcess.setId(UUID.randomUUID().toString());
            recruitmentProcess.setCreatedAt(LocalDate.now());
            recruitmentProcess.setValidatedByRecruitor(false);
            recruitmentProcess.setValidatedByValidator(false);
            RecruitmentProcess savedObjectInProfileDB=offerClientProfile.ApplayToAnOffer(recruitmentProcess);
            return recruitmentPrecessRepo.save(recruitmentProcess);
        }
        else {
            recruitmentProcess.setCreatedAt(LocalDate.now());
            recruitmentProcess.setValidatedByRecruitor(true);
            recruitmentProcess.setValidatedByValidator(true);
            RecruitmentProcess savedObjectInProfileDB=offerClientProfile.ApplayToAnOffer(recruitmentProcess);
            return recruitmentPrecessRepo.save(recruitmentProcess);
        }

    }

    @Override
    public PageableValidatorsOfferDto getValidatorswithAssocoiatedOffer(int size, int page) throws OfferNotFoundException {
        Page<ValidatorOffer> validatorOffers = validatorOfferRepo.findAllByOrderByCreatedatDesc(PageRequest.of(page,size));
        List<String> validator_ids = validatorOffers.getContent().stream().map(
                va ->{
                    return va.getValidatorid();
                }
        ).collect(Collectors.toList());
        Map<String,List<String>> map_validators = new HashMap<>();
        map_validators.put("validator_ids",validator_ids);
        Collection<ValidatorDto> validatorDtos = offerClientValidator.getallvalidatorbyids(map_validators);
        List<ValidatorDto> validatorDtoList = new ArrayList<>();
        for (ValidatorDto vdto: validatorDtos) {
            List<ValidatorOffer> validOffs = getvalidatorofferfromlists(validatorOffers.getContent(), vdto.getId());
            for (ValidatorOffer validOff: validOffs) {
                Offer of = offerRepo.findById(validOff.getOfferid()).get();
                CompanyDto comp  = offerClientCompany.getCompany(of.getCompanyid());
                vdto.setOffer_title(of.getOffer_title());
                vdto.setCompanyName(comp.getName());
                ValidatorDto returnedValidatedDto =ValidatorDto.builder()
                        .id(vdto.getId())
                        .city(vdto.getCity())
                        .offer_title(of.getOffer_title())
                        .phone(vdto.getPhone())
                        .country(vdto.getCountry())
                        .email(vdto.getEmail())
                        .firstName(vdto.getFirstName())
                        .lastName(vdto.getLastName())
                        .createdDate(vdto.getCreatedDate())
                        .companyName(vdto.getCompanyName())
                        .build();
                validatorDtoList.add(returnedValidatedDto);

            }
        }

        return PageableValidatorsOfferDto.builder()
                .validatorDtos(validatorDtoList)
                .currentPage(page)
                .pageSize(size)
                .totalPages(validatorOffers.getTotalPages())
                .build();
    }

    @Override
    public PageableOfferDto getOffersByCompanyid(String company_id, int size, int page) throws CompanyNotFoundException {
        CompanyDto companyDto = offerClientCompany.getCompany(company_id);
        if(companyDto == null)  throw new CompanyNotFoundException("company id: "+ company_id+" not found ");
        Page<Offer> offersPage = offerRepo.findByCompanyid(company_id, PageRequest.of(page, size));
        List<OfferDto> offerDtos = offersPage.getContent().stream().map(offer -> {
            return offerMapper.frmOfferToDto(offer);
        }).collect(Collectors.toList());
        PageableOfferDto pageableOfferDto = PageableOfferDto.builder()
                .currentPage(page)
                .totalPages(offersPage.getTotalPages())
                .pageSize(size)
                .offerDtos(offerDtos)
                .build();

        return pageableOfferDto;
    }

    @Override
    public PageableOfferDto searchOfferByName(String name, int size, int page) {
        Page<Offer> offersPage = this.offerRepo.filterOfferByTitle(name,PageRequest.of(page,size));
        List<OfferDto> offerDtos = new ArrayList<>();
        for (Offer of: offersPage.getContent() ) {
            CompanyDto com = this.offerClientCompany.getCompany(of.getCompanyid());
            OfferDto offerDto = offerMapper.frmOfferToDto(of);
            offerDto.setCompanyName(com.getName());
            offerDtos.add(offerDto);
        }
        PageableOfferDto pageableOfferDto = PageableOfferDto.builder()
                .currentPage(page)
                .totalPages(offersPage.getTotalPages())
                .pageSize(size)
                .offerDtos(offerDtos)
                .build();
        return pageableOfferDto;
    }
    @Override
    public PageableOfferDto getOfferPage( int size, int page) {
        Page<Offer> offersPage = this.offerRepo.findAllByOrderByCreatedatDesc(PageRequest.of(page,size));
        List<OfferDto> offerDtos = new ArrayList<>();
        for (Offer of: offersPage.getContent() ) {
            CompanyDto com = this.offerClientCompany.getCompany(of.getCompanyid());
            OfferDto offerDto = offerMapper.frmOfferToDto(of);
            offerDto.setCompanyName(com.getName());
            offerDtos.add(offerDto);
        }
        PageableOfferDto pageableOfferDto = PageableOfferDto.builder()
                .currentPage(page)
                .totalPages(offersPage.getTotalPages())
                .pageSize(size)
                .offerDtos(offerDtos)
                .build();
        return pageableOfferDto;
    }

    @Override
    public PageableOfferDto getOfferByValidator(String validatorId, int size, int page) throws ValidatorIdNotFoundException, OfferNotFoundException {
        ValidatorDto validatorDto = this.offerClientValidator.getvalidatorbyid(validatorId);
        if(validatorDto==null) throw  new ValidatorIdNotFoundException("Validator id : "+validatorId+" not found");
        Page<ValidatorOffer> validatorOffers = this.validatorOfferRepo.findByValidatoridOrderByCreatedatDesc(validatorId,PageRequest.of(page,size));
        List<OfferDto> offerDtos = new ArrayList<>();
        for (ValidatorOffer vo :validatorOffers ) {
            OfferDto of = this.getOfferByIdWithoutValidatorDetails(vo.getOfferid());
            CompanyDto com = this.offerClientCompany.getCompany(of.getCompanyid());
            of.setCompanyName(com.getName());
            offerDtos.add(of);
        }
        PageableOfferDto pageableOfferDto = PageableOfferDto.builder()
                .currentPage(page)
                .totalPages(validatorOffers.getTotalPages())
                .pageSize(size)
                .offerDtos(offerDtos)
                .build();
        return pageableOfferDto;
    }

    @Override
    public PageableOfferDto getOfferByRecruitor(String recruitorId, int size, int page) throws RecruitorNotFoundException, OfferNotFoundException {
        RecruitorDto rDto = this.offerClientValidator.getRecruitorById(recruitorId);
        if(rDto==null) throw  new RecruitorNotFoundException("Recruitor id : "+recruitorId+" not found");
        Page<RecruitorOffer> recruitorOffers = this.recruitorOfferRepo.findByRecruitorIdOrderByCreatedatDesc(recruitorId,PageRequest.of(page,size));
        List<OfferDto> offerDtos = new ArrayList<>();
        for (RecruitorOffer ro : recruitorOffers ) {
            OfferDto of = this.getOfferByIdWithoutValidatorDetails(ro.getOfferId());
            CompanyDto com = this.offerClientCompany.getCompany(of.getCompanyid());
            of.setCompanyName(com.getName());
            offerDtos.add(of);
        }
        PageableOfferDto pageableOfferDto = PageableOfferDto.builder()
                .currentPage(page)
                .totalPages(recruitorOffers.getTotalPages())
                .pageSize(size)
                .offerDtos(offerDtos)
                .build();
        return pageableOfferDto;
    }

    @Override
    public List<OfferDto> getAllOffer() {
        List<Offer> offers = offerRepo.findAll();
        List<OfferDto> offerDtos = new ArrayList<>();
        for (Offer of: offers ) {
            CompanyDto com = this.offerClientCompany.getCompany(of.getCompanyid());
            OfferDto offerDto = offerMapper.frmOfferToDto(of);
            offerDto.setCompanyName(com.getName());
            offerDtos.add(offerDto);
        }
        return offerDtos;
    }

    @Override
    public  RecruitmentProcess getRecruitmentProcessById(String offerid,String profileid) throws  ApplicationNotFoundException {
        RecruitmentProcess r = this.recruitmentPrecessRepo.findByOfferidAndProfileid(offerid,profileid);
        if(r == null) throw  new ApplicationNotFoundException("application Not Found");
        return r;
    }

    @Override
    public PageableOfferDto getAllOffer(int size, int page) {
        Page<Offer> offersPage = offerRepo.findAllByOrderByCreatedatDesc(PageRequest.of(page,size));
        List<OfferDto> offerDtos = new ArrayList<>();
        for (Offer of: offersPage.getContent() ) {
            CompanyDto com = this.offerClientCompany.getCompany(of.getCompanyid());
            OfferDto offerDto = offerMapper.frmOfferToDto(of);
            offerDto.setCompanyName(com.getName());
            offerDtos.add(offerDto);
        }
        PageableOfferDto pageableOfferDto = PageableOfferDto.builder()
                .currentPage(page)
                .totalPages(offersPage.getTotalPages())
                .pageSize(size)
                .offerDtos(offerDtos)
                .build();
        return pageableOfferDto;
    }

    public RecruitmentProcess getapplicationsatusfromlist(List<RecruitmentProcess> applicationstatus, String id)  {
        for (RecruitmentProcess c : applicationstatus) {
            if ( c.getProfileid().equals(id)) {
                return c;
            }
        }
        return null;
    }
    public ValidatorOffer getvalidatorofferfromlist(List<ValidatorOffer> applicationstatus, String validator_id)  {
        for (ValidatorOffer c : applicationstatus) {
            if ( c.getValidatorid().equals(validator_id)) {
                return c;
            }
        }
        return null;
    }

    public List<ValidatorOffer> getvalidatorofferfromlists(List<ValidatorOffer> applicationstatus, String validator_id)  {
        List<ValidatorOffer> list = new ArrayList<>();
        for (ValidatorOffer c : applicationstatus) {
            if ( c.getValidatorid().equals(validator_id)) {
                list.add(c);
            }
        }
        return  list;
    }


}
