package open.mind.its.recruitment.application.profilemanagment.DTOS;

import lombok.*;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.Skill;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class SaveProfileRequest {
    private String id;
    private String profileTitle;
    private String profileType;
    private  String cv;
    private String audio;
    private Double salaryExpectations;
    private String firstName;
    private String lastName;
    private String phone;
    private String city;
    private String country;
    private String email;
    private String candidate_id;
    private List<Skill> skills=new ArrayList<>();
}
