package open.mind.its.recruitement.application.companymanagment.REPO;

import open.mind.its.recruitement.application.companymanagment.ENTITIES.CurrencyCountry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CurrencyCountryRepo extends JpaRepository<CurrencyCountry,String> {
    List<CurrencyCountry> findByCountry(String country);
}
