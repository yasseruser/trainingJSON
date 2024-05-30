package open.mind.its.recruitment.application.profilemanagment.WEB;

import lombok.AllArgsConstructor;
import open.mind.its.recruitment.application.profilemanagment.DTOS.PageableProfileDto;
import open.mind.its.recruitment.application.profilemanagment.DTOS.ProfileDto;
import open.mind.its.recruitment.application.profilemanagment.DTOS.SaveProfileRequest;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.RecruitmentProcess;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.Skill;
import open.mind.its.recruitment.application.profilemanagment.EXCEPTIONS.*;
import open.mind.its.recruitment.application.profilemanagment.SERVICE.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.lang.String;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/profile")
public class ProfileApi {

    private ProfileService profileService;
    //@GetMapping("/{profileId}/cv")
   // public Resource getfCvFileById(@PathVariable String profileId) throws ProfileNotFoundException {
       // return profileService.getCvFileById(profileId);
   // }

    @GetMapping("/{profileid}/cv")
    public ResponseEntity<byte[]> getCvFileById(@PathVariable String profileid) {
        try {
            byte[] cvFileBytes = profileService.getCvFileById(profileid);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(cvFileBytes);
        } catch (CvNotFoundException | ProfileNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{profileid}/audio")
    public ResponseEntity<byte[]> getAudioFileById(@PathVariable String profileid) {
        try {
            byte[] audioFileBytes = profileService.getAudioFileById(profileid);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(audioFileBytes);
        } catch (AudioNotFoundException | ProfileNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @PostMapping("/saveprofile")
    public ProfileDto saveProfile (@RequestBody SaveProfileRequest saveProfileRequest) throws CandidateNotFoundException {
        ProfileDto profileDto = ProfileDto.builder()
                .cv(saveProfileRequest.getCv())
                .email(saveProfileRequest.getEmail())
                .audio(saveProfileRequest.getAudio())
                .city(saveProfileRequest.getCity())
                .phone(saveProfileRequest.getPhone())
                .profileTitle(saveProfileRequest.getProfileTitle())
                .profileType(saveProfileRequest.getProfileType())
                .country(saveProfileRequest.getCountry())
                .candidate_id(saveProfileRequest.getCandidate_id())
                .firstName(saveProfileRequest.getFirstName())
                .lastName(saveProfileRequest.getLastName())
                .salaryExpectations(saveProfileRequest.getSalaryExpectations())
                .createdAt(new Date())
                .build();
        List<Skill> skills = saveProfileRequest.getSkills();
        return profileService.saveProfile(profileDto,skills);
    }

    @PostMapping("/updateprofile")
    public ProfileDto supdateProfile (@RequestBody SaveProfileRequest saveProfileRequest) throws CandidateNotFoundException, ProfileNotFoundException {
        ProfileDto profileDto = ProfileDto.builder()
                .id(saveProfileRequest.getId())
                .cv(saveProfileRequest.getCv())
                .email(saveProfileRequest.getEmail())
                .audio(saveProfileRequest.getAudio())
                .city(saveProfileRequest.getCity())
                .phone(saveProfileRequest.getPhone())
                .profileTitle(saveProfileRequest.getProfileTitle())
                .profileType(saveProfileRequest.getProfileType())
                .country(saveProfileRequest.getCountry())
                .candidate_id(saveProfileRequest.getCandidate_id())
                .firstName(saveProfileRequest.getFirstName())
                .lastName(saveProfileRequest.getLastName())
                .salaryExpectations(saveProfileRequest.getSalaryExpectations())
                .createdAt(new Date())
                .build();
        List<Skill> skills = saveProfileRequest.getSkills();
        return profileService.UpdateProfile(profileDto,skills);
    }


    @GetMapping("/{profile_id}")
    public ProfileDto getProfileByid(@PathVariable String profile_id) throws ProfileNotFoundException {
        return profileService.getProfileByid(profile_id);
    }

    @PostMapping("/getallprofilebyids")
    @PreAuthorize("hasAnyAuthority('HR', 'VALIDATOR','RECRUITOR')")
    public List<ProfileDto> getAllProfileByIds(@RequestBody Map<String,List<String>> profile_ids) throws ProfileNotFoundException {
        return  profileService.getALLProfileByIds(profile_ids.get("profile_ids"));
    }
    @PostMapping("/getprofilesbyidsandprofiletitle")
    @PreAuthorize("hasAnyAuthority('HR', 'VALIDATOR','RECRUITOR')")
    public List<ProfileDto> getAllProfileByIdsAnFiltringByTag(@RequestBody Map<String,List<String>> profile_ids,
                                                              @RequestParam(name = "profiletitle",defaultValue = "") String profiletitle) throws ProfileNotFoundException {
        return  profileService.getALLProfileByIdsAndByProfileTitle(profile_ids.get("profile_ids"),profiletitle);
    }
    @DeleteMapping("/deleteoffer/{offer_id}")
    @PreAuthorize("hasAuthority('HR')")
    public ResponseEntity<?> deleteoffer(@PathVariable String offer_id){
        profileService.deleteOffer(offer_id);
        return new ResponseEntity<>("Process deleted successfully", HttpStatus.OK);
    }

    @PostMapping("/applay")
    public RecruitmentProcess ApplayToAnOffer(@RequestBody RecruitmentProcess recruitmentProcess){
        return profileService.ApplayToAnOffer(recruitmentProcess);
    }

    @GetMapping("/profiles")
    @PreAuthorize("hasAnyAuthority('HR', 'VALIDATOR','RECRUITOR')")
    public PageableProfileDto getProfiles(@RequestParam(name="page",defaultValue = "0") int page,
                                          @RequestParam(name="size",defaultValue = "5")int size,
                                          @RequestParam(name = "offer_id",defaultValue = "") String offer_id){
        if(offer_id.equals(""))
            return profileService.getAllProfiles(page,size);
        else
            return profileService.getAllProfiles(page,size,offer_id);
    }

    @PostMapping("/savefilesprofile")
    public Object saveFilesProfile(@RequestParam MultipartFile file, @RequestParam  String profile_id) throws UnsupportedFileTypeException, IOException, ProfileNotFoundException {
        this.profileService.saveProfileFiles(file,profile_id);
        Map<String , String> res = new HashMap<>();
        return res.put("status","file Has been Stored with Success ");
    }

    @DeleteMapping("/application/delete")
    public ResponseEntity<Object> deleteAnApplication(@RequestBody RecruitmentProcess recruitmentProcess){
        this.profileService.deletAnApplication(recruitmentProcess.getId());
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        return ResponseEntity.ok().body(response);

    }

    @GetMapping("/{candidate_id}/profiles")
    @PreAuthorize("hasAnyAuthority('HR', 'CANDIDATE')")
    public PageableProfileDto getProfilesOfAnCandidaye(@PathVariable String candidate_id,
                                                       @RequestParam(name="page",defaultValue = "0") int page,
                                                       @RequestParam(name="size",defaultValue = "5")int size) throws ProfileNotFoundException {
        return this.profileService.getProfilesByCandiadte(candidate_id,page,size);
    }

    @GetMapping("/profiles1")
    public String getProandidaye() {
        return "hellooo access";
    }
}

