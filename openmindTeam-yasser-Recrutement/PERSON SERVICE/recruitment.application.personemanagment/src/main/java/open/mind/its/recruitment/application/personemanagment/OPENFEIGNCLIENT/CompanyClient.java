package open.mind.its.recruitment.application.personemanagment.OPENFEIGNCLIENT;

import open.mind.its.recruitment.application.personemanagment.DTOS.CompanyDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "COMPANYSERVICE")
public interface CompanyClient {
    @GetMapping("/company/{company_id}")
    CompanyDto getCompany(@PathVariable String company_id);
}
