package open.mind.its.recrutement.application.offermanagment.DTOS;

import lombok.*;
import open.mind.its.recrutement.application.offermanagment.ENTITIES.Skill;

import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ProfileDto {
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
    private Collection<Skill> Skills;
}
