package open.mind.its.recruitment.application.personemanagment.REPO;

import feign.Param;
import open.mind.its.recruitment.application.personemanagment.ENTITIES.Candidate;
import open.mind.its.recruitment.application.personemanagment.ENTITIES.Recruitor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitorRepo extends JpaRepository<Recruitor,String> {
    @Query("select c from Recruitor c where c.lastName like %:kw%")
    Page<Recruitor> filterRecruitorsByName(@Param("kw") String kw, Pageable pageable);
    Page<Recruitor> findByOrderByCreatedDateDesc(Pageable pageable);
    List<Recruitor> findByCompanyid(String companyid);
    List<Recruitor> findByUserId(String userId);

}
