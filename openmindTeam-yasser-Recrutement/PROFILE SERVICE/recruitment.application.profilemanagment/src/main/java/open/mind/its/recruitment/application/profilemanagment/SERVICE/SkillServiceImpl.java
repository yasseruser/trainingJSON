package open.mind.its.recruitment.application.profilemanagment.SERVICE;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.Skill;
import open.mind.its.recruitment.application.profilemanagment.REPO.SkillRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
@Transactional
public class SkillServiceImpl implements  SkillService{

    private SkillRepo skillRepo;
    @Override
    public Skill saveSkill(Skill skill) {
        return skillRepo.save(skill) ;
    }

    @Override
    public Skill updateSkill(Skill skill) {
        return skillRepo.save(skill);
    }

    @Override
    public void delete(Skill skill) {
        skillRepo.delete(skill);
    }

    @Override
    public List<Skill> saveSkills(List<Skill> skills) {
        return skillRepo.saveAll(skills);
    }

}
