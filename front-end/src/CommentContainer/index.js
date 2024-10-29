import React, { useEffect, useState } from 'react';
import ajax from '../Services/fetchService';
import { useUser } from '../UserProvider';
import { Button } from 'react-bootstrap';
import Comment from '../Comment';
import { useInterval } from '../util/useInterval';
import dayjs from 'dayjs';

const CommentContainer = (props) => {

    const {assignmentId} = props;
    const user = useUser();
    const [comment, setComment] = useState( {
        id: null,
        text: ""
    } );
    const [comments, setComments] = useState( [] );

    useEffect( () => {
        ajax( `/api/comments?assignmentId=${assignmentId}`, "GET", user.jwt )
            .then( commentData => setComments( commentData ) );
    }, [] );

    useInterval( () => {
        updateCommentTimeDisplay();
    }, 1000 * 5 );

    function updateCommentText( newText ) {
        const updatedComment = {...comment};
        updatedComment.text = newText;
        setComment( updatedComment );
    }

    function submitComment() {
        const commentToSubmit = {...comment};
        commentToSubmit.assignmentId = parseInt( assignmentId );
        if ( commentToSubmit.id ) {
            ajax( `/api/comments/${commentToSubmit.id}`, "PUT", user.jwt, commentToSubmit )
                .then( response => {
                    const commentsCopy = [...comments];
                    const index = commentsCopy.findIndex( c => c.id === response.id );
                    commentsCopy[index] = response;
                    setComments( commentsCopy );
                    clearComment();
                } )
        } else {
            ajax( '/api/comments', 'POST', user.jwt, commentToSubmit )
                .then( response => {
                    const commentsCopy = [...comments];
                    commentsCopy.push( response );
                    setComments( commentsCopy );
                    
                    clearComment();
                } );
        }
    }

    function clearComment() {
        const clearedComment = {...comment};
        clearedComment.id = null;
        clearedComment.text = "";
        setComment( clearedComment );
    }

    function updateCommentTimeDisplay() {
        const commentsCopy = [...comments];
        commentsCopy.forEach( comment => comment.createdDate = dayjs( comment.createdDate ) );
        setComments( commentsCopy );
    }

    function handleEditComment( commentId ) {
        const index = comments.findIndex( comment => comment.id === commentId )
        const commentCopy = {
            id: comments[index].id,
            text: comments[index].text
        }
        setComment( commentCopy );
    }

    function handleDeleteComment( commentId ) {
        ajax( `/api/comments/${commentId}`, "DELETE", user.jwt )
            .then( response => {
                const commentsCopy = [...comments];
                const index = commentsCopy.findIndex( c => c.id === commentId );
                commentsCopy.splice( index, 1 );
                setComments( commentsCopy );
            } );
    }

    return (
        <>
            <div className="mt-5">
                <textarea
                    style={{width: "100%"}}
                    onChange={ e => updateCommentText( e.target.value ) }
                    value={comment.text}
                />
                <Button onClick={() => submitComment( comment )}>Post Comment</Button>
            </div>

            <div className="mt-5">
                {comments.map( comment => (
                    <Comment
                        key={comment.id}
                        commentData={comment}
                        emitEditComment={handleEditComment}
                        emitDeleteComment={handleDeleteComment}
                    />
                ))}
            </div>
        </>
    );
}

export default CommentContainer;