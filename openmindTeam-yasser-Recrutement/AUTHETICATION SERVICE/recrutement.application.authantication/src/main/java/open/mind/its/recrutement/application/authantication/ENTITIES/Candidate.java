package open.mind.its.recrutement.application.authantication.ENTITIES;



import java.time.LocalDate;
import java.util.Collection;

public class Candidate extends Person{
    private String status;
    private LocalDate birthDate;

    private Collection<Profile> profiles;

}
