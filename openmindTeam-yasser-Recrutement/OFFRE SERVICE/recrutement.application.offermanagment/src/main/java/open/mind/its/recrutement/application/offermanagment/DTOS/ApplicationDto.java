package open.mind.its.recrutement.application.offermanagment.DTOS;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicationDto {
            private String id;
            private String audio;
            private String email;
            private String phone;
            private String cv;
            private String candidate_id;
            private String city;
            private String country;
            private String firstName;
            private String lastName;
            private String profileTitle;
            private String profileType;
            private  String profile_id;
            private double salaryExpectations;
            private String recruitment_status;
            private boolean validatedByRecruitor;
            private boolean validatedByValidator;
            private OfferDto offerDto;
            private ProfileDto profileDto;
}
