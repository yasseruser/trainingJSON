package open.mind.its.recruitement.application.companymanagment.WEB;

import lombok.AllArgsConstructor;
import open.mind.its.recruitement.application.companymanagment.DTOS.CompanyDto;
import open.mind.its.recruitement.application.companymanagment.DTOS.PageableCompanyDTO;
import open.mind.its.recruitement.application.companymanagment.ENTITIES.CurrencyCountry;
import open.mind.its.recruitement.application.companymanagment.EXCEPTIONS.CompanyNotFoundException;
import open.mind.its.recruitement.application.companymanagment.SERVICE.CompanyService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("/company")
public class CompanyAPI {

    private CompanyService companyService;


    @PostMapping("/savecompany")
    @PreAuthorize("hasAuthority('HR')")
    public CompanyDto saveCompany(@RequestBody  CompanyDto companyDto){
        return companyService.saveCompany(companyDto);
    }


    @GetMapping("/{company_id}")
    public CompanyDto getCompanyById(@PathVariable  String company_id) throws CompanyNotFoundException {
        return companyService.GetCompanyById(company_id);
    }

    @PreAuthorize("hasAnyAuthority('HR', 'VALIDATOR','RECRUITOR')")
    @GetMapping("/companies")
    public List<CompanyDto> searchCompany(@RequestParam(name = "keyword",defaultValue = "") String keyword){
        return companyService.FilterCompanyByName("%"+keyword+"%");
    }

    @GetMapping("/countries")
    public List<CurrencyCountry> getCountries(){
        return  companyService.getAllCountries();
    }

    @GetMapping("/countries/{country}")
    public List<CurrencyCountry> getCurrencyByCountry(@PathVariable String country){
        return  companyService.getCurrencyByCountry(country);
    }

    @PreAuthorize("hasAnyAuthority('HR', 'VALIDATOR','RECRUITOR')")
    @GetMapping("/companypaginable")
    public PageableCompanyDTO getCompany(@RequestParam(name="page",defaultValue = "0") int page,
                                         @RequestParam(name="size",defaultValue = "5")int size,
                                         @RequestParam(name="keyword",defaultValue = "") String keyword)  {
        return  companyService.listCompanies(keyword,size,page);
    }


    @PostMapping("/updatecompany")
    @PreAuthorize("hasAuthority('HR')")
    public CompanyDto updateCompany(@RequestBody CompanyDto companyDto) throws CompanyNotFoundException {
        return   companyService.updateCompany(companyDto);
    }


}
