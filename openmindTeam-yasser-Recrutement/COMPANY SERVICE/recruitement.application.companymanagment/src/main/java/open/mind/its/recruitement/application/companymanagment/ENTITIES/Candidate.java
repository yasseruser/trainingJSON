package open.mind.its.recruitement.application.companymanagment.ENTITIES;




import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;

public class Candidate extends Person{
    private String status;
    private LocalDate birthDate;

    private Collection<Profile> profiles;

    private Collection<LocalDate> slots= new ArrayList<>();

}
