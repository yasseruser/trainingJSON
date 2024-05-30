package open.mind.its.recruitement.application.companymanagment.MAPPERS;

import open.mind.its.recruitement.application.companymanagment.DTOS.ValidatorDto;
import open.mind.its.recruitement.application.companymanagment.ENTITIES.Validator;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class PersonMapper {

    public ValidatorDto fromValidatorToDto(Validator v){
        ValidatorDto dto = new ValidatorDto();
        BeanUtils.copyProperties(v,dto);
        return  dto;
    }

    public Validator fromValidatorDtoToValidator(ValidatorDto dto){
        Validator v = new Validator();
        BeanUtils.copyProperties(dto,v);
        return  v;
    }
}
