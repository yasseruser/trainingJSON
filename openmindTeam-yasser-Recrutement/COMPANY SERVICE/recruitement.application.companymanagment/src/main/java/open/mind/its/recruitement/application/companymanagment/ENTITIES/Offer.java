package open.mind.its.recruitement.application.companymanagment.ENTITIES;



import java.util.Collection;


public class Offer {

    private String id;
    private  String offer_title;
    private  String localisation;
    private  Double remuneration;
    private  Boolean offer_availability;
    private String Desired_profile;
    private String offer_description;
    private String key_points;
    private String benefits;
    private String companyid;

    private Collection<Validator> validators;
    private Collection<Profile> applications;

}
