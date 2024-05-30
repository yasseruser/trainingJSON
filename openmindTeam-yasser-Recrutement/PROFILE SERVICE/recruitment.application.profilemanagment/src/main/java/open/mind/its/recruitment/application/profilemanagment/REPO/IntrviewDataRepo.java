package open.mind.its.recruitment.application.profilemanagment.REPO;

import open.mind.its.recruitment.application.profilemanagment.ENTITIES.IntrviewData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IntrviewDataRepo extends JpaRepository<IntrviewData,String> {
}
