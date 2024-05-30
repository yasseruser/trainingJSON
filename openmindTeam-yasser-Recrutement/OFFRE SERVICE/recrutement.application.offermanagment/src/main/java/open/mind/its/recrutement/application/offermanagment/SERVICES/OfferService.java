package open.mind.its.recrutement.application.offermanagment.SERVICES;

import open.mind.its.recrutement.application.offermanagment.DTOS.*;
import open.mind.its.recrutement.application.offermanagment.ENTITIES.RecruitmentProcess;
import open.mind.its.recrutement.application.offermanagment.ENTITIES.ValidatorOffer;
import open.mind.its.recrutement.application.offermanagment.EXCEPTIONS.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

public interface OfferService {
    OfferDto saveOffer(OfferDto offerDto, String company_id) throws CompanyNotFoundException, FileNotFoundException;

    public void saveofferValidator(String offer_id,String validator_id) throws ValidatorIdNotFoundException ;
    public void saveofferRecruitor(String offerId,String recruitorId) throws RecruitorNotFoundException;


    OfferDto updateOffer(OfferDto offerDto, String company_id) throws CompanyNotFoundException, FileNotFoundException, OfferNotFoundException;
    PageableApplicationDto getAllApplicationsByOffer(String lasName,String tag,String profile,String offer_id,boolean validatedByRecruitor,boolean validateByValidator, int size , int page) throws OfferNotFoundException;

    PageableOfferDto getOffersByCompanyid(String company_id,int size, int page) throws CompanyNotFoundException;
    PageableOfferDto searchOfferByName(String name,int size, int page);
    PageableOfferDto getOfferPage( int size, int page);
    PageableOfferDto getOfferByValidator(String validatorId ,int size, int page) throws ValidatorIdNotFoundException, OfferNotFoundException;
    PageableOfferDto getOfferByRecruitor(String recruitorId ,int size, int page) throws RecruitorNotFoundException, OfferNotFoundException;



    List<OfferDto> getAllOffer();

    RecruitmentProcess getRecruitmentProcessById(String offerid,String profileid)throws  ApplicationNotFoundException;

    PageableOfferDto getAllOffer (int size, int page);
    void deleteByOfferId(String OfferId);
    OfferDto getOfferById(String offer_id) throws OfferNotFoundException;
    RecruitmentProcess ApplyToAnOfferByHrOrCandidate(RecruitmentProcess recruitmentProcess) throws OfferNotFoundException, ProfileNotFoundException;
    RecruitmentProcess ApplyToAnOfferByRecruitor(RecruitmentProcess recruitmentProcess) throws OfferNotFoundException, ProfileNotFoundException;
    RecruitmentProcess ApplyToAnOfferByValidator(RecruitmentProcess recruitmentProcess) throws OfferNotFoundException, ProfileNotFoundException;


    PageableValidatorsOfferDto getValidatorswithAssocoiatedOffer(int size, int page) throws OfferNotFoundException;

    OfferDto getOfferByIdWithoutValidatorDetails(String offer_id) throws OfferNotFoundException;

    byte[] downloadFileFromFileSystem(String offer_id) throws IOException, OfferNotFoundException;
    public void UploadFile(MultipartFile file, String offer_id) throws OfferNotFoundException, IOException;

    Boolean isProfileAssociatedToOfferPrevously(String offre_id,String profile_is);
    void deleteAnApplication(String applicationId);

    List<ValidatorOffer> getOffersOfAnValidator(String validatorId);

    PageableApplicationDto getApplicationsOfAnProfile(String profileId,int page,int size) throws OfferNotFoundException;



}
