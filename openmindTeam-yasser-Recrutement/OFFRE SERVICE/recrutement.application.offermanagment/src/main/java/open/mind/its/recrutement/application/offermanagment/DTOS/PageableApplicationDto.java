package open.mind.its.recrutement.application.offermanagment.DTOS;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageableApplicationDto {
    private int currentPage;
    private int totalPages;
    private int pageSize;
    List<ApplicationDto> applicationDtos;

}
