package open.mind.its.recrutement.application.offermanagment.ENTITIES;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"offerid", "validatorid"})})
public class ValidatorOffer {
    @Id
    @Column(nullable = false)
    private String id;
    @Column(nullable = false)
    private String offerid;
    @Column(nullable = false)
    private String validatorid;
    private Date createdat;
}
