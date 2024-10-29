import React, { useEffect, useState } from 'react';
import { useUser } from '../UserProvider';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

const Comment = (props) => {
    const user = useUser();
    const decodedJwt = jwtDecode( user.jwt );
    const comment = props.commentData;
    const {emitEditComment, emitDeleteComment} = props;
    const [commentRelativeTime, setCommentRelativeTime] = useState( null );
    
    useEffect( () => {
        updateCommentRelativeTime();
    }, [comment.createdDate] );

    function updateCommentRelativeTime() {
        dayjs.extend( relativeTime );
        setCommentRelativeTime( dayjs( comment.createdDate ).fromNow() );
    }
    
    return (
        <>
            <div className="comment-bubble">
                <div className="d-flex gap-5" style={{ fontWeight: "bold" }}>
                    <div>{`${comment.author}`}</div>
                    {
                        decodedJwt.sub === comment.authorUsername
                            ?
                                <>
                                    <div
                                        onClick={ () => emitEditComment( comment.id ) }
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                    >
                                        edit
                                    </div>
                                    <div
                                        onClick={ () => emitDeleteComment( comment.id ) }
                                        style={{ cursor: 'pointer', color: 'red' }}
                                    >
                                        delete
                                    </div>
                                </>
                            :
                                <>
                                </>
                    }
                </div>
                <div>{comment.text}</div>
            </div>
            <div style={{ marginTop: "-1.25em", marginLeft: "1.4em", fontSize: "12px" }}>            
                {commentRelativeTime}
            </div>
        </>
    )
};

export default Comment;