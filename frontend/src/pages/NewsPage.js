import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listOfPostsInHome } from '../actions/postAction';
import Editor from 'rich-markdown-editor';

export default function NewsPage() {
    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo, loading, error} = userSignin;

    const homePostList = useSelector((state)=>state.homePostList);
    const {loading: loadingPosts, error: errorPosts, posts} = homePostList;

    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(listOfPostsInHome());
    }, [dispatch])
    
    return (
        <div>
            <div className='row center' style={{padding: "5vh"}}>
                THÔNG BÁO
            </div>
            <div>
                {posts &&
                    posts.map((p)=>(
                        <div className='row center'><Editor
                            className='Editor'
                            placeholder='Nội dung'
                            required={true}
                            defaultValue={p.content}
                            readOnly={true}
                        /></div>  
                    )) 
                }
            </div>
        </div>
    )
}
