package dev.joshlessard.CodersCampusExample.dto;

import java.util.Arrays;
import java.util.List;

import dev.joshlessard.CodersCampusExample.domain.Assignment;
import dev.joshlessard.CodersCampusExample.enums.AssignmentEnum;

public class AssignmentResponseDto {

    private Assignment assignment;

    public AssignmentResponseDto( Assignment assignment ) {
        this.assignment = assignment;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public List<AssignmentEnumDto> getAssignmentEnums() {
        return Arrays.stream( AssignmentEnum.values() )
            .map( AssignmentEnumDto::from )
            .toList();
    }
}
