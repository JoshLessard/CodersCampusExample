package dev.joshlessard.CodersCampusExample.dto;

import java.util.Arrays;
import java.util.List;

import dev.joshlessard.CodersCampusExample.domain.Assignment;
import dev.joshlessard.CodersCampusExample.enums.AssignmentEnum;
import dev.joshlessard.CodersCampusExample.enums.AssignmentStatusEnum;

public class AssignmentResponseDto {

    private Assignment assignment;
    private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();

    public AssignmentResponseDto( Assignment assignment ) {
        this.assignment = assignment;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public List<AssignmentEnumDto> getAssignmentEnums() {
        return Arrays.stream( AssignmentEnum.values () )
            .map( AssignmentEnumDto::from )
            .toList();
    }

    public List<AssignmentStatusDto> getStatusEnums() {
        return Arrays.stream( AssignmentStatusEnum.values() )
            .map( AssignmentStatusDto::from )
            .toList();
    }
}
