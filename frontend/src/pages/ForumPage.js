import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOfUsers } from '../actions/userAction';
import { createPost, listOfFilteredPosts, listOfPosts, listOfSearchedPosts, listOfSortedPosts } from '../actions/postAction';
import DateComponent from '../components/DateComponent';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import CategoryIcon from '../components/CategoryIcon';
import { listOfCategories } from '../actions/categoryAction';
// import MdEditor from 'react-markdown-editor-lite';
// import 'react-markdown-editor-lite/lib/index.css';
// import MarkdownIt from 'markdown-it';
import Editor from "rich-markdown-editor";
import Select from "react-dropdown-select";
import { CATEGORY_LIST_RESET } from '../constants/categoryConst';



export default function ForumPage() {

    const userSignin  = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    const [title, settitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(null);
    const [keyword, setKeyword] = useState('');
    //const [isPublic, setIsPublic] = useState('');

    const categoryList = useSelector(state=>state.categoryList);
    const {loading: loadingCategory, error: errorCategory, categories} = categoryList;


    const dispatch = useDispatch();
    const postCreating = useSelector(state=>state.postCreating);
    const {loading, error, success} = postCreating;

    const postList = useSelector(state=>state.postList);
    const {loading: loadingPost, error: errorPost, posts} = postList;

    
    const userList = useSelector((state) => state.userList);
    const {loading: loadingUser, error: errorUser, users} = userList;
    
    const [sorting, setSorting] = useState('none');

    const postSorting = useSelector(state=>state.postSorting);
    const {loading: loadingSort, error: errorSort, sortedPosts} = postSorting;

    const [createAPost, setCreateAPost] = useState(false);
    const [filter, setFilter] = useState('');

    const postFiltering = useSelector(state=>state.postFiltering);
    const {loading: loadingFilter, error: errorFilter, filteredPosts} = postFiltering;

    const postSearching = useSelector(state=>state.postSearching);
    const {loading: loadingSearch, error: errorSearch, searchedPosts} = postSearching;

    // const mdParser = new MarkdownIt(/* Markdown-it options */);

    const enablePosting = () =>{
        setCreateAPost(!createAPost);
    }

    const setTheKeyword = (e) =>{
        setFilter("");
        setSorting("none");
        setKeyword(e.target.value);
        dispatch(listOfSearchedPosts(e.target.value));
      }

    const postHandler = () =>{
        // alert(userInfo._id);
        // alert(title);
        // alert(content);
        // alert(category);
        dispatch(createPost(userInfo._id, title, content, category));
    }

    const scrollToTopHandler = () =>{
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
          });
    }

    const sortThePosts = (selectedValues) =>{
        //alert(JSON.stringify(selectedValues));
        // setSorting(e.target.value);
        setSorting(selectedValues[0].value);
        setFilter('');
        setKeyword('');
        //alert(e.target.value);
        if(selectedValues[0].value==="1"){
            //alert("1");
            if(filter===""){
                //alert("none");
                dispatch(listOfSortedPosts("none", "1"));
            }
            else if(filter!==""){
                //alert(e.target.value);
                dispatch(listOfSortedPosts(sorting));
            }
        }else if(selectedValues[0].value==="-1"){
            if(filter===""){
                //alert("none");
                dispatch(listOfSortedPosts("none", "-1"));
            }
            else if(filter!==""){
                //alert(e.target.value);
                dispatch(listOfSortedPosts(sorting));
            }
        }else if(selectedValues[0].value==="abc"){
            //alert("");
            dispatch(listOfPosts());
        }
    }

    const filterThePosts = (selectValues)=>{
        // setFilter(e.target.value);
        //alert(JSON.stringify(selectValues));
        if(selectValues.length>=1){
            setFilter(selectValues[0].value)
            setSorting("none");
            dispatch(listOfFilteredPosts(selectValues[0].value, sorting));
        }else{
            setFilter("");
            setSorting("none");
            dispatch(listOfPosts());
        }
            
    }

    const sortingOptions = [
        {value: "none", label: "Theo tên (A-Z)"},
        {value: "-1", label: "Mới nhất"},
        {value: "1", label: "Cũ nhất"},
    ]

    const setValuesForCategory = (selectedValues) => {
        // alert(JSON.stringify(selectedValues[0].value));
        setCategory(selectedValues[0].value);
        // alert(category);
    }

    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        dispatch(listOfUsers());
        dispatch(listOfPosts());  
        dispatch(listOfCategories());
        dispatch({type: CATEGORY_LIST_RESET});
        
    }, [dispatch])


    return (
        <div>
            <div className="floatingDiv">
                <button onClick={scrollToTopHandler}><i className="fa fa-arrow-up"></i></button>
            </div>
            <div className="row center">
                <div className="row center search-background"> 
                    {/* <div> 
                        <div className='box'><select onChange={sortThePosts} className="" value={sorting}>
                            <option value="none">Theo tên</option>
                            <option value="-1">Mới nhất</option>
                            <option value="1">Cũ nhất</option>
                            
                        </select></div>
                    </div> */}
                    <div>
                    <Select dropdownGap={20} options={sortingOptions} onChange={sortThePosts} placeholder='Sắp xếp'></Select>
                    </div>
                    {/* <div> 
                        <div className='box'><select onChange={filterThePosts} className="">
                            <option value="">Tất cả</option>
                            { 
                                categories && categories.map(ca=>(
                                    <option value={ca._id}>{ca.name}</option>
                                ))
                            }
                        </select></div>
                    </div> */}
                    <div>
                        {/* {categories && <Select options={[
                            {value: categories.map(ca=>ca.name), label: categories.map(ca=>ca.name)},
                            ]} onChange={(values) => setCategory(values)} />} */}
                        {categories && <Select dropdownHeight="10rem" placeholder='Lọc theo chủ đề' options={categories.map(ca=>({value: ca._id, label: ca.name}))} onChange={filterThePosts} clearable/>}
                    </div>
                    <div>
                        <input type="text" id="searchField" className="basic-slide" value={keyword} onChange={setTheKeyword} placeholder="Tìm bài viết"></input>
                    </div>
                    
                    {userInfo && <div><button className="admin" onClick={enablePosting}>{createAPost ? <>ĐÓNG</> : <>TẠO BÀI VIẾT</>}</button></div>}

                </div>
            </div>
            
            {
                loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : 
                success && <MessageBox>Posted</MessageBox>
            }
            {userInfo ?  (createAPost && (
            <div className='postHere'>
                <div className="row center">Tạo 1 bài viết dưới tên ‎<label className="bold-text">{userInfo.name}</label></div>

                <div className='row center'>{
                    userInfo.role==='user' ?
                    (categories && <Select style={{width: '60rem', minWidth: '10rem'}} dropdownHeight="10rem" placeholder='Chọn chủ đề' options={categories.filter((ca)=>!ca.name.includes("Thông báo")).map(ca=>({value: ca._id, label: ca.name}))} onChange={values => setValuesForCategory(values)}/>)
                    : userInfo.role==='admin' &&
                    (categories && <Select style={{width: '60rem', minWidth: '10rem'}} dropdownHeight="10rem" placeholder='Chọn chủ đề' options={categories.map(ca=>({value: ca._id, label: ca.name}))} onChange={values => setValuesForCategory(values)}/>)
                }</div>
            <form onSubmit={postHandler}>
                {/* <div>
                    <div className='box'><select className="category" required={true} onChange={(e)=> setCategory(e.target.value)}>
                        <option value="" hidden>Chọn chủ đề</option>
                        {   userInfo.role==='user' &&
                            categories && posts && categories.concat(posts).map(ca=>(
                                ca.name ? <option value={ca._id}>{ca.name}</option> :
                                <option value={ca._id}>{ca.title}</option>
                            ))
                        }
                        {   userInfo.role==='user' &&
                            categories && categories.map(ca=>(
                                ca.name ? <option value={ca._id}>{ca.name}</option> :
                                <option value={ca._id}>{ca.title}</option>
                            ))
                        }
                    </select>
                    
                    
                    </div>
                </div> */}
                <div>
                    <input required={true} placeholder="Tiêu đề" value={title} className=" basic-slide" type="text" onChange={(e)=> settitle(e.target.value)}>
                    </input>
                </div><div>
                    {/* <textarea className="content" required={true} placeholder="Nội dung" value={content} className="basic-slide" type="textarea" onChange={(e)=> setContent(e.target.value)}>
                    </textarea> */}
                    {/* <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {}}
                    /> */}
                    {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={text => setContent(text)} /> */}
                    
                    {/* PERFECT EDITOR, JUST WHAT I NEED :> */}
                    <Editor
                        defaultValue=""
                        onChange={(value) => setContent(value)}
                        className='Editor'
                        placeholder='Nội dung'
                        // required={true}
                    /> 

                </div>
                    <button type="submit" className="admin block">ĐĂNG</button>
            </form></div>))
            : (<div>
                        {/* <div className="row center">
                            <MessageBox variant="info">ĐĂNG NHẬP ĐỂ THAM GIA TRÒ CHUYỆN</MessageBox> 
                        </div> */}
                        <div className="row center">
                            Muốn tham gia thảo luận? ‎<Link to={`/signin?redirect=forum`}>Đăng nhập</Link>
                        </div>
                    
                    </div>)}
            {sorting==="none" && filter === "" && keyword === "" &&(
                loadingPost ? <LoadingBox></LoadingBox> : errorPost ? <MessageBox variant="error">{errorPost}</MessageBox> :
                posts && (
                    posts.map(p=>(
                        <div className='card card-body postBasic'>
                            {
                                loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                users && (users.map(u=>(
                                    p.user === u._id && 
                                    <Link to={`/forum/post/${p._id}`}><div className="" key={p._id}>
                                        <div className="row left">
                                            <Link to={`/forum/post/${p._id}`}><div>{p.title}</div></Link>
                                        </div>
                                        <label className="bold-text">{u.role==='admin' ? (<p title={u.name} className=''>{u.name}<i className="fa fa-check" title="✓: Signature of Superiority/ Biểu tượng của sự thượng đẳng"></i></p>) :   u.name}</label>
                                        <div className="row left">
                                            <CategoryIcon categoryName = {p.category}></CategoryIcon>
                                        </div>
                                        <div>
                                            <DateComponent passedDate={p.createdAt}>Đăng vào: </DateComponent>
                                        </div>
                                    </div></Link>
                                )))
                            }
                        </div>
                        
                    )
                )))
            }
            {keyword === "" && sorting==="-1" && (
                loadingSort ? <LoadingBox></LoadingBox> : errorSort ? <MessageBox variant="error">{errorSort}</MessageBox> :
                sortedPosts && (
                    sortedPosts.map(p=>(
                        <div className="card card-body postBasic">
                            {
                                loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                users && (users.map(u=>(
                                    p.user === u._id && 
                                    <Link to={`/forum/post/${p._id}`}><div  key={p._id}>
                                        <div className="row left">
                                            <Link to={`/forum/post/${p._id}`}><div>{p.title}</div></Link>
                                        </div>
                                        <label className="bold-text">{u.role==='admin' ? (<p title={u.name} className=''>{u.name}<i className="fa fa-check" title="✓: Signature of Superiority/ Biểu tượng của sự thượng đẳng"></i></p>) :   u.name}</label>
                                        <div className="row left">
                                            <CategoryIcon categoryName = {p.category}></CategoryIcon>
                                        </div>
                                        <div>
                                            <DateComponent passedDate={p.createdAt}>Đăng vào: </DateComponent>
                                        </div>
                                    </div></Link>
                                )))
                            }
                        </div>
                        
                    )
                )))
            }
            {keyword === "" && sorting==="1" && (
                loadingSort ? <LoadingBox></LoadingBox> : errorSort ? <MessageBox variant="error">{errorSort}</MessageBox> :
                sortedPosts && (
                    sortedPosts.map(p=>(
                        <div className="card card-body postBasic">
                            {
                                loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                users && (users.map(u=>(
                                    p.user === u._id && 
                                    <Link to={`/forum/post/${p._id}`}><div  key={p._id}>
                                        <div className="row left">
                                            <Link to={`/forum/post/${p._id}`}><div>{p.title}</div></Link>
                                        </div>
                                        <label className="bold-text">{u.role==='admin' ? (<p title={u.name} className=''>{u.name}<i className="fa fa-check" title="✓: Signature of Superiority/ Biểu tượng của sự thượng đẳng"></i></p>) :   u.name}</label>
                                        <div className="row left">
                                            <CategoryIcon categoryName = {p.category}></CategoryIcon>
                                        </div>
                                        <div>
                                            <DateComponent passedDate={p.createdAt}>Đăng vào: </DateComponent>
                                        </div>
                                    </div></Link>
                                )))
                            }
                        </div>
                        
                    )
                )))
            }
            {keyword === "" && sorting==="none" && filter!=="" && (
                loadingFilter ? <LoadingBox></LoadingBox> : errorFilter ? <MessageBox variant="error">{errorFilter}</MessageBox> :
                filteredPosts && (
                    filteredPosts.map(p=>(
                        <div className="card card-body postBasic">
                            {
                                loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                users && (users.map(u=>(
                                    p.user === u._id && 
                                    <Link to={`/forum/post/${p._id}`}><div  key={p._id}>
                                        <div className="row left">
                                            <Link to={`/forum/post/${p._id}`}><div>{p.title}</div></Link>
                                        </div>
                                        <label className="bold-text">{u.role==='admin' ? (<p title={u.name} className=''>{u.name}<i className="fa fa-check" title="✓: Signature of Superiority/ Biểu tượng của sự thượng đẳng"></i></p>) :   u.name}</label>
                                        <div className="row left">
                                            <CategoryIcon categoryName = {p.category}></CategoryIcon>
                                        </div>
                                        <div>
                                            <DateComponent passedDate={p.createdAt}>Đăng vào: </DateComponent>
                                        </div>
                                    </div></Link>
                                )))
                            }
                        </div>
                        
                    )
                )))
            }
            {filter==="" && sorting==="none" && keyword && (
                loadingSearch ? <LoadingBox></LoadingBox> : errorSearch ? <MessageBox variant="error">{errorSearch}</MessageBox> :
                searchedPosts && (
                    searchedPosts.map(p=>(
                        <div className="card card-body postBasic">
                            {
                                loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                users && (users.map(u=>(
                                    p.user === u._id && 
                                    <Link to={`/forum/post/${p._id}`}><div  key={p._id}>
                                        <div className="row left">
                                            <Link to={`/forum/post/${p._id}`}><div>{p.title}</div></Link>
                                        </div>
                                        <label className="bold-text">{u.role==='admin' ? (<p title={u.name} className=''>{u.name}<i className="fa fa-check" title="✓: Signature of Superiority/ Biểu tượng của sự thượng đẳng"></i></p>) :   u.name}</label>
                                        <div className="row left">
                                            <CategoryIcon categoryName = {p.category}></CategoryIcon>
                                        </div>
                                        <div>
                                            <DateComponent passedDate={p.createdAt}>Đăng vào: </DateComponent>
                                        </div>
                                    </div></Link>
                                )))
                            }
                        </div>
                        
                    )
                )))
            }
            
        </div>
    )
}
