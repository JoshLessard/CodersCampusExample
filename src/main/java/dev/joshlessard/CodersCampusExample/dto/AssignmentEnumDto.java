package dev.joshlessard.CodersCampusExample.dto;

import dev.joshlessard.CodersCampusExample.enums.AssignmentEnum;

public class AssignmentEnumDto {

    private String assignmentName;
    private int assignmentNumber;

    private AssignmentEnumDto( String assignmentName, int assignmentNumber ) {
        this.assignmentName = assignmentName;
        this.assignmentNumber = assignmentNumber;
    }

    public static AssignmentEnumDto from( AssignmentEnum assignmentEnum ) {
        return new AssignmentEnumDto( assignmentEnum.assignmentName(), assignmentEnum.assignmentNumber() );
    }

    public String getAssignmentName() {
        return assignmentName;
    }

    public int getAssignmentNumber() {
        return assignmentNumber;
    }
}
