package dev.joshlessard.CodersCampusExample.dto;

import dev.joshlessard.CodersCampusExample.enums.AssignmentStatusEnum;

public class AssignmentStatusDto {

    private final String status;
    private final int step;

    private AssignmentStatusDto( String status, int step ) {
        this.status = status;
        this.step = step;
    }

    public static AssignmentStatusDto from( AssignmentStatusEnum statusEnum ) {
        return new AssignmentStatusDto( statusEnum.status(), statusEnum.step() );
    }

    public String getStatus() {
        return status;
    }

    public int getStep() {
        return step;
    }
}
