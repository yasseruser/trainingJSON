package open.mind.its.recruitment.application.profilemanagment.ENTITIES;


import java.util.ArrayList;
import java.util.Collection;

public class UserApp {

    private String id;
    private String username;
    private String password;
    private Boolean emailCheckedStatus;
    private String personid;
    private Person person;
    private Collection<Role> roles= new ArrayList<>();
}
