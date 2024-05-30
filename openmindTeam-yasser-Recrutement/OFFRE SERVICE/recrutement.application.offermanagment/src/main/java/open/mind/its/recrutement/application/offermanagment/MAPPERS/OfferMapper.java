package open.mind.its.recrutement.application.offermanagment.MAPPERS;

import open.mind.its.recrutement.application.offermanagment.DTOS.OfferDto;
import open.mind.its.recrutement.application.offermanagment.ENTITIES.Offer;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class OfferMapper {

    public OfferDto frmOfferToDto(Offer offer){
        OfferDto offerDto = new OfferDto();
        BeanUtils.copyProperties(offer,offerDto);
        return  offerDto;
    }
    public Offer frmOfferDtoToOffer(OfferDto offerDto){
        Offer offer = new Offer();
        BeanUtils.copyProperties(offerDto,offer);
        return  offer;
    }
}
