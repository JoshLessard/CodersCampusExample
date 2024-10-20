import React from 'react';
import { useUser } from '../UserProvider';
import { jwtDecode } from 'jwt-decode';

const Comment = (props) => {
    const user = useUser();
    const decodedJwt = jwtDecode( user.jwt );
    const {id, createdDate, author, authorUsername, text, emitEditComment, emitDeleteComment} = props;
    return (
        <div className="comment-bubble">
            <div className="d-flex gap-5" style={{ fontWeight: "bold" }}>
                <div>{`${author}`}</div>
                {
                    decodedJwt.sub === authorUsername
                        ?
                            <>
                                <div
                                    onClick={ () => emitEditComment( id ) }
                                    style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                    edit
                                </div>
                                <div
                                    onClick={ () => emitDeleteComment( id ) }
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
            <div>{text}</div>
        </div>
    )
};

export default Comment;