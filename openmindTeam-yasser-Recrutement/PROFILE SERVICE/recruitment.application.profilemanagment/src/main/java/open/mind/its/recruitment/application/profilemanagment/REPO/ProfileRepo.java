package open.mind.its.recruitment.application.profilemanagment.REPO;

import feign.Param;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.Profile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileRepo extends JpaRepository<Profile,String> {
    List<Profile> findAllByIdIn(List<String> profile_ids);

    @Query("SELECT p FROM Profile p WHERE p.id IN :profileIds AND p.profileTitle LIKE %:keyword%")
    List<Profile> findAllByIdInAndTitleContaining(@Param("profileIds") List<String> profileIds, @Param("keyword") String keyword);
    Page<Profile> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Profile> findByCandidateid(String candidateid,Pageable pageable);
}
