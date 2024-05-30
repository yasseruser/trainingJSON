package open.mind.its.recruitment.application.profilemanagment.WEB;

import lombok.AllArgsConstructor;
import open.mind.its.recruitment.application.profilemanagment.DTOS.IntrviewDtos;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.IntrviewData;
import open.mind.its.recruitment.application.profilemanagment.EXCEPTIONS.ProfileNotFoundException;
import open.mind.its.recruitment.application.profilemanagment.SERVICE.ProfileService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/intrviewdata")
public class IntrviewDataApi {
    private ProfileService profileService;
    @PostMapping("/save")
    @PreAuthorize("hasAuthority('HR')")
    public IntrviewData saveIntrviewData(@RequestBody IntrviewDtos intrviewData) throws ProfileNotFoundException {
        return this.profileService.saveIntrviewDataAssociatedToAnProfile(intrviewData);
    }
}
