package open.mind.its.recrutement.application.offermanagment.ENTITIES;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.*;

import java.util.Collection;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Offer {

    @Id
    private String id;
    @Column(columnDefinition = "TEXT",nullable = false)
    private  String offer_title;
    @Column(columnDefinition = "TEXT",nullable = false)
    private  String localisation;
    private  Double remuneration;
    @Column(nullable = false)
    private  Boolean offer_availability;
    @Column(columnDefinition = "TEXT",nullable = false)
    private String desired_profile;
    @Column(columnDefinition = "TEXT",nullable = false)
    private String offer_description;
    @Column(columnDefinition = "TEXT",nullable = false)
    private String key_points;
    @Column(columnDefinition = "TEXT",nullable = false)
    private String benefits;
    @Column(nullable = false)
    private Date createdat;
    private String fileExtention;
    @Column(nullable = false)
    private String companyid;
    @Column(nullable = false)
    private String currency;
    @Transient
    private Collection<Validator> validators;
    @Transient
    private Collection<Profile> applications;

}
