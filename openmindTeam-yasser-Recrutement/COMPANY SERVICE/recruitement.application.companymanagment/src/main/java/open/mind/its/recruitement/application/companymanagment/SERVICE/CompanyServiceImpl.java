package open.mind.its.recruitement.application.companymanagment.SERVICE;

import lombok.AllArgsConstructor;
import open.mind.its.recruitement.application.companymanagment.DTOS.CompanyDto;
import open.mind.its.recruitement.application.companymanagment.DTOS.PageableCompanyDTO;
import open.mind.its.recruitement.application.companymanagment.ENTITIES.Company;
import open.mind.its.recruitement.application.companymanagment.ENTITIES.CurrencyCountry;
import open.mind.its.recruitement.application.companymanagment.EXCEPTIONS.CompanyNotFoundException;
import open.mind.its.recruitement.application.companymanagment.MAPPERS.CompanyMapper;
import open.mind.its.recruitement.application.companymanagment.REPO.CompanyRepo;
import open.mind.its.recruitement.application.companymanagment.REPO.CurrencyCountryRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class CompanyServiceImpl implements  CompanyService{

    private CompanyMapper companyMapper;
    private CompanyRepo companyRepo;
    private CurrencyCountryRepo currencyCountryRepo;
    @Override
    public CompanyDto saveCompany(CompanyDto companyDto) {
        Company company = companyMapper.frmCompanyDtoToCompany(companyDto);
        company.setId(UUID.randomUUID().toString());
        company.setCreatedAt(new Date());
        Company savedCompany = companyRepo.save(company);
        return companyMapper.frmCompanyToDto(savedCompany);
    }

    @Override
    public CompanyDto GetCompanyById(String company_id) throws CompanyNotFoundException {
        Company company = companyRepo.findById(company_id).orElseThrow(() -> new CompanyNotFoundException("Company id doesn't exist") );
        if(company==null) throw new CompanyNotFoundException("Company id doesn't exist");
        return companyMapper.frmCompanyToDto(company);
    }

    @Override
    public List<CompanyDto> FilterCompanyByName(String kw) {
        List<CompanyDto> companyDtos= companyRepo.filterCompanyByName(kw).stream().map(company -> {
            return companyMapper.frmCompanyToDto(company);
        }).collect(Collectors.toList());
        return companyDtos;
    }
    @Override
    public PageableCompanyDTO listCompanies(String companyName, int size, int page) {
        Page<Company> companyPage;
        if(companyName.equals("")){
            companyPage = companyRepo.findByOrderByCreatedAt( PageRequest.of(page, size));
        }
        else {
            companyPage = companyRepo.filterCompanyByName(companyName, PageRequest.of(page, size));
        }
        List<CompanyDto> companyDtos = companyPage.getContent().stream().map(company -> {
            return companyMapper.frmCompanyToDto(company);
        }).collect(Collectors.toList());
        PageableCompanyDTO pageableCompanyDTO = PageableCompanyDTO.builder()
                .currentPage(page)
                .totalPages(companyPage.getTotalPages())
                .pageSize(size)
                .companyDTOs(companyDtos)
                .build();

        return pageableCompanyDTO;
    }

    @Override
    public List<CurrencyCountry> getAllCountries() {
        return currencyCountryRepo.findAll();
    }

    @Override
    public List<CurrencyCountry> getCurrencyByCountry(String country) {
        return currencyCountryRepo.findByCountry(country);
    }

    @Override
    public CompanyDto updateCompany(CompanyDto companyDto) throws CompanyNotFoundException {
        Company company = companyRepo.findById(companyDto.getId()).orElseThrow(() ->
                new CompanyNotFoundException("Company id " + companyDto.getId() + " not found")
        );

        company.setName(companyDto.getName());
        company.setAddress(companyDto.getAddress());
        company.setCountry(companyDto.getCountry());
        company.setContact(companyDto.getContact());
        company.setEmail(companyDto.getEmail());
        company.setWebSiteLink(companyDto.getWebSiteLink());
        company.setSector(companyDto.getSector());
        company.setInformations(companyDto.getInformations());
        company.setCreatedAt(new Date());

        Company updatedCompany = companyRepo.save(company);

        return companyMapper.frmCompanyToDto(updatedCompany);
    }
}
