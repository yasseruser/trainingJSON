package open.mind.its.recruitment.application.personemanagment.DTOS;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageableValidatorDTO {
    private int currentPage;
    private int totalPages;
    private int pageSize;
    List<ValidatorDto> validatorDtos;
}
