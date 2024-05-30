package open.mind.its.recruitment.application.personemanagment.REPO;

import feign.Param;
import open.mind.its.recruitment.application.personemanagment.ENTITIES.Candidate;
import open.mind.its.recruitment.application.personemanagment.ENTITIES.Recruitor;
import open.mind.its.recruitment.application.personemanagment.ENTITIES.Validator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ValidatorRepo extends JpaRepository<Validator,String> {
    @Query("select c from Validator c where c.lastName like %:kw%")
    Page<Validator> filterValidatorsByName(@Param("kw") String kw, Pageable pageable);
    Page<Validator> findByOrderByCreatedDateDesc(Pageable pageable);
    List<Validator> findByUserId(String userId);

}
