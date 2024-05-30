package open.mind.its.recrutement.application.offermanagment.DTOS;

import lombok.*;

import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class PageableValidatorsOfferDto {
    private int currentPage;
    private int totalPages;
    private int pageSize;
    private Collection<ValidatorDto> validatorDtos;
}
