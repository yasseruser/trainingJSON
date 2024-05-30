package open.mind.its.recrutement.application.authantication.ENTITIES;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


public class Person {
    private String id;
    private String firstName;
    private String lastName;
    private LocalDate createdDate;
    private String phone;
    private String city;
    private String country;
    private String email;

}
