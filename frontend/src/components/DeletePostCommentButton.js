import React from 'react'
import { useDispatch } from 'react-redux';
import { deletePostComment } from '../actions/postAction';

export default function DeletePostCommentButton(props) {


    const dispatch = useDispatch();

    
    const {postId, pc} = props;

    const commentId = pc._id
    const deletePostCommentHandler = () =>{
        if(window.confirm('ARE YOU SURE? IT CANNOT BE UNDONE'))
        {
            dispatch(deletePostComment(postId, commentId));
            window.location.reload();
        }
    }

    return (
        <div>
            <button className="primary" onClick={deletePostCommentHandler}><i className="fa fa-trash"></i>DELETE</button>
        </div>
    )
}
