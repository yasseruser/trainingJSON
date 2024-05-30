package open.mind.its.recruitment.application.profilemanagment.SERVICE;

import open.mind.its.recruitment.application.profilemanagment.ENTITIES.Skill;

import java.util.List;

public interface SkillService {
     Skill saveSkill(Skill skill);
     Skill updateSkill(Skill skill);
     void delete(Skill skill);
     List<Skill> saveSkills(List<Skill> skills);


}
