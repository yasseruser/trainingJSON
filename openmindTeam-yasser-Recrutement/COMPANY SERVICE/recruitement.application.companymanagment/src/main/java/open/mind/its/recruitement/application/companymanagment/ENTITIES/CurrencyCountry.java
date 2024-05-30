package open.mind.its.recruitement.application.companymanagment.ENTITIES;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CurrencyCountry {
    @Id
    private String id;
    @Column(nullable = false,unique = true)
    private String country;
    @Column(nullable = false,unique = true)
    private String currency;
}
