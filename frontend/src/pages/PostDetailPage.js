import React, { useEffect, useRef, useState } from 'react';
import Linkify from 'react-linkify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { detailsOfUser, listOfUsers } from '../actions/userAction';
import { addKeywordToPost, createPostComment, deletePost, detailsOfPost, editPost, listOfNestedPosts, listOfPosts, listOfPostsByCat, listOfRelatedPosts, pinPostToHome, removeKeywordFromPost } from '../actions/postAction';
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
import Select from "react-dropdown-select";
import { CATEGORY_LIST_RESET } from '../constants/categoryConst';

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
    const [category, setCategory] = useState('');

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

    const nestedPostList = useSelector(state=>state.nestedPostList);
    const {loading: loadingNested, error: errorNested, nestedPosts} = nestedPostList;

    const relatedPostList = useSelector(state=>state.relatedPostList);
    const {loading: loadingRelated, error: errorRelated, relatedPosts} = relatedPostList;

    const postByCatList = useSelector(state=>state.postByCatList);
    const {loading: loadingPostsByCat, error: errorPostsByCat, postsByCat} = postByCatList;

    const userDetail = useSelector(state => state.userDetail);
    const {loading: loadingUser, error: errorUser, user} = userDetail;

    const [replyContent, setReplyContent] = useState([]);
    const [editCommentStatus, setEditCommentStatus] = useState(false);

    const [commentId, setCommentId] = useState('');
    const [tagEditBox, showTagEditBox] = useState(true);
    const enableTagEditBox = () => {
        showTagEditBox(!tagEditBox);
    }
    const [keywordContent, setKeywordContent] = useState('');
    const addKeyword = () =>{
        //alert(postId+" "+keywordContent);
        if(keywordContent!==""){
            dispatch(addKeywordToPost(postId, keywordContent));
            window.location.reload()
        }else{
            alert('Chưa nhập gì kìa!!! BRUH');
        }
    }
    const removeKeyword = (e) => {
        dispatch(removeKeywordFromPost(postId, e.currentTarget.value));
        window.location.reload();
    }

    const navigate = useNavigate();

    const editPostHandler = () =>{
        setTitle(post.title);
        setContent(post.content);
        setEditPostStatus(!editPostStatus);
        setCategory(post.category);
        //dispatch(editPost());
    }

    const postSubmitingHandler = () =>{
        // alert(title+" "+content);
        dispatch(editPost(postId, title, content, category));
    }

    const deleteHandler = () =>{
        if(window.confirm('BẠN CÓ CHẮC MUỐN XÓA BÀI VIẾT NÀY?'))
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

    const scrollToBottomHandler = () =>{
        window.scrollTo({
            left: 0, 
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
    }

    const loadPost = (e) =>{
        navigate(`/forum/post/${e.currentTarget.value}`);
        // alert(e.currentTarget.value);
        dispatch(detailsOfPost(e.currentTarget.value));
        dispatch(listOfNestedPosts(e.currentTarget.value));
        dispatch(listOfRelatedPosts(e.currentTarget.value));
    }

    const loadPostByCat = (e) =>{
        dispatch(listOfPostsByCat(e.currentTarget.value));
    }


    const markdown = `{code .}
    `;
    

    const dispatch = useDispatch();

    const setValuesForCategory = (selectedValues) => {
        // alert(JSON.stringify(selectedValues[0].value));
        setCategory(selectedValues[0].value);
        // alert(category);
    }

    const categoryMissingWarn = () =>{
        alert("Chủ đề không được bỏ trống");
    }

    const navigateToProfile = (id) => {
        const path = `/user/${id}`;
        navigate(path);
    }

    const pin = () =>{
        alert("pinned")
    }

    const pinToHome = (id) => {
        dispatch(pinPostToHome(id));
    }
    
    useEffect(()=>{
        if(userInfo){
            dispatch(detailsOfUser(userInfo._id))
        }
        window.scrollTo({
            top: 0, 
          });
        //alert(postId);
        //alert(editPost);
        dispatch({type: CATEGORY_LIST_RESET});
        dispatch(listOfPosts());
        dispatch(listOfUsers());
        dispatch(detailsOfPost(postId));
        dispatch(listOfCategories());
        dispatch(listOfNestedPosts(postId));
        dispatch(listOfRelatedPosts(postId));
        
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
        <div className="floatingDiv down">
            <button onClick={scrollToBottomHandler}><i className="fa fa-arrow-down"></i></button>
        </div>
        
        {/* <ul className="mobileNavBar">
            {
                loadingCategory ? <LoadingBox></LoadingBox> : errorCategory ? <MessageBox variant="error">{errorCategory}</MessageBox> :
                categories && (
                    categories.map(p=>(
                        <li key={p._id}>
                            {
                            <div>
                                <button type="submit" className="row left textButton" key={p._id} value={p._id} onClick={loadPostByCat}>
                                    
                                    <p>{p.name}</p>    
                                </button>
                                {
                                    loadingPostsByCat ? <LoadingBox></LoadingBox> : errorPostsByCat ? <MessageBox variant="error">{errorPostsByCat}</MessageBox> : 
                                    postsByCat && (
                                        postsByCat.map(pbc => (
                                            pbc.category === p._id &&
                                        <div className='row right'>
                                            <button type="submit" style={{width: '80%'}} className="child row" key={pbc._id} value={pbc._id} onClick={loadPost}>
                                        
                                                <p>{pbc.title}</p>    
                                            </button>
                                        </div>
                                    )))
                                }
                            </div>
                            }
                        </li> 
                    )
                ))
            }
            
        </ul> */}
            {loadingUL ? <LoadingBox></LoadingBox> : errorUL ? <MessageBox variant="error">{errorUL}</MessageBox> : (
            loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : 
            post &&(
            <div className="row">
                
                <div className="col-2">
                    <div>
                        {userInfo &&
                            (userInfo.role==='user' || userInfo.role==='admin' && post &&
                                (<div className="card card-body">
                                    <input required={true} type="text" hidden={tagEditBox} className="tagInput basic-slide" onChange={(e)=>setKeywordContent(e.target.value)} placeholder='Thêm từ khóa ở đây (Mỗi từ cách nhau bởi dấu phẩy)'></input>
                                    <button className="admin block" onClick={addKeyword} hidden={tagEditBox}>THÊM</button>
                                    <button className="admin block" onClick={enableTagEditBox}>
                                        {tagEditBox ? <label>THÊM TỪ KHÓA</label> : <label>ĐÓNG</label>}
                                    </button>
                                </div>))
                        }
                        {userInfo && (userInfo.role==='user' || userInfo.role==='admin' ?
                            (<div className="row center">
                                <label className="bold-text">Từ khóa:</label> {post && post.keywords.map(keyword=>(
                            <div className="card"><div>{keyword}<button value={keyword} style={{width: '50px', height: '50px', textAlign: 'center'}} onClick={removeKeyword} className="admin">x</button></div></div>
                                ))}
                            </div>) : (
                                <div className='row center'>
                                    <label className="bold-text">Từ khóa:</label>  {post && post.keywords.map(keyword=>(
                                                <label>{keyword}, </label>
                                            ))}
                                </div>
                        ))}
                        </div>
                        {
                            loadingEditing ? <LoadingBox></LoadingBox> : errorEditing ? <MessageBox variant="error">{errorEditing}</MessageBox> : 
                            successEditing && <MessageBox>Đã xóa bài viết</MessageBox>
                        }
                        {
                            loadingDeleting ? <LoadingBox></LoadingBox> : errorDeleting ? <MessageBox variant="error">{errorDeleting}</MessageBox> : 
                            successDeleting && <MessageBox>Đã xóa bài viết</MessageBox>
                        }
                        <div className="card card-body postDetail">
                            <div><CategoryIcon topicName = {post.topic}></CategoryIcon></div>
                            {users.map(u=>(u._id===post.user && ( u.role==='admin' ? (
                            <div><div className='interactiveUsername' onClick={()=>navigateToProfile(u._id)} title={u.name}><span className='avatarSquare'>{u.username[0]}</span>{u.name}<i className="fa fa-check" title="✓: Signature of Superiority/ Biểu tượng của sự thượng đẳng"></i></div>
                                <div className="userHoverInfo" style={u ? u.backgroundImage ? {background: `url("${u.backgroundImage}")`, backgroundSize: 'cover'} : {backgroundColor: "#04374b"} : {backgroundColor: "#04374b"}}>
                                <h1>{u.role==="user"&&<i className='fa fa-user'></i>}{u.username}{u.role==="admin"&&<i className='fa fa-check'></i>}</h1>
                                <div className='row center userHoverInfoContent'>
                                    <div className=''>
                                        <div className='row left'>{u.name}</div>
                                    </div>
                                    <div className='col-2'>
                                        {u.gender==="Nam" ? <div className='row left'><i className='fa fa-mars'/>{u.gender}</div> : 
                                            u.gender==="Nữ" ? <div className='row left'><i className='fa fa-venus'/>{u.gender}</div> :
                                            u.gender==="Khác" && <div className='row left'><i className='fa fa-intersex'/>{u.gender}</div>
                                        }
                                        <div className='row left'><i className='fas fa-brain'></i>{u.mood ? u.mood : "Tâm trạng không rõ"}</div>
                                        <div className='row left'><i className='fa fa-birthday-cake'></i>{<DateComponent passedDate={u.dob} isbirthDate={true}></DateComponent>} </div>
                                    </div>
                                </div>
                            </div>
                            </div>) : (<div><div className='interactiveUsername' onClick={()=>navigateToProfile(u._id)}><span className='avatarSquare'>{u.username[0]}</span>{u.name}</div>
                            <div className="userHoverInfo" style={u ? u.backgroundImage ? {background: `url("${u.backgroundImage}")`, backgroundSize: 'cover'} : {backgroundColor: "#04374b"} : {backgroundColor: "#04374b"}}>
                                <h1>{u.role==="user"&&<i className='fa fa-user'></i>}{u.username}{u.role==="admin"&&<i className='fa fa-check'></i>}</h1>
                                <div className='row center userHoverInfoContent'>
                                    <div className=''>
                                        <div className='row left'>{u.name}</div>
                                    </div>
                                    <div className='col-2'>
                                        {u.gender==="Nam" ? <div className='row left'><i className='fa fa-mars'/>{u.gender}</div> : 
                                            u.gender==="Nữ" ? <div className='row left'><i className='fa fa-venus'/>{u.gender}</div> :
                                            u.gender==="Khác" && <div className='row left'><i className='fa fa-intersex'/>{u.gender}</div>
                                        }
                                        <div className='row left'><i className='fas fa-brain'></i>{u.mood ? u.mood : "Tâm trạng không rõ"}</div>
                                        <div className='row left'><i className='fa fa-birthday-cake'></i>{<DateComponent passedDate={u.dob} isbirthDate={true}></DateComponent>} </div>
                                    </div>
                                </div>
                            </div>
                            </div>))))}
                            
                        <div className="row left">
                            {post.createdAt === post.updatedAt ? <DateComponent passedDate={post.updatedAt}>Đăng vào: </DateComponent>
                            : <div>
                                <DateComponent passedDate={post.createdAt}>Đăng vào: </DateComponent>
                                (Đã sửa)
                            </div>}
                            {
                            userInfo && (userInfo._id === post.user && (
                                <div><button className="admin" onClick={editPostHandler}>{editPostStatus ? <><i className="fa fa-close"></i>ĐÓNG</> : <><i className="fa fa-edit"></i>SỬA</>}</button>
                                <button className="admin" onClick={deleteHandler}><i className="fa fa-trash" ></i>XÓA</button></div>))
                            }
                            {
                            userInfo && (userInfo._id !== post.user && userInfo.role==='admin' && (
                                <div>
                                    <button className="admin" onClick={deleteHandler}><i className="fa fa-trash" ></i>XÓA</button>
                                </div>))
                            }
                        </div>
                        {
                            editPostStatus && (
                            <div>
                                <div className='row center'>{
                                    userInfo.role==='user' || userInfo.role==='admin' &&
                                    <Select style={{width: '60rem'}} dropdownHeight="10rem" placeholder={categories.map((cat)=>cat._id===category && cat.name)} options={categories.map(ca=>({value: ca._id, label: ca.name}))} onChange={values => setValuesForCategory(values)} required={true}/>
                                    
                                }</div>    
                                        <form className="editPostForm" onSubmit={postSubmitingHandler}>
                                            <div>
                                                <input placeholder="Tiêu đề" className="basic-slide" required={true} type="text" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                                            </div>
                                            <div>
                                                {/* <textarea placeholder="Nội dung" className="basic-slide" required={true} value={content} type="textarea" onChange={(e)=> setContent(e.target.value)}>
                                                </textarea> */}
                                                {/* <div>
                                                    <div className='box'><select className="category" required={true} onChange={(e)=> setCategory(e.target.value)}>
                                                        <option value="" hidden>Chọn chủ đề</option>
                                                        {   userInfo.role==='user' || userInfo.role==='admin' &&
                                                            categories && posts && categories.concat(posts).map(ca=>(
                                                                ca.name ? <option value={ca._id}>{ca.name}</option> :
                                                                <option value={ca._id}>{ca.title}</option>
                                                            ))
                                                        }
                                                        {   userInfo.role==='user' || userInfo.role==='admin' &&
                                                            categories && categories.map(ca=>(
                                                                ca.name ? <option value={ca._id}>{ca.name}</option> :
                                                                <option value={ca._id}>{ca.title}</option>
                                                            ))
                                                        }
                                                        </select></div>
                                                    </div> */}
                                                <Editor
                                                    onChange={(value) => setContent(value)}
                                                    className='Editor'
                                                    placeholder='Nội dung'
                                                    required={true}
                                                    defaultValue={content}
                                                />
                                            </div>
                                            <div>{category ? <button className="child">ĐĂNG</button> :
                                            <button className="child" disabled={true} onClick={categoryMissingWarn}>ĐĂNG</button>
                                            }</div>
                                        </form></div>)
                        }
                        {
                            !editPostStatus && (
                                <div className="content">
                                    <h1 className='contentTitle'>{post.title} 
                                        {userInfo && userInfo.role==="admin" && 
                                        <><label className='interactiveText' title="ghim bài viết này" onClick={()=>pin(post._id)}><i className='fa fa-thumb-tack'></i></label>
                                        <label className='interactiveText' title="đăng lên trang chủ" onClick={()=>pinToHome(post._id)}><i className='fa fa-home'></i></label></>}
                                    </h1>
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
                                    {nestedPosts && nestedPosts.length>0 &&
                                        <div><h2>Bài viết cùng chủ đề:</h2></div>
                                    }
                                    {nestedPosts && nestedPosts.map(nest=>(
                                        <button type="submit" className="row buttonLink" key={nest._id} value={nest._id} onClick={loadPost}>
                                
                                        <p>{nest.title}</p>    
                                    </button>
                                    ))}
                                    {relatedPosts && relatedPosts.length>0 &&
                                        <div><h2>Bài viết liên quan:</h2></div>}
                                    {relatedPosts && relatedPosts.map(rela=>(
                                        <button type="submit" className="row buttonLink" key={rela._id} value={rela._id} onClick={loadPost}>
                                            <p>{rela.title}</p> 
                                        </button>
                                    ))}
                                </div>
                            )
                        }
                        
                            
                        </div>
                    
                        <div className="col-0">
                            {
                                loadingCommentPosting ? <LoadingBox></LoadingBox> : errorCommentPosting ? <MessageBox variant="error"></MessageBox> :
                                successPostingComment && <MessageBox>ĐÃ ĐĂNG BÌNH LUẬN</MessageBox>
                            }
                            {userInfo ? (<form className="editPostForm" onSubmit={commentPostingHandler}>
                                <div className="row center">Phản hồi dưới tên <label className="bold-text">{userInfo.name}</label></div>
                                <div>
                                    {/* <textarea placeholder="Nội dung" className="basic-slide" required={true} value={replyContent} type="textarea" onChange={(e)=> setReplyContent(e.target.value)}>
                                    </textarea> */}
                                    <Editor
                                        onChange={(value) => setReplyContent(value)}
                                        className='Editor'
                                        placeholder='Nội dung'
                                        required={true}
                                        defaultValue=""
                                    />
                                </div>
                                <div><button className="child">PHẢN HỒI</button></div>
                            </form>) : (
                                <MessageBox><Link to={`/signin?redirect=forum/post/${postId}`}>{`Đăng nhập `}</Link>để tham gia trò chuyện</MessageBox>
                            )}
                        </div>  
                    </div>
                    
            {post && post.postComments.length ?
                <div className="col-2">
                {
                    loadingCommentDeleting ? <LoadingBox></LoadingBox> : errorCommentDeleting ? <MessageBox variant="error">{errorCommentDeleting}</MessageBox>
                    : successDeletingComment && <MessageBox>ĐÃ XÓA BÌNH LUẬN</MessageBox>
                }
                {
                    <div className="row">
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
                                <div className="card card-body postDetail">
                                    {!editCommentStatus ? (
                                    <div className="col full">
                                        <div className='interactiveUsername' onClick={()=>navigateToProfile(userInfo._id)}><span className='avatarSquare'>{userInfo.username[0]}</span>{userInfo.name}</div>
                                        <div className="userHoverInfo">
                                            <h1>{userInfo.role==="user"&&<i className='fa fa-user'></i>}{userInfo.username}{userInfo.role==="admin"&&<i className='fa fa-check'></i>}</h1>
                                            <div className='row center'>
                                                <div className=''>
                                                    <div className='row left'>{userInfo.name}</div>
                                                </div>
                                                <div className='col-2'>
                                                    {userInfo.gender==="Nam" ? <div className='row left'><i className='fa fa-mars'/>{userInfo.gender}</div> : 
                                                        userInfo.gender==="Nữ" ? <div className='row left'><i className='fa fa-venus'/>{userInfo.gender}</div> :
                                                        userInfo.gender==="Khác" && <div className='row left'><i className='fa fa-intersex'/>{userInfo.gender}</div>
                                                    }
                                                    <div className='row left'><i className='fas fa-brain'></i>{userInfo.mood ? userInfo.mood : "Tâm trạng không rõ"}</div>
                                                    <div className='row left'><i className='fa fa-birthday-cake'></i>{<DateComponent passedDate={userInfo.dob} isbirthDate={true}></DateComponent>} </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content">
                                            {/* <p><Linkify>{pc.content}</Linkify></p> */}
                                            <Editor
                                                defaultValue={pc.content}
                                                className='Editor'
                                                placeholder='Nội dung'
                                                required={true}
                                                readOnly={true}
                                            /> 
                                        </div>
                                        <DateComponent passedDate={pc.createdAt}>Phản hồi vào: </DateComponent>
                                </div>) : 
                                    (
                                        <form className="editPostForm" onSubmit={commentEditingHandler}>
                                            <div>
                                                <textarea placeholder="Nội dung" className="basic-slide" required={true} value={replyContent} type="textarea" onChange={(e)=> setReplyContent(e.target.value)}>
                                                </textarea>
                                            </div>
                                            <div><button className="child">PHẢN HỒI</button></div>
                                        </form>
                                    )}
                                    <DeletePostCommentButton postId = {postId} pc = {pc}></DeletePostCommentButton>
                                </div>)
                            }
                                
                            {
                                userInfo && userInfo._id !== pc.commenter && (
                                    <div className="card card-body postDetail">
                                        {users.map(u=>(
                                            u._id===pc.commenter && (
                                            <div className="col full">
                                                <div className="interactiveUsername" onClick={()=>navigateToProfile(u._id)}><span className='avatarSquare'>{u.username[0]}</span>{u.name}</div>
                                                <div className="userHoverInfo">
                                                    <h1>{u.role==="user"&&<i className='fa fa-user'></i>}{u.username}{u.role==="admin"&&<i className='fa fa-check'></i>}</h1>
                                                    <div className='row center'>
                                                        <div className=''>
                                                            <div className='row left'>{u.name}</div>
                                                        </div>
                                                        <div className='col-2'>
                                                            {u.gender==="Nam" ? <div className='row left'><i className='fa fa-mars'/>{u.gender}</div> : 
                                                                u.gender==="Nữ" ? <div className='row left'><i className='fa fa-venus'/>{u.gender}</div> :
                                                                u.gender==="khác" && <div className='row left'><i className='fa fa-intersex'/>{u.gender}</div>
                                                            }
                                                            <div className='row left'><i className='fas fa-brain'></i>{u.mood ? u.mood : "Tâm trạng không rõ"}</div>
                                                            <div className='row left'><i className='fa fa-birthday-cake'></i>{<DateComponent passedDate={u.dob} isbirthDate={true}></DateComponent>} </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    {/* <p><Linkify>{pc.content}</Linkify></p> */}
                                                    <Editor
                                                        defaultValue={pc.content}
                                                        className='Editor'
                                                        placeholder='Nội dung'
                                                        required={true}
                                                        readOnly={true}
                                                    /> 
                                                </div>
                                            </div>
                                        )))}
                                        <DateComponent passedDate={pc.createdAt}>Phản hồi vào: </DateComponent>
                                    </div>
                                )
                            }
                            {
                                !userInfo && (
                                    <div className="card card-body postDetail">
                                        {users.map(u=>(
                                            u._id===pc.commenter && (
                                            <div className="col full">
                                                <div className="interactiveUsername" onClick={()=>navigateToProfile(u._id)}><span className='avatarSquare'>{u.username[0]}</span>{u.name}</div>
                                                <div className="userHoverInfo">
                                                    <h1>{u.role==="user"&&<i className='fa fa-user'></i>}{u.username}{u.role==="admin"&&<i className='fa fa-check'></i>}</h1>
                                                    <div className='row center'>
                                                        <div className=''>
                                                            <div className='row left'>{u.name}</div>
                                                        </div>
                                                        <div className='col-2'>
                                                            {u.gender==="Nam" ? <div className='row left'><i className='fa fa-mars'/>{u.gender}</div> : 
                                                                u.gender==="Nữ" ? <div className='row left'><i className='fa fa-venus'/>{u.gender}</div> :
                                                                u.gender==="khác" && <div className='row left'><i className='fa fa-intersex'/>{u.gender}</div>
                                                            }
                                                            <div className='row left'><i className='fas fa-brain'></i>{u.mood ? u.mood : "Tâm trạng không rõ"}</div>
                                                            <div className='row left'><i className='fa fa-birthday-cake'></i>{<DateComponent passedDate={u.dob} isbirthDate={true}></DateComponent>} </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    {/* <p><Linkify>{pc.content}</Linkify></p> */}
                                                    <Editor
                                                        defaultValue={pc.content}
                                                        className='Editor'
                                                        placeholder='Nội dung'
                                                        required={true}
                                                        readOnly={true}
                                                    /> 
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
             :
                <div className='row full'>
                    <div className='col-1'>
                        <MessageBox variant="info">CHƯA CÓ BÌNH LUẬN</MessageBox>
                    </div>
                </div>
            }
            </div>
            
            ))}
            
        </div>
    )
}
