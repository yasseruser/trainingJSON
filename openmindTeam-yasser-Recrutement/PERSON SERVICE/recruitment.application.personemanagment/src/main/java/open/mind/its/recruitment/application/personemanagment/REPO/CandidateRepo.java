package open.mind.its.recruitment.application.personemanagment.REPO;

import feign.Param;
import open.mind.its.recruitment.application.personemanagment.ENTITIES.Candidate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepo  extends JpaRepository<Candidate,String> {
    @Override
    Page<Candidate> findAll(Pageable pageable);
    @Query("select c from Candidate c where c.lastName like %:kw%")
    Page<Candidate> filterCandidateByName(@Param("kw") String kw,Pageable pageable);
    @Query("select c from Candidate c where c.lastName like %:kw%")
    List<Candidate> filterCandidateByName(@Param("kw") String kw);

    List<Candidate> findByUserId(String userId);
}
