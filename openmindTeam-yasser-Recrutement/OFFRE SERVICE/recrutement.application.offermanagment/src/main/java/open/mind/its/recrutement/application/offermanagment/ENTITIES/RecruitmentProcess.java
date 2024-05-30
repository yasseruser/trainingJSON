package open.mind.its.recrutement.application.offermanagment.ENTITIES;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"profileid", "offerid"})})
public class RecruitmentProcess {
    @Id
    private String id;
    @Column(nullable = false)
    private String profileid;
    @Column(nullable = false)
    private String  offerid;
    @Column(nullable = false)
    private String tag;
    @Column(nullable = false)
    private LocalDate createdAt;
    private boolean validatedByRecruitor;
    private boolean validatedByValidator;


}
