package open.mind.its.recruitment.application.profilemanagment.ENTITIES;


import lombok.*;

import java.util.Collection;

public class Company {

    private String Id;
    private String name;
    private String address;
    private String country;
    private String contact;
    private String email;
    private String webSiteLink;
    private String sector;
    private String informations;

    private Collection<Offer> Offers;
}
