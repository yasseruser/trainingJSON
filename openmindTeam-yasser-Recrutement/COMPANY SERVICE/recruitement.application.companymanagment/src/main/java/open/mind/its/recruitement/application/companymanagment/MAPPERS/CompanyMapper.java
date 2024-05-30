package open.mind.its.recruitement.application.companymanagment.MAPPERS;

import open.mind.its.recruitement.application.companymanagment.DTOS.CompanyDto;
import open.mind.its.recruitement.application.companymanagment.ENTITIES.Company;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class CompanyMapper {
    public CompanyDto frmCompanyToDto (Company company){
        CompanyDto companyDto = new CompanyDto();
        BeanUtils.copyProperties(company,companyDto);
        return  companyDto;
    }
    public Company frmCompanyDtoToCompany (CompanyDto dto){
        Company company = new Company();
        BeanUtils.copyProperties(dto,company);
        return  company;
    }
}
