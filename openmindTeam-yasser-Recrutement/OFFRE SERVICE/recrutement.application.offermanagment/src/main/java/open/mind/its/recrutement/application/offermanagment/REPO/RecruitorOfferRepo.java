package open.mind.its.recrutement.application.offermanagment.REPO;

import open.mind.its.recrutement.application.offermanagment.ENTITIES.RecruitorOffer;
import open.mind.its.recrutement.application.offermanagment.ENTITIES.ValidatorOffer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitorOfferRepo extends JpaRepository<RecruitorOffer,String> {
    List<RecruitorOffer> findByOfferId(String offerId);
    Page<RecruitorOffer> findByRecruitorIdOrderByCreatedatDesc(String recruitorId,Pageable pageable);


}
