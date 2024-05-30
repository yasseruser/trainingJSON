package open.mind.its.recrutement.application.offermanagment.ENTITIES;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"offerId", "recruitorId"})})
public class RecruitorOffer {
    @Id
    private String id;
    @Column(nullable = false)
    private String recruitorId;
    @Column(nullable = false)
    private String offerId;
    private Date createdat;

}
