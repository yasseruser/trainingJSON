package open.mind.its.recruitment.application.personemanagment.ENTITIES;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Transient;
import lombok.*;

import java.util.Collection;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
// company id is the reference of the company that this hr part of it
@DiscriminatorValue("VA")
public class Validator extends Person {

    private String companyid;
    @Transient
    private Company company;
    @Transient
    private Collection<Offer> offers;
}
