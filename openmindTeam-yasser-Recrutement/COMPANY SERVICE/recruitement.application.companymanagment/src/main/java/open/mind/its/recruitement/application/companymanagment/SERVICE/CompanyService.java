package open.mind.its.recruitement.application.companymanagment.SERVICE;

import open.mind.its.recruitement.application.companymanagment.DTOS.CompanyDto;
import open.mind.its.recruitement.application.companymanagment.DTOS.PageableCompanyDTO;
import open.mind.its.recruitement.application.companymanagment.ENTITIES.Company;
import open.mind.its.recruitement.application.companymanagment.ENTITIES.CurrencyCountry;
import open.mind.its.recruitement.application.companymanagment.EXCEPTIONS.CompanyNotFoundException;

import java.util.List;

public interface CompanyService {
    CompanyDto saveCompany(CompanyDto companyDto);
    CompanyDto GetCompanyById(String company_id) throws CompanyNotFoundException;
    List<CompanyDto> FilterCompanyByName(String kw);

    PageableCompanyDTO listCompanies(String companyName, int size, int page);

    List<CurrencyCountry> getAllCountries();
    List<CurrencyCountry> getCurrencyByCountry(String country);

    CompanyDto updateCompany(CompanyDto companyDto) throws CompanyNotFoundException;
}
