package open.mind.its.recruitment.application.profilemanagment.ENTITIES;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IntrviewData {
    @Id
    private String id;
    @Column(nullable = false,unique = true)
    private String linkdin;
    @Column(nullable = false,unique = true)
    private String github;
    private String portfolio;
    @Column(columnDefinition = "TEXT")
    private String yourMotivationForChangePosition;
    @Column(columnDefinition = "TEXT")
    private String PointsDefinedByClient;
    @Column(columnDefinition = "TEXT")
    private String otherPoints;
    @Column(columnDefinition = "TEXT")
    private String softSkills;
    @Column(columnDefinition = "TEXT")
    private String expectations;
    @Column(columnDefinition = "TEXT")
    private String trainingPlans;
    @Column(columnDefinition = "TEXT")
    private String currentBenifits;
    @Column(columnDefinition = "TEXT")
    private String desiredBenifits;
    @Column(columnDefinition = "TEXT")
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
    @Column(columnDefinition = "TEXT")
    private String quation;
    private Date availabilityDate;
    private Date intrviewedVideoCallDate;


}
