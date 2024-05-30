package open.mind.its.recruitment.application.personemanagment.DTOS;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageableCandidateDTO {
    private int currentPage;
    private int totalPages;
    private int pageSize;
    List<CandidateDto> candidateDTOs;
}