package open.mind.its.recruitment.application.personemanagment.ENTITIES;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
// company id is the reference of the company that this hr part of it
@DiscriminatorValue("CA")
public class Candidate extends Person{
    private String status;
    private Boolean hasAccount;
    private LocalDate birthDate;
    @Transient
    private Collection<Profile> profiles;
    @ElementCollection
    @CollectionTable(name="candidate_slots", joinColumns=@JoinColumn(name="candidate_id"))
    @Column(name="slot")
    private Collection<LocalDate> slots= new ArrayList<>();

}
