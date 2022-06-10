import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { listOfUsers } from '../actions/userAction';
import { createPost, listOfFilteredPosts, listOfPosts, listOfSearchedPosts, listOfSortedPosts, statOfAllPosts, statOfUserPosts } from '../actions/postAction';
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
import Draggable from 'react-draggable';
import { isBrowser, isMobile } from 'react-device-detect';
import TagSelect from '../components/TagSelect';


export default function ForumPage() {

    const userSignin  = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    // const postCache = useSelector(state=>state.postCache);
    // const {userLastSeenPost} = postCache; //user last seen post

    const postDetails = useSelector(state=>state.postDetails);
    const {post} = postDetails;

    const [title, settitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(null);
    const [keyword, setKeyword] = useState('');
    //const [isPublic, setIsPublic] = useState('');
    const [autoComplete, setAutoComplete] = useState('');

    const categoryList = useSelector(state=>state.categoryList);
    const {loading: loadingCategory, error: errorCategory, categories} = categoryList;


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const postCreating = useSelector(state=>state.postCreating);
    const {loading, error, success} = postCreating;

    const postList = useSelector(state=>state.postList);
    const {loading: loadingPost, error: errorPost, posts} = postList;

    
    const userList = useSelector((state) => state.userList);
    const {loading: loadingUser, error: errorUser, users} = userList;
    
    const [sorting, setSorting] = useState('suggestion');

    const postSorting = useSelector(state=>state.postSorting);
    const {loading: loadingSort, error: errorSort, sortedPosts} = postSorting;

    const [createAPost, setCreateAPost] = useState(false);
    const [filter, setFilter] = useState('');
    const [filterId, setFilterId] = useState('');

    const postFiltering = useSelector(state=>state.postFiltering);
    const {loading: loadingFilter, error: errorFilter, filteredPosts} = postFiltering;

    const postSearching = useSelector(state=>state.postSearching);
    const {loading: loadingSearch, error: errorSearch, searchedPosts} = postSearching;

    const postStat = useSelector(state=>state.postStat);
    const {loading: loadingPostStat, error: errorPostStat, allPostsStat} = postStat;

    const userPostStat = useSelector(state=>state.userPostStat);
    const {loading: loadingPostStat2, error: errorPostStat2, userForumStat} = userPostStat;

    // const mdParser = new MarkdownIt(/* Markdown-it options */);

    const enablePosting = () =>{
        setCreateAPost(!createAPost);
    }

    const setTheKeyword = (e) =>{
        setFilter("");
        setFilterId("");
        setSorting("none");
        setKeyword(e.target.value);
        // dispatch(listOfSearchedPosts(e.target.value));
        // generateAutoComplete(e.target.value);
    }

    const search = () =>{
        dispatch(listOfSearchedPosts(keyword));
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
        if(selectedValues){
            setSorting(selectedValues[0].value);
        
            // setFilter('');
            setKeyword('');
            //alert(e.target.value);
            // if(selectedValues[0].value==="1"){
            //     //alert("1");
            //     if(filter===""){
            //         //alert("none");
            //         dispatch(listOfSortedPosts("none", "1"));
            //     }
            //     else if(filter!==""){
            //         //alert(e.target.value);
            //         dispatch(listOfSortedPosts(filter, sorting));
            //     }
            // }else if(selectedValues[0].value==="-1"){
            //     if(filter===""){
            //         //alert("none");
            //         dispatch(listOfSortedPosts("none", "-1"));
            //     }
            //     else if(filter!==""){
            //         //alert(e.target.value);
            //         dispatch(listOfSortedPosts(filter, sorting));
            //     }
            // }else if(selectedValues[0].value==="abc"){
            //     //alert("");
            //     dispatch(listOfPosts());
            // }else if(selectedValues[0].value==="hot"){
            //     dispatch(listOfSortedPosts("none", "hot"));
            // }else if(selectedValues[0].value==="top"){
            //     dispatch(listOfSortedPosts("none", "top"));
            // }
            if(selectedValues[0].value!=="abc"){
                if(filter===""){
                    dispatch(listOfSortedPosts("none", selectedValues[0].value));
                }else{
                    dispatch(listOfSortedPosts(filterId, selectedValues[0].value));
                }
            }else{
                dispatch(listOfPosts);
            }
        }
    }

    // const filterThePosts = (selectValues)=>{
    //     // setFilter(e.target.value);
    //     //alert(JSON.stringify(selectValues));
    //     if(selectValues.length>=1){
    //         setFilter(selectValues[0].value)
    //         setSorting("none");
    //         dispatch(listOfFilteredPosts(selectValues[0].value, sorting));
    //     }else{
    //         setFilter("");
    //         setSorting("none");
    //         dispatch(listOfPosts());
    //     }
            
    // }
    const filterThePosts = (selectedValue)=>{
        // setFilter(e.target.value);
        //alert(JSON.stringify(selectValues));
        setKeyword('');
        if(selectedValue!=="all"){
            setFilter(selectedValue.name)
            setFilterId(selectedValue._id);
            // setSorting("none");
            if(selectedValue.name===""){
                dispatch(listOfSortedPosts("none", sorting));
            }else{
                dispatch(listOfSortedPosts(selectedValue._id, sorting));
            }
            // dispatch(listOfFilteredPosts(selectedValue._id, sorting));
        }else if(selectedValue==="all"){
            setFilter("");
            setSorting("none");
            dispatch(listOfPosts());
        }
            
    }

    const sortingOptions = [
        // {value: "none", label: "Theo tên (A-Z)"},
        {value: "-1", label: "Mới nhất"},
        {value: "1", label: "Cũ nhất"},
        {value: "hot", label: "Phổ biến"},
        {value: "top", label: "Top"}
    ]

    const setValuesForCategory = (selectedValues) => {
        // alert(JSON.stringify(selectedValues[0].value));
        setCategory(selectedValues[0].value);
        // alert(category);
    }

    const generateAutoComplete = () =>{
        if(post){
            var autoCompleteArr = [];
            // autoCompleteArr = post.content.split(/[^A-Za-z]/);
            autoCompleteArr = post.content.split(/[\p{L}]/);
            autoCompleteArr.push(post.title);
            console.log(autoCompleteArr);
            setAutoComplete(autoCompleteArr);
        }
    }


    
    const findClosestString = ()=> { 
        let closestOne = "";
        let floorDistance = 0.1;
        const arr = autoComplete;
        const inputvalue = keyword;
      
        for (let i = 0; i < arr.length; i++) {
          let dist = levenshteinDistance(arr[i], inputvalue);
          if (dist > floorDistance) {
              floorDistance = dist;
            closestOne = arr[i];
          }
        }
        // alert(closestOne);
        return closestOne;
    }
      
    //levenshtein distance
    const levenshteinDistance = (val1, val2) => { 
        let longer, shorter, longerlth, result;
        
        if (val1.length > val2.length) {
            longer = val1;
            shorter = val2;
        } else {
            longer = val2;
            shorter = val1;
        }
        
        longerlth = longer.length;
        
        result = ((longerlth - editDistance(longer, shorter)) / parseFloat(longerlth));
        
        return result;
    }
    
    const editDistance = (val1, val2) => {
    val1 = val1.toLowerCase();
    val2 = val2.toLowerCase();
    
        let costs = [];
        
        for(let i = 0; i <= val1.length; i++) {
            let lastVal = i;
            for(let j = 0; j <= val2.length; j++) {
                if (i === 0) {
                costs[j] = j;
            } else if (j > 0) {
                let newVal = costs[j - 1];
                if (val1.charAt(i - 1) !== val2.charAt(j - 1)) {
                newVal = Math.min(Math.min(newVal, lastVal), costs[j]) + 1;
                }
                costs[j - 1] = lastVal;
                lastVal = newVal;
            }
            }
            if (i > 0) { costs[val2.length] = lastVal }
        }
    
        console.log(costs[val2.length]);
        return costs[val2.length];
    }
    
    // const levenshtein = () =>{
    //     findClosestString(['Apple','Banana and Melon','Orange'], 'Mellllon');
    // }

    const upperCaseFirstLetter = (text) =>{
        text = text[0].toUpperCase() + text.slice(1);
        // console.log(text);
        return text;
    }

    // var input = document.getElementById("searchField");

    // // Execute a function when the user presses a key on the keyboard
    // input.addEventListener("keypress", function(event) {
    // // If the user presses the "Enter" key on the keyboard
    // if (event.key === "Enter") {
    //     // Cancel the default action, if needed
    //     event.preventDefault();
    //     // Trigger the button element with a click
    //     document.getElementById("searchBtn").click();
    // }
    // });

    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        dispatch(listOfUsers());
        dispatch(listOfPosts());  
        dispatch(listOfCategories());
        dispatch({type: CATEGORY_LIST_RESET});
        dispatch(statOfAllPosts());
        if(userInfo){
            dispatch(statOfUserPosts(userInfo._id));
        }
        generateAutoComplete();
    }, [dispatch])

    // var item = document.getElementById("tagSelect");

    // window.addEventListener("wheel", function (e) {
    //     if (e.deltaY > 0) item.scrollLeft += 100;
    //     else item.scrollLeft -= 100;
    // });

    return (
        <div className='forumPage'>
            <div className="floatingDiv">
                <button onClick={scrollToTopHandler}><i className="fa fa-arrow-up"></i></button>
            </div>
            {isBrowser && <Draggable>
                <div>
                    <div className='memberCard'>
                        <div className='row center'><i className='fa fa-bullhorn'></i></div>
                        {loadingPostStat ? <LoadingBox></LoadingBox> : errorPostStat ? <MessageBox variant="error">{errorPostStat}</MessageBox> : 
                        allPostsStat && users && allPostsStat.postStatByUserCount && allPostsStat.postStatByUserCount.map((stat)=>(
                            <>
                                {
                                    users.map((u)=>(
                                        u._id===stat.user && 
                                        <div className='row center' style={{paddingTop: "1rem"}}>
                                            <div className='interactiveUsername' onClick={()=>navigate(`/user/${u._id}`)}>
                                                {u.avatar ? <span className='avatarSquare' style={{background: `url("${u.avatar}")`, backgroundSize: "contain", backgroundPosition: "center center"}}></span> : <span className='avatarSquare interactiveUsername'>{u.username[0]}</span>}
                                                <div className="userHoverInfo toRight" style={u ? u.backgroundImage ? {background: `url("${u.backgroundImage}")`, backgroundSize: 'cover'} : {backgroundColor: "#04374b"} : {backgroundColor: "#04374b"}}>
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
                                            </div>
                                            {/* {u.name} */}
                                            <div className='row right' title={stat.count}>{stat.count>99 ? "99+" : stat.count}</div>
                                        </div>
                                    ))
                                }
                            </>
                        ))
                        }
                    </div>
                    <div className='memberCard right'>
                        <div className='row center'><i className='fa fa-commenting'></i></div>
                        {loadingPostStat ? <LoadingBox></LoadingBox> : errorPostStat ? <MessageBox variant="error">{errorPostStat}</MessageBox> : 
                        allPostsStat && users && allPostsStat.commentStatByUserCount && allPostsStat.commentStatByUserCount.map((stat)=>(
                            <>
                                {
                                    users.map((u)=>(
                                        u._id===stat.commenter && 
                                        <div className='row center' style={{paddingTop: "1rem"}}>
                                            <div className='interactiveUsername' onClick={()=>navigate(`/user/${u._id}`)}>
                                                {u.avatar ? <span className='avatarSquare' style={{background: `url("${u.avatar}")`, backgroundSize: "contain", backgroundPosition: "center center"}}></span> : <span className='avatarSquare interactiveUsername'>{u.username[0]}</span>}
                                                <div className="userHoverInfo toRight" style={u ? u.backgroundImage ? {background: `url("${u.backgroundImage}")`, backgroundSize: 'cover'} : {backgroundColor: "#04374b"} : {backgroundColor: "#04374b"}}>
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
                                            </div>
                                            {/* {u.name} */}
                                            <div className='row right' title={stat.count}>{stat.count>99 ? "99+" : stat.count}</div>

                                        </div>
                                    ))
                                }
                            </>
                        ))
                        }
                    </div>
                </div>
                
            </Draggable>}
            
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
                        {/* {categories && <Select dropdownHeight="10rem" placeholder='Lọc theo chủ đề' options={categories.map(ca=>({value: ca._id, label: ca.name}))} onChange={filterThePosts} clearable/>} */}
                        {categories && <TagSelect categories={categories} selectItem={filterThePosts}></TagSelect>}
                    </div>
                    <div className='row center' style={{position: "relative"}}>
                        <input type="text" id="searchField" className="searchField" value={keyword} onChange={setTheKeyword} placeholder="Tìm bài viết" autoComplete='off' list="suggestions"></input>
                        {/* {keyword && autoComplete &&
                            <div className='row left autoComplete'>
                                {
                                    autoComplete.map(a=>(
                                        (a.includes(keyword) || a.includes(upperCaseFirstLetter(keyword)) || a.includes(keyword.toUpperCase) || a.includes(keyword.toLowerCase())) && 
                                        (a.length>30 ? <div value={a} onClick={()=>setKeyword(a)}>{a.substring(0, 30)+"..."}</div> : <div value={a} onClick={()=>setKeyword(a)}>{a}</div>)
                                    ))
                                }
                            </div>} */}
                            
                            {/* <datalist id="suggestions">
                                {keyword && autoComplete &&
                                    autoComplete.map(a=>(
                                        (a.includes(keyword) || a.includes(upperCaseFirstLetter(keyword)) || a.includes(keyword.toUpperCase) || a.includes(keyword.toLowerCase())) && 
                                        (a.length>30 ? <option value={a} onClick={()=>setKeyword(a)}>{a.substring(0, 30)+"..."}</option > : (a.length<30 || a.length===30) && <option value={a} onClick={()=>setKeyword(a)}>{a}</option>)
                                    ))
                                }
                            </datalist> */}
                            {keyword && autoComplete &&
                            <div className='row left autoComplete'>
                                {<div onClick={()=>setKeyword(findClosestString(autoComplete, keyword))}>{findClosestString(autoComplete, keyword).substring(0, 30)+"..."}</div>}
                            </div>}
                            <div id="searchBtn" type="submit" className='clickableIcon' onClick={search}><i className='fa fa-search'></i></div>
                    </div>
                    
                    {userInfo && <div><button className="admin" onClick={enablePosting}>{createAPost ? <>ĐÓNG</> : <>TẠO BÀI VIẾT</>}</button></div>}

                </div>
            </div>
            
            {
                loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : 
                success && <MessageBox>Posted</MessageBox>
            }
            {userInfo ?  (createAPost && (
            <div className='row center'><div className='postHere'>
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
                <div className='row center'>
                    <input required={true} placeholder="Tiêu đề" value={title} className="titleField" type="text" onChange={(e)=> settitle(e.target.value)}>
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
                    {/* BASICALLY THIS BROKE MY PROJECT OR MY PROJECT BROKE THIS PACKAGE */}
                    <Editor
                        defaultValue=""
                        onChange={(value) => setContent(value)}
                        className='Editor'
                        placeholder='Nội dung'
                        // required={true}
                    /> 

                </div>
                <div className='row center'>
                    <button type="submit" className="admin block">ĐĂNG</button>
                </div>
            </form></div></div>))
            : (<div>
                        {/* <div className="row center">
                            <MessageBox variant="info">ĐĂNG NHẬP ĐỂ THAM GIA TRÒ CHUYỆN</MessageBox> 
                        </div> */}
                        <div className="row center">
                            Muốn tham gia thảo luận? ‎<Link to={`/signin?redirect=forum`}>Đăng nhập</Link>
                        </div>
                    
                    </div>)}
            {/* default view */}
            {sorting==="suggestion" && filter === "" && keyword === "" &&(
                <div className=''>
                    <div className='row center' style={{padding: "1rem"}}>BẠN CÓ THỂ QUAN TÂM</div>
                    <div className='row'>
                        {
                            loadingPostStat2 ? <LoadingBox></LoadingBox> : errorPostStat2 ? <MessageBox variant="error">{errorPostStat2}</MessageBox> :
                            userForumStat && (
                                userForumStat.suggestedPosts.map(p=>(
                                    <div className='card card-body postBasic small' onClick={()=>navigate(`/forum/post/${p.postContent.split(">>>")[0]}`)}>
                                        {
                                            <div>{p.postContent.split(">>>")[1]}</div>
                                        }
                                    </div>
                                    
                                )
                            ))
                        }
                    </div>
                </div>
                )
            }
            {sorting==="hot" && filter === "" && keyword === "" &&(
                loadingPost ? <LoadingBox></LoadingBox> : errorPost ? <MessageBox variant="error">{errorPost}</MessageBox> :
                posts && (
                    posts.map(p=>(
                        <div className='card card-body postBasic'>
                            {
                                loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                users && (users.map(u=>(
                                    p.user === u._id && 
                                    <Link to={`/forum/post/${p._id}`}><div className="" key={p._id}>
                                        <div className='row left'>
                                            {p.upvotes && p.downvotes && p.upvotes.length - p.downvotes.length}<i className='fa fa-thumbs-up'></i>
                                        </div>
                                        <div className="row left">
                                            <Link to={`/forum/post/${p._id}`}><div>{p.title}</div></Link>
                                        </div>
                                        <label className="bold-text">{u.role==='admin' ? (<label title={u.name} className=''>{u.name}<i className="fa fa-check" title="✓: Signature of Superiority/ Biểu tượng của sự thượng đẳng"></i></label>) : u.name}</label>
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
            {/* filter only */}
            {/* {keyword === "" && sorting==="none" && filter!=="" && (
                loadingFilter ? <LoadingBox></LoadingBox> : errorFilter ? <MessageBox variant="error">{errorFilter}</MessageBox> :
                filteredPosts && (
                    filteredPosts.map(p=>(
                        <div className="card card-body postBasic">
                            {
                                loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                users && (users.map(u=>(
                                    p.user === u._id && 
                                    <Link to={`/forum/post/${p._id}`}><div  key={p._id}>
                                        <div className='row left'>
                                            {p.upvotes && p.downvotes && p.upvotes.length - p.downvotes.length}<i className='fa fa-thumbs-up'></i>
                                        </div>
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
            } */}
            
            {/* sorting + filter */}
            {keyword === "" && (
                loadingSort ? <LoadingBox></LoadingBox> : errorSort ? <MessageBox variant="error">{errorSort}</MessageBox> :
                sortedPosts && (
                    sortedPosts.map(p=>(
                        <div className="card card-body postBasic">
                            {
                                loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                users && (users.map(u=>(
                                    p.user === u._id && 
                                    <Link to={`/forum/post/${p._id}`}><div  key={p._id}>
                                        <div className='row left'>
                                            {p.upvotes && p.downvotes && p.upvotes.length - p.downvotes.length}<i className='fa fa-thumbs-up'></i>
                                        </div>
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
            {/* keyword */}
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
                                        <div className='row left'>
                                            {p.upvotes && p.downvotes && p.upvotes.length - p.downvotes.length}<i className='fa fa-thumbs-up'></i>
                                        </div>
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
