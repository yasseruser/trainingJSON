package open.mind.its.recruitment.application.profilemanagment.MAPPERS;

import open.mind.its.recruitment.application.profilemanagment.DTOS.IntrviewDtos;
import open.mind.its.recruitment.application.profilemanagment.DTOS.ProfileDto;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.IntrviewData;
import open.mind.its.recruitment.application.profilemanagment.ENTITIES.Profile;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class ProfileMapper {
     public ProfileDto fromProfileToDto(Profile profile){
         ProfileDto profileDto = new ProfileDto();
         BeanUtils.copyProperties(profile,profileDto);
         return  profileDto;
     }

    public Profile fromProfileDtoToProfile(ProfileDto dto){
        Profile profile = new Profile();
        BeanUtils.copyProperties(dto,profile);
        return  profile;
    }

    public IntrviewDtos fromIntrviewToDto(IntrviewData data){
        IntrviewDtos dto = new IntrviewDtos();
        BeanUtils.copyProperties(data,dto);
        return  dto;
    }

    public IntrviewData fromIntrviewdtoTointrview(IntrviewDtos data){
        IntrviewData i = new IntrviewData();
        BeanUtils.copyProperties(data,i);
        return  i;
    }
}
