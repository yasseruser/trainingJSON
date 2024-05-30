package open.mind.its.recrutement.application.offermanagment.REPO;

import feign.Param;
import open.mind.its.recrutement.application.offermanagment.ENTITIES.Offer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepo extends JpaRepository<Offer,String> {
    Page<Offer> findByCompanyid(String company_id, Pageable pageable);
    Page<Offer> findAllByOrderByCreatedatDesc(Pageable pageable);
    @Query("select c from Offer c where c.offer_title like %:kw%")
    Page<Offer> filterOfferByTitle(@Param("kw") String kw, Pageable pageable);

}
