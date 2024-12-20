package dev.joshlessard.CodersCampusExample.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat( shape = JsonFormat.Shape.OBJECT )
public enum AssignmentStatusEnum {

    PENDING_SUBMISSION( "Pending Submission", 1 ),
    SUBMITTED( "Submitted", 2 ),
    IN_REVIEW( "In Review", 3 ),
    NEEDS_UPDATE( "Needs Update", 4 ),
    COMPLETED( "Completed", 5 ),
    RESUBMITTED( "Resubmitted", 6 );

    private final String status;
    private final int step;

    AssignmentStatusEnum( String status, int step ) {
        this.status = status;
        this.step = step;
    }

    public String status() {
        return status;
    }

    public int step() {
        return step;
    }
}
