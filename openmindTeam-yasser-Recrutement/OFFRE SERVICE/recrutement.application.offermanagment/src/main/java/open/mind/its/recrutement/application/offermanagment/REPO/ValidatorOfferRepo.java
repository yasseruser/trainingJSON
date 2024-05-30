package open.mind.its.recrutement.application.offermanagment.REPO;

import open.mind.its.recrutement.application.offermanagment.ENTITIES.ValidatorOffer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ValidatorOfferRepo extends JpaRepository<ValidatorOffer,String> {
    void deleteByOfferid(String offerId);
    List<ValidatorOffer> findByOfferid(String offerId);
    List<ValidatorOffer> findByValidatorid(String validatorId);

    List<ValidatorOffer> findByOfferidAndValidatorid(String offerid,String validatorid);
    Page<ValidatorOffer> findAllByOrderByCreatedatDesc(Pageable pageable);
    Page<ValidatorOffer> findByValidatoridOrderByCreatedatDesc(String validatorId,Pageable pageable);


}
