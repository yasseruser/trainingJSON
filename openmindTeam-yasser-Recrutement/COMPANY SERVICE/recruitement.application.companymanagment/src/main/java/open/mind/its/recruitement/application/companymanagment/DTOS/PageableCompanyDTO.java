package open.mind.its.recruitement.application.companymanagment.DTOS;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageableCompanyDTO {
    private int currentPage;
    private int totalPages;
    private int pageSize;
    List<CompanyDto> companyDTOs;
}
