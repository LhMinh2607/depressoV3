import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams} from 'react-router-dom';
import { detailsOfUser, getMessageStat, getUserConversationHistory, updateUserProfile } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import DateComponent from '../components/DateComponent';
import DatePicker from 'react-datepicker'; //pre-made from react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; 
import Widget from 'rasa-webchat';
import Chatbox from '../components/Chatbox';
import Select from 'react-dropdown-select';
import { statOfUserPosts } from '../actions/postAction';
// import { Offline, Online } from "react-detect-offline";
import Gallery from '../components/Gallery';
import { createNotification } from '../actions/notificationAction';
import {isBrowser, isMobile} from 'react-device-detect';


export default function ProfilePage(){
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [gender, setGender] = useState();
    const [birthDate, setbirthDate] = useState();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [occupation, setOccupation] = useState('');
    const [username, setUsername] = useState();
    const [openPopup, setOpenPopup] = useState(false);
    const [desc, setDesc] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');
    const [backgroundMusic, setBackgroundMusic] = useState('');
    const [avatar, setAvatar] = useState('');
    const [globalBackground, setGlobalBackground] = useState('');


    //uneditable
    const [mood, setMood] = useState('');
    const [issues, setIssues] = useState([]);
    

    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const userDetail = useSelector(state => state.userDetail);
    const {loading: loadingUser, error: errorUser, user} = userDetail;
    // const [date, setDate] = useState("");   

    const conversation = useSelector(state=>state.conversation);
    const {loading: loadingConversation, error: errorConversation, userCon} = conversation;

    const messageStat = useSelector(state=>state.messageStat);
    const {loading: loadingStat, error: errorStat, msgStat} = messageStat;

    const userPostStat = useSelector(state=>state.userPostStat);
    const {loading: loadingPostStat, error: errorPostStat, userForumStat} = userPostStat;

    const notificationAdding = useSelector(state=>state.notificationAdding);
    const {loading: loadingNotificationAdding, error: errorNotificationAdding, success: successNotificationAdding} = notificationAdding;

    var params = useParams();
    var userId = params.id;

    const navigate = useNavigate();

    const genders = [
        {_id: "Nam", name: "Nam"},
        {_id: "N???", name: "N???"},
        {_id: "Kh??c", name: "3D"},
    ]

    const setTheGender = (selectedValues) =>{
        setGender(selectedValues[0].value);
    }

    const [currentTab, setCurrentTab] = useState('info');
    
    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success: successUpdateProfile, error: errorUpdateProfile, loading: loadingUpdateProfile, } = userUpdateProfile;
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('M???t kh???u v?? x??c nh???n m???t ph???i gi???ng nhau!');
        }else{
            //alert(birthDate);
            dispatch(updateUserProfile({userId: user._id, name, username, email, password, gender, birthDate, phoneNumber, address, occupation, desc, backgroundImage, backgroundMusic, avatar, globalBackground}));
        }
    };

    const customizationSubmitHandler = (e) =>{
        dispatch(updateUserProfile({userId: user._id, name, username, email, password, gender, birthDate, phoneNumber, address, occupation, desc, backgroundImage, backgroundMusic, avatar, globalBackground}));
    }


    const [disabled, setDisabled] = useState(true); //const disabled = true, const setDisabled = () =>{};
    const [editButtonName, setButtonName] = useState(true);

    

    // const orderAggregate = useSelector(state => state.orderAggregate);
    // const {loading: loadingSpending, error: errorSpending, userSpending} = orderAggregate;

    const enableEdit = ()=>{
        
        setDisabled(!disabled);
        editButtonNameChange();
        
    }

    const editButtonNameChange = () =>{
        setButtonName(!editButtonName);
    }

    const loadConversationHistory = () =>{
        setOpenPopup(true);
    }

    const closePopup = () =>{
        setOpenPopup(false);
    }

    const getYouTubeLinkId = (url) =>{
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }
    const bools = [
        {_id: "true", name: "C??"},
        {_id: "false", name: "Kh??ng"},
    ]
    const setTheBoolean = (selectedValues) =>{
        setGlobalBackground(selectedValues[0].value);
    }
    const addFriend = (receiverId) =>{
        const content = `${userInfo.name} ???? g???i b???n 1 l???i m???i k???t b???n`;
        const type = "friendRequest";
        dispatch(createNotification(userInfo._id, receiverId, content, type));
    }

    // function get_average_rgb(img) {
    //     var context = document.createElement('canvas').getContext('2d');
    //     if (typeof img == 'string') {
    //         var src = img;
    //         img = new Image;
    //         img.setAttribute('crossOrigin', ''); 
    //         img.src = src;
    //     }
    //     context.imageSmoothingEnabled = true;
    //     context.drawImage(img, 0, 0, 1, 1);
    //     alert(context.getImageData(1, 1, 1, 1).data.slice(0,3));
    //     return context.getImageData(1, 1, 1, 1).data.slice(0,3);
    // }


    // const setThebirthDate = (e) =>{
    //     setbirthDate(e.target.value);
    // }

    // const socketUrl = "http://localhost:5005";
    //const socketUrl = "https://80cf-27-2-17-107.ngrok.io";
    // const socketUrl = "https://cab9-27-2-17-107.ngrok.io";
    // const socketUrl = "https://16f0-27-2-17-107.ngrok.io";
    // const socketUrl = "https://3aac-27-2-17-107.ngrok.io";
    // const socketUrl = "https://fc03-27-2-17-107.ngrok.io"
    // const socketUrl = "https://2fe0-27-2-17-107.ngrok.io"
    // const socketUrl = "https://ad57-27-2-17-107.ngrok.io"
    // const socketUrl = "https://b4c8-27-2-17-107.ngrok.io"
    // const socketUrl = "https://3990-27-2-17-107.ngrok.io";
    // const socketUrl = "https://55c2-27-2-17-107.ngrok.io";
    // const socketUrl = "https://1d35-27-2-17-107.ngrok.io";
    const url = window.location.pathname.split('/').pop();

    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        //dispatch(listTotalMoneySpent(userInfo._id));
        //dispatch({type: CLEAR_ALL}); //a simple line of code that solved the worst bug in my project. That later it also caused a loop bug. Thanks so much dickhead.
        setGender("Gay")
        if(userInfo){
            if(!user){
                // dispatch({type: USER_UPDATE_PROFILE_RESET});
                dispatch(detailsOfUser(userId));
             }else if(user._id!==userId){
                 dispatch(detailsOfUser(userId));
             }
             if(user && user._id===userId){
                 setName(user.name);
                 setEmail(user.email);
                 setbirthDate(user.birthDate);
                 setGender(user.gender);
                 setbirthDate(new Date(user.dob));
                 setPhoneNumber(user.phoneNumber);
                 setAddress(user.address);
                 setOccupation(user.occupation);
                 setMood(user.mood);
                 setIssues(user.issues.join(", "))
                 setUsername(user.username);
                 setDesc(user.desc);
                 setBackgroundImage(user.backgroundImage);
                 setBackgroundMusic(user.backgroundMusic);
                 setAvatar(user.avatar);
                 setGlobalBackground(user.setGlobalBackground);
                 dispatch(getUserConversationHistory(user._id));
                 dispatch(getMessageStat(user._id));
                 dispatch(statOfUserPosts(user._id));
                 // get_average_rgb(user.backgroundImage);
             }
        }else{
            navigate(`/signin`);
        }
        
    }, [dispatch, userInfo._id, user, url]);
    return (
        <div className='mainprofile' style={user && user.backgroundImage ? {backgroundImage: `url("${user.backgroundImage}")`, backgroundSize: "contain", backgroundPosition: "top center", backgroundRepeat: "no-repeat"} : 
        {background: "linear-gradient(#04374b, transparent), linear-gradient(to top, rgb(0, 128, 255), transparent), linear-gradient(to bottom, rgb(127, 194, 248), transparent);"}}>
            {/* {userInfo && userInfo.backgroundImage && <img className='userbackground' src={userInfo.backgroundImage}></img>} */}
            <div className='userProfilePicture'>
                {user && user.avatar ? <div className='avatarCircle interactiveText' style={{background: `url("${user.avatar}")`, backgroundSize: "cover", backgroundPosition: "center center"}}>
                </div> : 
                <div className='avatarCircle interactiveText'>
                    {user && user.username[0]}
                </div>}
                {user && user.role!=="bot" && <div className='avatarCheckmark left'>{userForumStat && userForumStat.userScore}<i className='fa fa-thumbs-up'></i></div>}

                {user && user.role==="admin" && <div className='avatarCheckmark'><i className='fa fa-check'></i></div>}
                {user && user.role==="bot" && <div className='avatarCheckmark'><i className='fa fa-android'></i></div>}
                {/* {user && user.role=="admin" && <div className='avatarCheckmark.offline'><i className='fa fa-check'></i></div>} */}
                <div className='checkmarkHoverInfo'>
                    {user && (user.role==="admin" ? <div>Qu???n tr??? vi??n v?? ??i???u ph???i vi??n</div> : user.role==="bot" && <div>Bot</div>)}    
                </div>
                {/* {userInfo && user && userInfo._id!== user._id && userInfo.friends && userInfo.friends.length>=0 && userInfo.friends.map((friend)=>(
                    friend.friendId!==user._id ? <div className='addFriendButton interactiveText' onClick={()=>addFriend(user._id)}>Th??m b???n</div> : friend.friendId===user._id && <div className='addFriendButton'>B???n b??</div>
                )) } */}
                {/* {userInfo && user && userInfo._id!== user._id && !userInfo.friends && <div className='addFriendButton interactiveText' onClick={()=>addFriend(user._id)}>Th??m b???n</div>} */}
            </div>
            <div className="row center">
                {/* <label className="bold-text">T??n: ???</label>  */}
                <label className='avatarName'>{name}</label>    
            </div>
            <div className='row center'>
                <label className='avatarUsername'>({username})</label>
            </div>
            <div className='row center'>
                {user && <div className='quote'>"{user.desc}"</div>}
            </div>
            {isBrowser && user && user.backgroundMusic && <div className='row center'>
                <iframe src={`https://www.youtube.com/embed/${getYouTubeLinkId(user.backgroundMusic)}?autoplay=1&mute=0&loop=1&playlist=${getYouTubeLinkId(user.backgroundMusic)}`} type="application/x-shockwave-flash" allowscriptaccess="always" allowFullScreen={false} width="500" height="100" allow='autoplay'></iframe>
            </div>}
            <div className='row center'>
                <div className='navTab'>
                    <div className='tabItem interactiveText noHighlight' onClick={()=>setCurrentTab('info')}>
                        Th??ng tin
                        {currentTab==='info' ? <div className='tabLine'></div> : <div className='emptyLine'></div>}
                    </div>

                    <div className='tabItem interactiveText noHighlight' onClick={()=>setCurrentTab('customization')}>
                        C?? nh??n h??a
                        {currentTab==='customization' ? <div className='tabLine'></div> : <div className='emptyLine'></div>}
                    </div>

                    <div className='tabItem interactiveText noHighlight' onClick={()=>setCurrentTab('stat')}>
                        Th??ng s???
                        {currentTab==='stat' ? <div className='tabLine'></div> : <div className='emptyLine'></div>}
                    </div>

                    <div className='tabItem interactiveText noHighlight' onClick={()=>setCurrentTab('gallery')}>
                        Th?? vi???n ???nh
                        {currentTab==='gallery' ? <div className='tabLine'></div> : <div className='emptyLine'></div>}
                    </div>
                </div>
            </div>
            
            {userCon && userInfo && userInfo._id===userId ? <Chatbox messages={userCon} open={openPopup} handleClosePopup={closePopup} userId={userId}></Chatbox> :
            userInfo._id!==userId && <Chatbox messages={userCon} open={openPopup} handleClosePopup={closePopup} userId={userId} botPOV={true}></Chatbox>}
            {/* {userCon && userCon[0].events[0]} */}
            
            {/* <div id={`rasa-chat-widget`} data-root-element-id={`mainprofile`} data-websocket-url={`http://localhost:5005`} data-width={`1000`} data-avatar-url={`https://cdn.discordapp.com/emojis/967412208323674243.webp`}></div>
            <script src={`https://unpkg.com/@rasahq/rasa-chat`} type={`application/javascript`}></script> */}
            {/* <div className="row center orange-background"> 
                
                {
                    userInfo.role==='admin' ? (
                        <div className="divHoldingLinkButton" title="Whatever your customers ordered appeared here">
                            <Link to="/admin/order_list"  className="admin linkButton">List of Orders</Link>
                        </div>
                    ) : (
                        <div title="Whatever you ordered">
                            <Link to="/profile/order_history" className="linkButton">Order History</Link>
                        </div>
                    )
                }
                {
                    userInfo.role==='user' ? (
                        <div className="divHoldingLinkButton" title="Your citizens list">
                            <Link to="/admin/userList" className="admin linkButton">List of Users</Link>
                        </div>
                    ) : (
                        <div title="Your collections of assets">
                            <Link to="/profile/library" className="linkButton">Library</Link>
                        </div>
                    )
                }
                {
                    userInfo.role==='admin' && (
                        <div className="divHoldingLinkButton" title="Add more product">
                            <Link to="/admin/product/add_product" className="admin linkButton">Add a product<i className="fa fa-plus"></i></Link>
                        </div>)
                }
                {
                    userInfo.role==='admin' && (
                        <div className="divHoldingLinkButton" title="Not Death Note">
                            <Link to="/admin/dev_note" className="admin linkButton">Dev Note<i className="fa fa-book"></i></Link>
                        </div>)
                }
            </div>*/}
            { currentTab==="info" ? <form className={disabled ? "form" : "inputForm"} onSubmit={submitHandler}>
                {/* <div>
                    <h1>{userInfo.name}'s Info {userInfo.role === 'admin' ? (<i className="fa fa-check" title="Signature of Superiority">Admin</i>) : ("(User)")}</h1>
                    
                    {user && <h1 title="Your account's birth date"><DateComponent passedDate = {user.createdAt}><i className="fas fa-clock"></i>Joined </DateComponent></h1>}
                </div> */}
                {/* <div title="How much you have spent so far">
                    {
                        loadingSpending ? (<LoadingBox></LoadingBox>) : (<MessageBox variant="error">{errorSpending}</MessageBox>)
                        && ((
                            userInfo && userInfo.isAdmin===false && (userSpending.totalMoneySpent ?
                            (<h2><i className="fas fa-money"></i>Total Money Spent: ${userSpending.totalMoneySpent}</h2>)
                            : (<h2>Total Money Spent: $0</h2>))
                        ))
                    }
                </div> */}
                
                <div>
                    {/* {
                        userInfo.isAdmin === true ? (<div className="row left" title="Well you're the administrator so..."><h2><i className="fas fa-medal"></i>Achievement:</h2> <label className="yellow-text">????Admin????</label></div>) : 
                        (
                            <div title="The more you buy the more achievements you're gonna unlock">{loadingSpending ? (<LoadingBox></LoadingBox>) : (<MessageBox variant="error">{errorSpending}</MessageBox>)
                            &&
                            (<div className="row left"><label className="bold-text"><i className="fas fa-medal"></i>Achievement: ???</label> {
                                (userSpending.totalMoneySpent > 2000) ? (<label className="yellow-text">????MrBeast???? (lv. 7)</label>) :
                            (userSpending.totalMoneySpent > 1000) ? (<label className="yellow-text">????Rich Kid???? (lv. 6)</label>) :
                            (userSpending.totalMoneySpent > 500) ? (<label className="yellow-text">???Hi5 Gang??? (lv. 5)</label>)  : 
                            (userSpending.totalMoneySpent > 200) ? (<label className="yellow-text">????2YK???? (lv. 4)</label>) :
                            (userSpending.totalMoneySpent > 100) ? (<label className="yellow-text">????One Hundred Club???? (lv. 3)</label>) :
                            (userSpending.totalMoneySpent > 50)? (<label className="yellow-text">????Nice Customer???? (lv. 2)</label>) :
                            (userSpending.totalMoneySpent > 0) && (<label className="yellow-text">????Money Spender???? (lv. 1)</label>)}</div>
                        )}</div>)
                            
                            
                    } */}
                    
                    
                </div>   
                
                {
                    loadingUser? <LoadingBox></LoadingBox>
                    : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox>
                    :
                    <div>
                        <div>
                            {
                                loadingUpdateProfile ? (<LoadingBox></LoadingBox>)
                            
                                : errorUpdateProfile ? (<MessageBox variant="error">{errorUpdateProfile}</MessageBox>)
                            
                                : successUpdateProfile && (<MessageBox variant="info">Profile Updated</MessageBox>)
                            }
                        </div>
                        
                        
                        {disabled ?
                        (
                            <div>
                                <div className='row'>
                                    <div className='col-0'>
                                        <div className="row left">
                                            <i className='fa fa-envelope'></i><label className="bold-text">Email: ???</label> {email}
                                        </div>
                                        <div className="row left">
                                            <i className='fa fa-phone'></i><label className="bold-text">S??? ??i???n tho???i: ???</label> {phoneNumber}
                                        </div>
                                        <div className="row left">
                                            <i className='fa fa-home'></i><label className="bold-text">?????a ch???: ???</label> {address}
                                        </div>
                                    </div>
                                    <div className='col-0'>
                                        <div className="row left">
                                            {gender==="Nam" ? <i className='fa fa-mars'></i>
                                        : gender === "N???" ? <i className='fa fa-venus'></i> :
                                        gender === "Kh??c" && <i className='fa fa-intersex'></i>
                                        }<label className="bold-text">Gi???i t??nh: ???</label> {gender}
                                        </div>
                                        <div className="row left">
                                            <i className='fa fa-birthday-cake'></i><label className="bold-text">Ng??y sinh: ???</label> <DateComponent isbirthDate = "yes" passedDate = {birthDate}></DateComponent>
                                        </div>
                                        <div className="row left">
                                            <i className='fa fa-tasks'></i><label className="bold-text">Ngh??? nghi???p: ???</label> {occupation}
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <hr></hr>
                                {user && user.role!=="bot" && <>
                                <div className="row center">
                                    <label className="bold-text">Th??ng tin MentalBot thu th???p t??? b???n: </label> 
                                </div>
                                <div className='row left'>
                                    <label className='bold-text'>L???ch s??? tr?? chuy???n: ???</label> {userInfo && (userInfo._id === userId || userInfo.role==="admin") &&<div className='row center'>
                                        <div className='interactiveText' onClick={loadConversationHistory}> xem</div>
                                    </div>}
                                </div>
                                {/* <div className='row left'>
                                    <label className='bold-text'>Th?? vi???n h??nh: ???</label> <label onClick={()=>setCurrentTab("gallery")} className='interactiveText'>xem</label>
                                </div> */}
                                <div className="row left">
                                    <label className="bold-text">T??m tr???ng: ???</label> {mood}
                                </div>
                                <div className="row left">
                                    <label className="bold-text">V???n ?????: ???</label> <div style={{wordBreak: "break-all"}}>{issues}</div>
                                </div>
                                </>}
                                <div>
                                    {/* {
                                        date
                                    } */}
                                </div>
                            </div>
                            
                        )
                        :
                        (<><label htmlFor="name">
                            T??n: 
                        </label>
                        <input className='inputField' id="name" type="text" placeholder="Nh???p t??n" value={user.name} value={name} onChange={(e)=> setName(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        <label htmlFor="username">
                            Username: 
                        </label>
                        <input className='inputField' id="username" type="text" placeholder="Nh???p username" value={user.username} value={username} onChange={(e)=> setUsername(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        <label htmlFor="email">
                            Email: 
                        </label>
                        <input className='inputField' id="email" type="email" placeholder="Nh???p email" value={user.email} value={email} onChange={(e)=> setEmail(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        <label htmlFor="password">
                            M???t kh???u: 
                        </label>
                        <input className='inputField' id="password" type="password" placeholder="hidden" onChange={(e)=> setPassword(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        <label htmlFor="confirmPassword">
                            X??c nh???n m???t kh???u: 
                        </label>
                        <input className='inputField' id="confirmPassword" type="password" placeholder="hidden" onChange={(e)=> setConfirmPassword(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        <label htmlFor="gender">
                            Gi???i t??nh: 
                        </label>
                        {/* <input id="gender" type="text" placeholder="Enter Your gender here" value={user.gender} value={gender} onChange={(e)=> setGender(e.target.value)} disabled={disabled}>
                        </input> */}
                        {/* <select className='' id="gender" value={user.gender} value={gender} onChange={(e)=> setGender(e.target.value)} disabled={disabled} required={true}>
                            <option value="" hidden>Ch???n gi???i t??nh</option>
                            <option value="Nam">Nam</option>
                            <option value="N???">N???</option>
                            <option value="Kh??c">3D</option>
                        </select> */}
                        <Select style={{width: '60rem'}} dropdownHeight="10rem" placeholder='Ch???n gi???i t??nh' options={genders.map(gen=>({value: gen._id, label: gen.name}))} onChange={setTheGender} required={false}/>
                        <label htmlFor="birthDate">
                            Ng??y sinh: 
                        </label>
                        {/* <input id="birthDate" type="text" placeholder="Enter Your bday here" value={user.birthDate} value={birthDate} onChange={(e)=> setbirthDate(e.target.value)} disabled={disabled}>
                        </input> */}
                        {/* <input type="date" id="birthDate2" name="birthDate2" onChange={(e)=> setGender(e.target.value)}></input>
                         */}
                        
                        <DatePicker
                            className='inputField'
                            dateFormat="dd/MM/yyyy"
                            selected={birthDate}
                            minDate={new Date("01-01-1950")}
                            maxDate={new Date("01-01-2003")}
                            onChange={birthDate => setbirthDate(birthDate)}
                            />
                        <label htmlFor="phoneNumber">
                            S??? ??i???n tho???i:
                        </label>
                        <input className='inputField' id="phoneNumber" type="text" placeholder="hidden" value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        <label htmlFor="address">
                        ?????a ch???: 
                        </label>
                        <input className='inputField' id="address" type="text" placeholder="Nh???p ?????a ch???" value={address} onChange={(e)=> setAddress(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        <label htmlFor="occupation">
                        Ngh??? nghi???p: 
                        </label>
                        <input className='inputField' id="occupation" type="text" placeholder="Nh???p ngh??? nghi???p" value={occupation} onChange={(e)=> setOccupation(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        </>)}
                        {userId && userInfo && userInfo._id === userId &&
                        <div className="row">
                            <div className="">
                                <button className="clickableIcon" type="button" onClick={enableEdit}>
                                {editButtonName? (<label><i className="fa fa-pencil"></i></label>)
                                : (<label><i className="fa fa-close"></i></label>)
                                }
                                </button>
                            </div>
                            {!editButtonName && <div className="col-0">
                                <button className="clickableIcon" type="button" onClick={customizationSubmitHandler} disabled={disabled}>
                                    <label><i className="fa fa-send"></i></label>
                                </button>
                            </div>}
                        </div>}
                        
                        
                        
                        
                    </div>
                }
            </form> : currentTab === "stat" ? 
            <form>
                {loadingStat ? <LoadingBox></LoadingBox> : errorStat ? <MessageBox variant="error">{errorStat}</MessageBox> :
                msgStat &&
                <div>
                    <div className='row center'>
                        {user && user.role!=="bot" ? <div className='col-0'>
                            <div className='row left'>
                                <i className='fa fa-calendar'></i><label className='bold-text'>??i???m: ???</label> {userForumStat && userForumStat.userScore}
                            </div>
                            <div className='row left'>
                                <i className='fa fa-calendar'></i><label className='bold-text'>Ng??y tham gia: ???</label> {user && <DateComponent passedDate={user.createdAt} isbirthDate={false}></DateComponent>}
                            </div>
                            <div className="row left">
                                <i className='fa fa-comment'></i><label className="bold-text">???? nh???n ??? </label> {msgStat.userMsgCount} ???tin nh???n
                            </div>
                            <div className="row left">
                                <i className='fa fa-comments'></i><label className="bold-text">C?? ??? </label> {msgStat.botMsgCount} ???tin nh???n c???a bot
                            </div>
                            {/* <div className="row left">
                                <i className='fa fa-home'></i><label className="bold-text">Lorem ipsum: ???</label> {address}
                            </div> */}
                        </div>
                        : <div className='row center'>
                            <div className='col-2'>
                                <div className='row left'>
                                    <i className='fa fa-date'></i><label className='bold-text'>Ng??y tham gia: ???</label> {user && <DateComponent passedDate={user.createdAt} isbirthDate={false}></DateComponent>}
                                </div>
                            </div>
                        </div>    
                    
                    }
                        {/* <div className='col-0'>
                            <div className="row left">
                                {gender==="Nam" ? <i className='fa fa-mars'></i>
                            : gender === "N???" ? <i className='fa fa-venus'></i> :
                            gender === "Kh??c" && <i className='fa fa-intersex'></i>
                            }<label className="bold-text">Gi???i t??nh: ???</label> {gender}
                            </div>
                            <div className="row left">
                                <i className='fa fa-birthday-cake'></i><label className="bold-text">Ng??y sinh: ???</label> <DateComponent isbirthDate = "yes" passedDate = {birthDate}></DateComponent>
                            </div>
                            <div className="row left">
                                <i className='fa fa-tasks'></i><label className="bold-text">Ngh??? nghi???p: ???</label> {occupation}
                            </div>
                        </div>  */}
                        <hr></hr>
                    </div>
                    {userForumStat && <div>B??i vi???t ({userForumStat.posts.length})</div>}
                    <div className='col-1'>
                        {userForumStat && userForumStat.posts && userForumStat.posts.map((post)=>(
                                <div className='row'>
                                    <div className='interactiveText' onClick={()=>navigate(`/forum/post/${post._id}`)}>
                                        <i className='fa fa-arrow-right'></i> {post.title}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>}
            </form>
            : currentTab==='customization' ?
            <form className={disabled ? "form" : "inputForm"}>
                {
                    loadingUser? <LoadingBox></LoadingBox>
                    : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox>
                    :
                    <div>
                        <div>
                            {
                                loadingUpdateProfile ? (<LoadingBox></LoadingBox>)
                            
                                : errorUpdateProfile ? (<MessageBox variant="error">{errorUpdateProfile}</MessageBox>)
                            
                                : successUpdateProfile && (<MessageBox variant="info">Profile Updated</MessageBox>)
                            }
                        </div>
                        
                        
                        {disabled ?
                        (
                            <div>
                                {/* <div className='row'>
                                    <div className='col-1'>
                                    </div>
                                    <div className='col-1'>
                                    </div>
                                </div> */}
                                <div className='row left'>
                                    <div className='col-1'>
                                        <div className='row top'>Gi???i thi???u v??? b???n th??n:</div>
                                    </div>
                                    <div className='col-1'>
                                        {user && <div className='quote'>"{user.desc}"</div>}
                                    </div>
                                </div>
                                <hr></hr>
                                <div className='row left'>
                                    <div className='col-1'>
                                        <div className='row top'>???nh ?????i di???n:</div>
                                    </div>
                                    <div className='col-1'>
                                        {user && user.avatar && <a href={user.avatar} target="_blank"><img className='displayImage' src={user.avatar}></img></a>}
                                    </div>
                                </div>
                                <hr></hr>
                                <div className='row left'>
                                    <div className='col-1'>
                                        <div className='row top'>Background:</div>
                                    </div>
                                    <div className='col-1'>
                                        {user && user.backgroundImage && <a href={user.backgroundImage} target="_blank"><img className='displayImage' src={user.backgroundImage}></img></a>}
                                        
                                    </div>
                                </div>
                                <hr></hr>
                                <div className='row left'>
                                    <div className='col-1'>
                                        <div className='row top'>Nh???c n???n:</div>
                                    </div>
                                    <div className='col-1'>
                                        {isBrowser && user && user.backgroundMusic &&
                                        <iframe src={`https://www.youtube.com/embed/${getYouTubeLinkId(user.backgroundMusic)}?mute=0&loop=1`} type="application/x-shockwave-flash" allowscriptaccess="always" allowFullScreen={false} width="300" height="100" allow='autoplay'></iframe>
                                        }
                                        {isMobile && "T??nh n??ng n??y ch??? ???????c h??? tr??? tr??n tr??nh duy???t m??y t??nh"}
                                    </div>
                                </div>
                                
                            </div>
                            
                        )
                        : 
                        (<>
                        <div>
                        <label htmlFor="avatar">
                        ???nh ?????i di???n (kh??ng b???t bu???c)</label>
                            <input type="text" id="avatar" placeholder="Nh???p url ???nh ?????i di???n" className='inputField' value={avatar}
                                onChange={e => setAvatar(e.target.value)}>
                                </input>
                        </div>
                        <div></div>
                        <div>
                        <label htmlFor="desc">
                        M?? t??? ng???n g???n v??? b???n th??n (kh??ng b???t bu???c)</label>
                            <input type="text" id="desc" placeholder="Nh???p m?? t???" className='inputField' value={desc}
                                onChange={e => setDesc(e.target.value)}>
                                </input>
                        </div>
                        <div>
                        <label htmlFor="backgroundImage">
                        Background (kh??ng b???t bu???c)</label>
                            <input type="text" id="backgroundImage" placeholder="Nh???p ???????ng d???n cho background c?? nh??n" className='inputField' value={backgroundImage}
                                onChange={e => setBackgroundImage(e.target.value)}>
                                </input>
                        </div>
                        <div>
                        <div>
                            <div className='row'>?????t background cho c??? trang?</div>
                            <div className='row'>
                                <Select style={{width: '60rem'}} dropdownHeight="10rem" placeholder='' options={bools.map(bool=>({value: bool._id, label: bool.name}))} onChange={setTheBoolean} required={false}/>
                            </div>
                        </div>
                        <label htmlFor="backgroundMusic">
                        Nh???c Background t??? link youtube (kh??ng b???t bu???c)</label>
                            <input type="text" id="backgroundMusic" placeholder="Nh???p ???????ng d???n cho video youtube" className='inputField' value={backgroundMusic}
                                onChange={e => setBackgroundMusic(e.target.value)}>
                                </input>
                        </div>
                        </>)}
                        {userId && userInfo && userInfo._id === userId &&
                        <div className="row">
                            <div className="">
                                <button className="clickableIcon" type="button" onClick={enableEdit}>
                                {editButtonName? (<label><i className="fa fa-pencil"></i></label>)
                                : (<label><i className="fa fa-close"></i></label>)
                                }
                                </button>
                            </div>
                            {!editButtonName && <div className="col-0">
                                <button className="clickableIcon" type="button" onClick={customizationSubmitHandler} disabled={disabled}>
                                    <label><i className="fa fa-send"></i></label>
                                </button>
                            </div>}
                        </div>}
                    </div>
                }
            </form> :
            currentTab === "gallery" &&
            <div className='scrollableDiv'>
                {userCon && userInfo && <Gallery messages={userCon} userId={userId} botPOV={false}></Gallery>}
            </div>
            }
        </div>
    )
}