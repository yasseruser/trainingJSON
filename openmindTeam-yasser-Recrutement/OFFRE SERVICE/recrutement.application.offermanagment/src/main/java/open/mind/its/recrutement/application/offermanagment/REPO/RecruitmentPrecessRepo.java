package open.mind.its.recrutement.application.offermanagment.REPO;

import feign.Param;
import open.mind.its.recrutement.application.offermanagment.ENTITIES.Offer;
import open.mind.its.recrutement.application.offermanagment.ENTITIES.RecruitmentProcess;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitmentPrecessRepo  extends JpaRepository<RecruitmentProcess,String> {
    //List<RecruitmentProcess> findByOfferid(String offerId);
    void deleteByOfferid(String offerId);
    Page<RecruitmentProcess> findByOfferid(String offerid,Pageable pageable);
    RecruitmentProcess findByOfferidAndProfileid(String offerid,String profileid);

    Page<RecruitmentProcess> findByOfferidAndValidatedByRecruitorAndValidatedByValidatorOrderByCreatedAtDesc(String offerid, boolean validatedByRecruitor,boolean validatedByValidator, Pageable pageable);
    @Query("select c from RecruitmentProcess c where c.offerid = :idoffer and c.tag like %:kw% and c.validatedByRecruitor = :boolr and c.validatedByValidator = :boolv")
    Page<RecruitmentProcess> filterApplicationsByTag(@Param("idoffer") String idoffer, @Param("kw") String kw, @Param("boolr") Boolean boolr, @Param("boolv") Boolean boolv, Pageable pageable);

    Page<RecruitmentProcess> findByProfileid(String profileid,Pageable pageable);
}
