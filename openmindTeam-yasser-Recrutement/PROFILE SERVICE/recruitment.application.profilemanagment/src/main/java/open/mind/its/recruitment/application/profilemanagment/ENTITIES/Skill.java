package open.mind.its.recruitment.application.profilemanagment.ENTITIES;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Skill {
    @Id
    private String id;
    private String skillName;
    private int yearsOfExperience;
}
