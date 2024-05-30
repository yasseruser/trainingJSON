package open.mind.its.recruitment.application.profilemanagment.ENTITIES;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Profile {
    @Id
    private String id;
    @Column(nullable = false)
    private String profileTitle;
    @Column(nullable = false)
    private String profileType;
    @Column(unique = true)
    private  String cv;
    @Column(unique = true)
    private String audio;
    @OneToOne
    private IntrviewData intrviewData;
    private Double salaryExpectations;
    @Column(nullable = false)
    private Date createdAt;
    @Column(nullable = false)
    private String candidateid;
    @ManyToMany(fetch = FetchType.LAZY)
    private Collection<Skill> Skills;
    //Transient skip this field
    @Transient
    private Collection<Offer> Offers;

}
