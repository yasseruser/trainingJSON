package open.mind.its.recruitment.application.profilemanagment.DTOS;

import jakarta.persistence.Column;
import jakarta.persistence.Transient;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class IntrviewDtos {
    private String id;
    private String linkdin;

    private String github;
    private String portfolio;

    private String yourMotivationForChangePosition;

    private String PointsDefinedByClient;

    private String otherPoints;

    private String softSkills;

    private String expectations;

    private String trainingPlans;

    private String currentBenifits;

    private String desiredBenifits;

    private Double currentSalary;
    private Double fixedSalary;
    private Double desiredSalary;
    private String noticePeriodDuration;
    private String recruitorId;
    private String employedStatus;
    private String statusSearch;
    private String onGoingProcesses;
    private String progressLevel;
    private String relocation;
    private String mobilityArea;

    private String quation;
    private Date availabilityDate;
    private Date intrviewedVideoCallDate;
    private String profile_id;
}
