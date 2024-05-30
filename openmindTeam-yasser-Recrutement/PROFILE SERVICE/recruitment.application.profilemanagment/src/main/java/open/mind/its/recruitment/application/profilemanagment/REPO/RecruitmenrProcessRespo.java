package open.mind.its.recruitment.application.profilemanagment.REPO;

import open.mind.its.recruitment.application.profilemanagment.ENTITIES.RecruitmentProcess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitmenrProcessRespo extends JpaRepository<RecruitmentProcess,String> {
    void deleteByOfferid(String offer_id);
    RecruitmentProcess findByOfferidAndProfileid(String offerid,String profile_id);
}
