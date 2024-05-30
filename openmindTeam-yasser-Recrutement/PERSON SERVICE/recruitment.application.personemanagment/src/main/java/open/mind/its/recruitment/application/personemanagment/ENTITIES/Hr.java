package open.mind.its.recruitment.application.personemanagment.ENTITIES;


import lombok.*;

//@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@DiscriminatorValue("HR")
public class Hr extends Person {
    private String status;
}
