package open.mind.its.recruitment.application.profilemanagment.DTOS;

import lombok.*;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.IntrviewData;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.Skill;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;

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
    private Date createdAt;
    private String status;
    private String recruitmentStatus;
    private Collection<Skill> Skills;
    private IntrviewData intrviewData;



}
