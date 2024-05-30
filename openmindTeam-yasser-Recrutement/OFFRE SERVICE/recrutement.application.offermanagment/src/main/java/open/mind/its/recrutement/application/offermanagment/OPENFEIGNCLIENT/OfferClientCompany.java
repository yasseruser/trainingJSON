package open.mind.its.recrutement.application.offermanagment.OPENFEIGNCLIENT;

import open.mind.its.recrutement.application.offermanagment.DTOS.CompanyDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "COMPANYSERVICE")
public interface OfferClientCompany {
    @GetMapping("/company/{company_id}")
    CompanyDto getCompany(@PathVariable String company_id);
}
