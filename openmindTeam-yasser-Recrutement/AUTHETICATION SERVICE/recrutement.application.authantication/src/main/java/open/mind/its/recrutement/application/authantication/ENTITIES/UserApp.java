package open.mind.its.recrutement.application.authantication.ENTITIES;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Collection;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserApp {

    @Id
    private String id;
    private String username;
    private String password;
    private Boolean emailCheckedStatus;
    // id person is the reference for the person in person service
    private String person_id;
    //transient is an annotation for not taking into consideration the field person to store it in this database because the person is already stored in person service database
    @Transient
    private Person person;
    //fetch type eager cuz we need to initialize the roles at first
    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles= new ArrayList<>();
}
