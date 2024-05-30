package open.mind.its.recruitment.application.profilemanagment.SERVICE;

import open.mind.its.recruitment.application.profilemanagment.DTOS.IntrviewDtos;
import open.mind.its.recruitment.application.profilemanagment.DTOS.PageableProfileDto;
import open.mind.its.recruitment.application.profilemanagment.DTOS.ProfileDto;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.IntrviewData;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.RecruitmentProcess;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.Skill;
import open.mind.its.recruitment.application.profilemanagment.EXCEPTIONS.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProfileService {
    byte[] getAudioFileById(String profileId) throws ProfileNotFoundException, AudioNotFoundException;

    byte[] getCvFileById(String profileId) throws ProfileNotFoundException, CvNotFoundException;

    public List<ProfileDto> getALLProfileByIds(List<String> profile_ids) throws ProfileNotFoundException;
    public List<ProfileDto> getALLProfileByIdsAndByProfileTitle(List<String> profile_ids,String profileTitleKeyword) throws ProfileNotFoundException;

    ProfileDto saveProfile(ProfileDto profileDto,List<Skill> skills) throws CandidateNotFoundException;
    ProfileDto getProfileByid(String profile_is) throws ProfileNotFoundException;
    public ProfileDto UpdateProfile(ProfileDto profileDto, List<Skill> skills) throws CandidateNotFoundException, ProfileNotFoundException;
    void deleteOffer(String offer_id);
    RecruitmentProcess ApplayToAnOffer(RecruitmentProcess recruitmentProcess);
    PageableProfileDto getAllProfiles(int page,int size);
    public PageableProfileDto getAllProfiles(int page, int size,String offer_id);
    void saveProfileFiles(MultipartFile file,String profile_id) throws ProfileNotFoundException, UnsupportedFileTypeException, IOException;

    IntrviewData saveIntrviewDataAssociatedToAnProfile(IntrviewDtos intrviewData) throws ProfileNotFoundException;

    void deletAnApplication(String applicationId);
    PageableProfileDto getProfilesByCandiadte(String candidateId,int page,int size) throws ProfileNotFoundException;



}
