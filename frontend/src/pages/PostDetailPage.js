import React, { useEffect, useRef, useState } from 'react';
import Linkify from 'react-linkify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listOfUsers } from '../actions/userAction';
import { addKeywordToPost, createPostComment, deletePost, detailsOfPost, editPost, listOfPosts, removeKeywordFromPost } from '../actions/postAction';
import DateComponent from '../components/DateComponent';
import DeletePostCommentButton from '../components/DeletePostCommentButton';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import CategoryIcon from '../components/CategoryIcon';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm'
// import marked from 'marked';
// import JoditEditor from "jodit-react";
import { listOfCategories } from '../actions/categoryAction';
import Editor from "rich-markdown-editor";

import Markdown from 'marked-react';

export default function PostDetailPage() {

    const params = useParams();
    const postId = params.id;

    const editor = useRef(null);
    const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}

    const categoryList = useSelector(state=>state.categoryList);
    const {loading: loadingCategory, error: errorCategory, categories} = categoryList;


    const postDetails = useSelector(state=>state.postDetails);
    const {loading, error, post} = postDetails;

    const postEditing = useSelector(state=>state.postEditing);
    const {loading: loadingEditing, error: errorEditing, success: successEditing} = postEditing;

    const [editPostStatus, setEditPostStatus] = useState(false);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const postDeleting = useSelector(state=>state.postDeleting);
    const {loading: loadingDeleting, error: errorDeleting, success: successDeleting} = postDeleting;

    const postCommentPosting = useSelector(state=>state.postCommentPosting);
    const {loading: loadingCommentPosting, error: errorCommentPosting, success: successPostingComment} = postCommentPosting;

    const postCommentDeleting = useSelector(state=>state.postCommentDeleting);
    const {loading: loadingCommentDeleting, error: errorCommentDeleting, success: successDeletingComment} = postCommentDeleting;

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    const userList = useSelector(state=>state.userList);
    const {loading: loadingUL, error: errorUL, users} = userList;

    const postList = useSelector(state=>state.postList);
    const {loading: loadingPost, error: errorPost, posts} = postList;

    const [replyContent, setReplyContent] = useState([]);
    const [editCommentStatus, setEditCommentStatus] = useState(false);

    const [commentId, setCommentId] = useState('');
    const [tagEditBox, showTagEditBox] = useState(true);
    const enableTagEditBox = () => {
        showTagEditBox(!tagEditBox);
    }
    const [keywordContent, setKeywordContent] = useState('');
    const addKeyword = () =>{
        dispatch(addKeywordToPost(postId, keywordContent));
        enableTagEditBox();
        window.location.reload()
    }
    const removeKeyword = () => {
        dispatch(removeKeywordFromPost(postId));
        window.location.reload()
    }

    const navigate = useNavigate();

    const editPostHandler = () =>{
        setTitle(post.title);
        setContent(post.content);
        setEditPostStatus(!editPostStatus);
        //dispatch(editPost());
    }

    const postSubmitingHandler = () =>{
        //alert(title+" "+content);
        dispatch(editPost(postId, title, content));
    }

    const deleteHandler = () =>{
        if(window.confirm('ARE YOU SURE? IT CANNOT BE UNDONE'))
        {
            dispatch(deletePost(postId));
        };
    }

    const commentPostingHandler = () =>{
        dispatch(createPostComment(postId, userInfo._id, replyContent));
    }

    const deleteCommentHandler = () =>{
        //dispatch();
        alert(commentId);
        //dispatch(deletePostComment(postId, commentId))
    }

    const commentEditingHandler = () =>{
        //dispatch();
    }


    // const editCommentActivate = () =>{
    //     setEditCommentStatus(!editCommentStatus);
    // }

    // const setTheCommentId = () =>{
    //     setCommentId();
    // }

    const scrollToTopHandler = () =>{
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
          });
    }

    const loadPost = (e) =>{
        navigate(`/forum/post/${e.currentTarget.value}`);
        // alert(e.currentTarget.value);
        dispatch(detailsOfPost(e.currentTarget.value));
    }


    const markdown = `{code .}
    `;
    

    const dispatch = useDispatch();

    useEffect(()=>{

        // window.scrollTo({
        //     top: 0, 
        //   });
        //alert(postId);
        //alert(editPost);
        dispatch(listOfPosts());
        dispatch(listOfUsers());
        dispatch(detailsOfPost(postId));
        dispatch(listOfCategories());
    }, [dispatch]);

    return (
        <div className='row left' style={{margin: 0}}>
        {/* <div className="row center cyan-background floatingDiv"> 
            <div>
                <Link to="/forum" className="linkButton">Quay về trang chủ diễn đàn</Link>
            </div>
        </div> */}
            
        <div className="floatingDiv">
            <button onClick={scrollToTopHandler}><i className="fa fa-arrow-up"></i></button>
        </div>
        
        <ul className="mobileNavBar">
            {
                loadingPost ? <LoadingBox></LoadingBox> : errorPost ? <MessageBox variant="error">{errorPost}</MessageBox> :
                posts && (
                    posts.map(p=>(
                        <li>
                            {
                            <button type="submit" className="row left primary" key={p._id} value={p._id} onClick={loadPost}>
                                <p>{p.title}</p>
                            </button>
                            }
                        </li>
                        
                    )
                ))
            }
        </ul>
        <div className='scroller'>
            {userInfo &&
                (userInfo.role==='admin' && post &&
                    (<div className="card card-body">
                        <input required={true} type="text" hidden={tagEditBox} className="tagInput basic-slide" onChange={(e)=>setKeywordContent(e.target.value)}></input>
                        <button className="admin block" onClick={addKeyword} hidden={tagEditBox}>THÊM</button>
                        <button className="admin block" onClick={enableTagEditBox}>
                            {tagEditBox ? <label>THÊM TAG</label> : <label>ĐÓNG</label>}
                        </button>
                    </div>))
            }
            {userInfo && (userInfo.role==='admin' ?
                (<div className="row">
                    <label className="bold-text">Keywords:</label> {post && post.keywords.map(tag=>(
                <div className="card"><div>{tag}<button style={{width: '50px', height: '50px', textAlign: 'center'}} onClick={removeKeyword} className="admin">x</button></div></div>
                    ))}
                </div>) : (
                    <div>
                        <label className="bold-text">Keywords:</label>  {post && post.keywords.map(tag=>(
                                    <label>{tag}, </label>
                                ))}
                    </div>
            ))}
            {loadingUL ? <LoadingBox></LoadingBox> : errorUL ? <MessageBox variant="error">{errorUL}</MessageBox> : (
            loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : 
            post &&(
            <div>
                <div className="row" >
                    <div className="col-2">
                        {
                            loadingEditing ? <LoadingBox></LoadingBox> : errorEditing ? <MessageBox variant="error">{errorEditing}</MessageBox> : 
                            successEditing && <MessageBox>Đã xóa bài đăng</MessageBox>
                        }
                        {
                            loadingDeleting ? <LoadingBox></LoadingBox> : errorDeleting ? <MessageBox variant="error">{errorDeleting}</MessageBox> : 
                            successDeleting && <MessageBox>Đã xóa bài đăng</MessageBox>
                        }
                        <div className="card card-body">
                            <div><CategoryIcon topicName = {post.topic}></CategoryIcon></div>
                            {users.map(u=>(u._id===post.user && ( u.role==='admin' ? (<h1 className=' user-name-display' title={u.name}>{u.name}<i className="fa fa-check" title="✓: Signature of Superiority/ Biểu tượng của sự thượng đẳng"></i></h1>) : (<h1 className=' user-name-display'><i className="fa fa-user"></i>{u.name}</h1>))))}
                        <div className="row left">
                            {post.createdAt === post.updatedAt ? <DateComponent passedDate={post.updatedAt}>Đăng vào: </DateComponent>
                            : <div>
                                <DateComponent passedDate={post.createdAt}>Đăng vào: </DateComponent>
                                (Đã sửa)
                            </div>}
                            {
                            userInfo && (userInfo._id === post.user && (
                                <div><button className="primary" onClick={editPostHandler}>{editPostStatus ? <><i className="fa fa-close"></i>ĐÓNG</> : <><i className="fa fa-edit"></i>SỬA</>}</button>
                                <button className="primary" onClick={deleteHandler}><i className="fa fa-trash" ></i>XÓA</button></div>))
                            }
                            {
                            userInfo && (userInfo._id !== post.user && userInfo.role==='admin' && (
                                <div>
                                    <button className="admin" onClick={deleteHandler}><i className="fa fa-trash" ></i>XÓA</button>
                                </div>))
                            }
                        </div>
                        {
                            editPostStatus && (<form className="editPostForm" onSubmit={postSubmitingHandler}>
                                            <div>
                                                <input placeholder="Tiêu đề" className="basic-slide" required={true} type="text" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                                            </div>
                                            <div>
                                                {/* <textarea placeholder="Nội dung" className="basic-slide" required={true} value={content} type="textarea" onChange={(e)=> setContent(e.target.value)}>
                                                </textarea> */}
                                                <Editor
                                                    defaultValue=""
                                                    onChange={(value) => setContent(value)}
                                                    className='Editor'
                                                    placeholder='Nội dung'
                                                    required={true}
                                                    defaultValue={content}
                                                />
                                            </div>
                                            <div><button className="primary">ĐĂNG</button></div>
                                        </form>)
                        }
                        {
                            !editPostStatus && (
                                <div className="content">
                                    <h1>{post.title}</h1>
                                    {/* <p><Linkify>{post.content}</Linkify></p> */}
                                    {/* <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} ></ReactMarkdown> */}
                                    {/* <ReactMarkdown children={post.content} />  */}
                                    {/* <div dangerouslySetInnerHTML={getMarkdownText()} />; */}
                                    {/* remarkPlugins={[remarkGfm]} causes memory leaks*/}
                                    {/* <Markdown>{post.content}</Markdown> */}
                                    {/* <JoditEditor
                                        ref={editor}
                                        value={post.content}
                                        tabIndex={1} // tabIndex of textarea
                                    /> */}
                                    {/* <Markdown>{markdown}</Markdown> */}
                                    <Editor
                                        defaultValue={post.content}
                                        className='Editor'
                                        placeholder='Nội dung'
                                        required={true}
                                        readOnly={true}
                                    /> 
                                </div>
                            )
                        }
                        
                            
                        </div>
                    
                        
                    </div>
                    {/* <div className="col-1">
                        {
                            loadingCommentPosting ? <LoadingBox></LoadingBox> : errorCommentPosting ? <MessageBox variant="error"></MessageBox> :
                            successPostingComment && <MessageBox>ĐÃ ĐĂNG BÌNH LUẬN</MessageBox>
                        }
                        {userInfo ? (<form className="editPostForm" onSubmit={commentPostingHandler}>
                            <div className="row center">Phản hồi dưới tên <label className="bold-text">{userInfo.name}</label></div>
                            <div>
                                <textarea placeholder="Nội dung" className="basic-slide" required={true} value={replyContent} type="textarea" onChange={(e)=> setReplyContent(e.target.value)}>
                                </textarea>
                            </div>
                            <div><button className="primary">PHẢN HỒI</button></div>
                        </form>) : (
                            <MessageBox><Link to={`/signin?redirect=forum/post/${postId}`}>Đăng nhập</Link>để tham gia trò chuyện</MessageBox>
                        )}
                    </div>  */}   
                </div> 
            {/* <div className="row">
                <div className="col-2">
                {
                    loadingCommentDeleting ? <LoadingBox></LoadingBox> : errorCommentDeleting ? <MessageBox variant="error">{errorCommentDeleting}</MessageBox>
                    : successDeletingComment && <MessageBox>ĐÃ XÓA BÌNH LUẬN</MessageBox>
                }
                {
                    <div className="card card-body">
                        <h1>
                            
                            {post.postComments.length>1 && <div><i className="fa fa-comment"></i>
                                {post.postComments.length} phản hồi
                            </div>}
                        </h1>
                    </div>
                }
                {
                    post.postComments.map(pc=>(
                        <div>
                            
                            {userInfo && userInfo._id===pc.commenter && (
                                <div className="card card-body ">
                                    {!editCommentStatus ? (
                                    <div className="row">
                                        <div className="col-0">
                                            <h1>{userInfo.name}</h1>
                                            <DateComponent passedDate={pc.createdAt}>Phản hồi vào: </DateComponent>
                                        </div>
                                        <div className="col-2">
                                            <div className="content">
                                                <p><Linkify>{pc.content}</Linkify></p>
                                            </div>
                                        </div>
                                </div>) : 
                                    (
                                        <form className="editPostForm" onSubmit={commentEditingHandler}>
                                            <div>
                                                <textarea placeholder="Nội dung" className="basic-slide" required={true} value={replyContent} type="textarea" onChange={(e)=> setReplyContent(e.target.value)}>
                                                </textarea>
                                            </div>
                                            <div><button className="primary">PHẢN HỒI</button></div>
                                        </form>
                                    )}
                                    <DeletePostCommentButton postId = {postId} pc = {pc}></DeletePostCommentButton>
                                </div>)
                            }
                                
                            {
                                userInfo && userInfo._id !== pc.commenter && (
                                    <div className="card card-body ">
                                        {users.map(u=>(
                                            u._id===pc.commenter && (
                                            <div className="row">
                                                <div className="col-0">
                                                    <h1>{u.name}</h1>
                                                </div>
                                                <div className="col-2">
                                                    <div className="content">
                                                        <p><Linkify>{pc.content}</Linkify></p>
                                                    </div>
                                                </div>
                                            </div>
                                        )))}
                                        <DateComponent passedDate={pc.createdAt}>Phản hồi vào: </DateComponent>
                                    </div>
                                )
                            }
                            {
                                !userInfo && (
                                    <div className="card card-body ">
                                        {users.map(u=>(
                                            u._id===pc.commenter && (
                                            <div className="row">
                                                <div className="col-0">
                                                    <h1>{u.name}</h1>
                                                </div>
                                                <div className="col-2">
                                                    <div className="content">
                                                        <p><Linkify>{pc.content}</Linkify></p>
                                                    </div>
                                                </div>
                                            </div>
                                        )))}
                                        
                                        
                                        <DateComponent passedDate={pc.createdAt}>Phản hồi vào: </DateComponent>
                                    </div>
                                )
                            }
                        </div>
                    ))
                }</div>
            </div> */}
            </div>
            
            ))}
            
        </div>
        </div>
    )
}
