package open.mind.its.recruitement.application.companymanagment.ENTITIES;

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
public class Company {
    @Id
    @Column(nullable = false)
    private String Id;
    @Column(unique = true,nullable = false)
    private String name;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String country;
    @Column(nullable = false)
    private String contact;
    @Column(nullable = false)
    private String email;
    private String webSiteLink;
    private String sector;
    private String informations;
    private Date createdAt;
    @Transient
    private Collection<Offer> Offers;
}
