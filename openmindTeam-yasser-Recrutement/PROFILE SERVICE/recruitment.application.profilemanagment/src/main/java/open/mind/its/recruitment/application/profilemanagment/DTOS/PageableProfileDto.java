package open.mind.its.recruitment.application.profilemanagment.DTOS;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class PageableProfileDto {
    private int currentPage;
    private int totalPages;
    private int pageSize;
    private List<ProfileDto> profileDtos;
}
