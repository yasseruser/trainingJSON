package open.mind.its.recruitment.application.personemanagment.DTOS;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class PageableRecruitorDTO {
    private int currentPage;
    private int totalPages;
    private int pageSize;
    List<RecruitorDto> recruitorDtos;
}
