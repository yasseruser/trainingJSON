package open.mind.its.recruitment.application.profilemanagment.REPO;

import open.mind.its.recruitment.application.profilemanagment.ENTITIES.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepo extends JpaRepository<Skill,String> {
}
