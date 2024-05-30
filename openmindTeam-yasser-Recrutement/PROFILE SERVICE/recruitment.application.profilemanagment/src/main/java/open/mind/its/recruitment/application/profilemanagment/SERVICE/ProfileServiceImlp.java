package open.mind.its.recruitment.application.profilemanagment.SERVICE;

import jakarta.transaction.Transactional;
import open.mind.its.recruitment.application.profilemanagment.DTOS.CandidateDto;
import open.mind.its.recruitment.application.profilemanagment.DTOS.IntrviewDtos;
import open.mind.its.recruitment.application.profilemanagment.DTOS.PageableProfileDto;
import open.mind.its.recruitment.application.profilemanagment.DTOS.ProfileDto;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.IntrviewData;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.Profile;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.RecruitmentProcess;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.Skill;
import open.mind.its.recruitment.application.profilemanagment.EXCEPTIONS.*;
import open.mind.its.recruitment.application.profilemanagment.MAPPERS.ProfileMapper;
import open.mind.its.recruitment.application.profilemanagment.OPENFEIGNCLINET.ProfileClientPerson;
import open.mind.its.recruitment.application.profilemanagment.REPO.IntrviewDataRepo;
import open.mind.its.recruitment.application.profilemanagment.REPO.ProfileRepo;
import open.mind.its.recruitment.application.profilemanagment.REPO.RecruitmenrProcessRespo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProfileServiceImlp implements ProfileService{
    @Autowired
    private ProfileRepo profileRepo;
    @Autowired
    private ProfileClientPerson profileClientPerson;
    @Autowired
    private ProfileMapper profileMapper;
    @Autowired
    private SkillService skillservice;
    @Autowired
    private RecruitmenrProcessRespo recruitmenrProcessRespo;
    @Autowired
    private IntrviewDataRepo intrviewDataRepo;
   // @Value("${files.path.cv}")
    private String Pathcv="C:/Users/pp/Desktop/cv/";
   // @Value("${files.path.audio}")
    private String Pathaudio="C:/Users/pp/Desktop/audio/";
    @Override
    public byte[] getAudioFileById(String profileId) throws ProfileNotFoundException, AudioNotFoundException {
        Profile profile = profileRepo.findById(profileId)
                .orElseThrow(() -> new ProfileNotFoundException("Profile with ID " + profileId + " not found"));

        String audioFileName = profile.getAudio();
        if (audioFileName == null) {
            throw new AudioNotFoundException("Audio file not found for profile with ID " + profileId);
        }

        Path audioFilePath = Paths.get(Pathaudio + audioFileName);
        try {
            return Files.readAllBytes(audioFilePath);
        } catch (IOException e) {
            throw new AudioNotFoundException("Could not read audio file for profile with ID " + profileId, e);
        }
    }

    @Override
    public byte[] getCvFileById(String profileId) throws ProfileNotFoundException, CvNotFoundException {
        Profile profile = profileRepo.findById(profileId)
                .orElseThrow(() -> new ProfileNotFoundException("Profile with ID " + profileId + " not found"));

        String cvFileName = profile.getCv();
        if (cvFileName == null) {
            throw new CvNotFoundException("CV not found for profile with ID " + profileId);
        }

        Path cvFilePath = Paths.get(Pathcv + cvFileName);
        try {
            return Files.readAllBytes(cvFilePath);
        } catch (IOException e) {
            throw new CvNotFoundException("Could not read CV file for profile with ID " + profileId, e);
        }
    }
    @Override
    public List<ProfileDto> getALLProfileByIds(List<String> profile_ids) throws ProfileNotFoundException {
        List<ProfileDto> profileDtos = new ArrayList<>();
        for (String id : profile_ids) {
            profileDtos.add(this.getProfileByid(id));
        }
        return profileDtos;
    }

    @Override
    public List<ProfileDto> getALLProfileByIdsAndByProfileTitle(List<String> profile_ids, String profileTitleKeyword) throws ProfileNotFoundException {
        List<ProfileDto> profileDtos = new ArrayList<>();
        List<Profile> profiles = this.profileRepo.findAllByIdInAndTitleContaining(profile_ids, profileTitleKeyword);
        List<ProfileDto> profileDtoList = new ArrayList<>();
        for (Profile p : profiles) {
            profileDtos.add(this.getProfileByid(p.getId()));
        }
        return profileDtos;
    }

    @Override
    public ProfileDto saveProfile(ProfileDto profileDto, List<Skill> skills) throws CandidateNotFoundException {
        CandidateDto candidateDto = profileClientPerson.getCandidatebyId(profileDto.getCandidate_id());
        if(candidateDto==null) throw  new CandidateNotFoundException("candidate with id "+profileDto.getCandidate_id()+" not found");
        Profile profile = profileMapper.fromProfileDtoToProfile(profileDto);
        List<Skill> skillsa = (List<Skill>) skills.stream().map(sk ->{
            return Skill.builder()
                    .id(UUID.randomUUID().toString())
                    .yearsOfExperience(sk.getYearsOfExperience())
                    .skillName(sk.getSkillName())
                    .build();
        }).collect(Collectors.toList());
        List<Skill> savedSkills = skillservice.saveSkills(skillsa);
        profile.setSkills(savedSkills);
        profile.setId(UUID.randomUUID().toString());
        profile.setCandidateid(candidateDto.getId());
        Profile savedProfile = profileRepo.save(profile);
        ProfileDto savedProfileDto= profileMapper.fromProfileToDto(savedProfile);
        savedProfileDto.setFirstName(profileDto.getFirstName());
        savedProfileDto.setLastName(profileDto.getLastName());
        savedProfileDto.setPhone(profileDto.getPhone());
        savedProfileDto.setCity(profileDto.getCity());
        savedProfileDto.setCountry(profileDto.getCountry());
        savedProfileDto.setCandidate_id(profileDto.getCandidate_id());
        savedProfileDto.setEmail(profileDto.getEmail());
        return savedProfileDto;
    }


    @Override
    public ProfileDto UpdateProfile(ProfileDto profileDto, List<Skill> skills) throws CandidateNotFoundException, ProfileNotFoundException {
        CandidateDto candidateDto = profileClientPerson.getCandidatebyId(profileDto.getCandidate_id());
        if(candidateDto==null) throw  new CandidateNotFoundException("candidate with id "+profileDto.getCandidate_id()+" not found");
        Profile profile = profileMapper.fromProfileDtoToProfile(profileDto);
        Profile oldProfile = profileRepo.findById(profile.getId()).orElseThrow(()-> new ProfileNotFoundException("profile not Found Exception") );
        List<Skill> skillsa = (List<Skill>) skills.stream().map(sk ->{
            return Skill.builder()
                    .id(UUID.randomUUID().toString())
                    .yearsOfExperience(sk.getYearsOfExperience())
                    .skillName(sk.getSkillName())
                    .build();
        }).collect(Collectors.toList());
        List<Skill> savedSkills = skillservice.saveSkills(skillsa);
        profile.setSkills(savedSkills);
        profile.setCandidateid(candidateDto.getId());
        if(oldProfile.getCv()!=null)
            profile.setCv(oldProfile.getCv());
        if(oldProfile.getAudio()!=null)
            profile.setAudio(oldProfile.getAudio());
        if(oldProfile.getIntrviewData()!=null)
            profile.setIntrviewData(oldProfile.getIntrviewData());
        Profile savedProfile = profileRepo.save(profile);
        ProfileDto savedProfileDto= profileMapper.fromProfileToDto(savedProfile);
        savedProfileDto.setFirstName(profileDto.getFirstName());
        savedProfileDto.setLastName(profileDto.getLastName());
        savedProfileDto.setPhone(profileDto.getPhone());
        savedProfileDto.setCity(profileDto.getCity());
        savedProfileDto.setCountry(profileDto.getCountry());
        savedProfileDto.setCandidate_id(profileDto.getCandidate_id());
        savedProfileDto.setEmail(profileDto.getEmail());
        return savedProfileDto;
    }

    @Override
    public ProfileDto getProfileByid(String profile_id) throws ProfileNotFoundException {
        Profile profile=profileRepo.findById(profile_id).orElseThrow(() -> new ProfileNotFoundException("profile id not fount exception") );
        CandidateDto candidateDto = profileClientPerson.getCandidatebyId(profile.getCandidateid());
        ProfileDto profileDto = profileMapper.fromProfileToDto(profile);
        profileDto.setFirstName(candidateDto.getFirstName());
        profileDto.setLastName(candidateDto.getLastName());
        profileDto.setPhone(candidateDto.getPhone());
        profileDto.setCity(candidateDto.getCity());
        profileDto.setCountry(candidateDto.getCountry());
        profileDto.setEmail(candidateDto.getEmail());
        profileDto.setCandidate_id(candidateDto.getId());
        profileDto.setStatus(candidateDto.getStatus());
        return profileDto;
    }

    @Override
    public void deleteOffer(String offer_id) {
        recruitmenrProcessRespo.deleteByOfferid(offer_id);
    }

    @Override
    public RecruitmentProcess ApplayToAnOffer(RecruitmentProcess recruitmentProcess) {
        // we dont have to verify if profile id and offer id exist cuz we did this precess in offer service
        return recruitmenrProcessRespo.save(recruitmentProcess);
    }

    @Override
    public PageableProfileDto getAllProfiles(int page, int size) {
        Page<Profile> profiles = profileRepo.findAllByOrderByCreatedAtDesc(PageRequest.of(page,size));
        List<ProfileDto> profileDtos = new ArrayList<>();
        for ( Profile pr : profiles ) {
            CandidateDto cdto = profileClientPerson.getCandidatebyId(pr.getCandidateid());
            profileDtos.add(ProfileDto.builder()
                            .id(pr.getId())
                            .profileTitle(pr.getProfileTitle())
                            .profileTitle(pr.getProfileTitle())
                            .profileType(pr.getProfileType())
                            .cv(pr.getCv())
                            .audio(pr.getAudio())
                            .salaryExpectations(pr.getSalaryExpectations())
                            .candidate_id(pr.getCandidateid())
                            .createdAt(pr.getCreatedAt())
                            .firstName(cdto.getFirstName())
                            .lastName(cdto.getLastName())
                            .phone(cdto.getPhone())
                            .city(cdto.getCity())
                            .country(cdto.getCountry())
                            .email(cdto.getEmail())
                            .Skills(pr.getSkills())
                            .status(cdto.getStatus())
                    .build());
        }
        return PageableProfileDto.builder()
                .currentPage(page)
                .totalPages(profiles.getTotalPages())
                .pageSize(size)
                .profileDtos(profileDtos)
                .build();
    }


    public Boolean isProfileAssociatedToOfferPrevously(String offre_id, String profile_is) {
        RecruitmentProcess recruitmentProcess = this.recruitmenrProcessRespo.findByOfferidAndProfileid(offre_id,profile_is);
        if (recruitmentProcess==null)
            return  false;
        return true;
    }

    @Override
    //when we  select an offer then we want to add to it profiles so here we need to know id the profile is aleady associated to that selected offer
    public PageableProfileDto getAllProfiles(int page, int size,String offer_id) {
        Page<Profile> profiles = profileRepo.findAllByOrderByCreatedAtDesc(PageRequest.of(page,size));
        List<ProfileDto> profileDtos = new ArrayList<>();
        for ( Profile pr : profiles ) {
            if(!isProfileAssociatedToOfferPrevously(offer_id,pr.getId())){
                CandidateDto cdto = profileClientPerson.getCandidatebyId(pr.getCandidateid());
                profileDtos.add(ProfileDto.builder()
                        .id(pr.getId())
                        .profileTitle(pr.getProfileTitle())
                        .profileType(pr.getProfileType())
                        .cv(pr.getCv())
                        .audio(pr.getAudio())
                        .salaryExpectations(pr.getSalaryExpectations())
                        .candidate_id(pr.getCandidateid())
                        .createdAt(pr.getCreatedAt())
                        .firstName(cdto.getFirstName())
                        .lastName(cdto.getLastName())
                        .phone(cdto.getPhone())
                        .city(cdto.getCity())
                        .country(cdto.getCountry())
                        .email(cdto.getEmail())
                        .Skills(pr.getSkills())
                        .status(cdto.getStatus())
                        .build());
            }
        }
        return PageableProfileDto.builder()
                .currentPage(page)
                .totalPages(profiles.getTotalPages())
                .pageSize(size)
                .profileDtos(profileDtos)
                .build();
    }

    @Override
    public void saveProfileFiles(MultipartFile file,String profile_id) throws ProfileNotFoundException, UnsupportedFileTypeException, IOException {
        Profile profile = profileRepo.findById(profile_id).orElseThrow(()-> new ProfileNotFoundException("profile id "+ profile_id+" not found "));
        //delete the old cv if we are trying to pdate the profile
        if(profile.getCv()!=null && file.getContentType().equals("application/pdf")){
            File fileToDelete = new File(this.Pathcv+profile.getCv());
            if (fileToDelete.exists()) {
                boolean isDeleted = fileToDelete.delete();
            }
        }
        //delete the old  audio if we are trying to update the profile
        if(profile.getAudio()!=null && ( file.getContentType().equals("audio/mp3"))){
            File fileToDelete = new File(this.Pathaudio+profile.getAudio());
            if (fileToDelete.exists()) {
                boolean isDeleted = fileToDelete.delete();
            }
        }
        String contentType = file.getContentType();
        List<String> audioMimeTypes = Arrays.asList(
                "audio/mpeg" ,
                "audio/opus" ,
                "audio/mp3",
                "video/mp4"


        );
        List<String> pdfMimeTypes = Arrays.asList(
                "application/pdf"  // PD
        );
        if (audioMimeTypes.contains(contentType)) {
            profile.setAudio(file.getOriginalFilename());
            this.profileRepo.save(profile);
            file.transferTo(new File(this.Pathaudio + file.getOriginalFilename()));}
        else if (pdfMimeTypes.contains(contentType)) {
            profile.setCv(file.getOriginalFilename());
            this.profileRepo.save(profile);
            file.transferTo(new File(this.Pathcv + file.getOriginalFilename()));
        } else {
            throw new UnsupportedFileTypeException("Unsupported file type: " + contentType);
        }

    }

    @Override
    public IntrviewData saveIntrviewDataAssociatedToAnProfile(IntrviewDtos intrviewDataDto) throws ProfileNotFoundException {
        Profile p = profileRepo.findById(intrviewDataDto.getProfile_id()).orElseThrow(()-> new ProfileNotFoundException("profile id "+intrviewDataDto.getProfile_id()+" not found "));
        //save
        if(p.getIntrviewData()==null){
        intrviewDataDto.setId(UUID.randomUUID().toString());
        IntrviewData intrviewData= profileMapper.fromIntrviewdtoTointrview(intrviewDataDto);
        IntrviewData savedobjectdata = intrviewDataRepo.save(intrviewData);
        p.setIntrviewData(savedobjectdata);
        Profile savePr= profileRepo.save(p);
        return savePr.getIntrviewData();
        }
        //update
        else {
            IntrviewData intrviewData= profileMapper.fromIntrviewdtoTointrview(intrviewDataDto);
            IntrviewData savedobjectdata = intrviewDataRepo.save(intrviewData);
            p.setIntrviewData(savedobjectdata);
            Profile savePr= profileRepo.save(p);
            return savePr.getIntrviewData();
        }
    }

    @Override
    public void deletAnApplication(String applicationId) {
        this.recruitmenrProcessRespo.deleteById(applicationId);
    }

    @Override
    public PageableProfileDto getProfilesByCandiadte(String candidateId,int page,int size) throws ProfileNotFoundException {
        Page<Profile> profiles=this.profileRepo.findByCandidateid(candidateId,PageRequest.of(page,size));
        List<ProfileDto> profileDtos = new ArrayList<>();
        for (Profile p: profiles.getContent()) {
            profileDtos.add(this.getProfileByid(p.getId()));
        }
        return PageableProfileDto.builder()
                .totalPages(profiles.getTotalPages())
                .pageSize(size)
                .currentPage(page)
                .profileDtos(profileDtos)
                .build();
    }


    public CandidateDto getCandidateByIdfrmlist(List<CandidateDto> candidates, String id)  {
        for (CandidateDto c : candidates) {
            if ( c.getId().equals(id)) {
                return c;
            }
        }
        return null;
    }
}
