package open.mind.its.recruitment.application.personemanagment.REPO;

import open.mind.its.recruitment.application.personemanagment.DTOS.CandidateDto;
import open.mind.its.recruitment.application.personemanagment.ENTITIES.Candidate;
import open.mind.its.recruitment.application.personemanagment.ENTITIES.Person;
import open.mind.its.recruitment.application.personemanagment.ENTITIES.Validator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepo extends JpaRepository<Person,String> {
List<Person> findAllByIdIn(List<String> person_ids);

Page<Validator> findByCompanyid(String company_id, Pageable pageable);

Person findByFirstNameAndLastName(String firstName,String lastName);


}
