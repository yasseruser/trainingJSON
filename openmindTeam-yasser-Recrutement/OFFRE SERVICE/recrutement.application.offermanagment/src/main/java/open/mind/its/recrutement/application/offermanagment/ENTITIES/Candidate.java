package open.mind.its.recrutement.application.offermanagment.ENTITIES;


import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.JoinColumn;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;

public class Candidate extends Person{
    private String status;
    private LocalDate birthDate;
    private Collection<Profile> profiles;
    private Collection<LocalDate> slots ;

}
