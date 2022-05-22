import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { detailsOfUser, getUserConversationHistory, updateUserProfile } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import DateComponent from '../components/DateComponent';
import DatePicker from 'react-datepicker'; //pre-made from react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; 
import Widget from 'rasa-webchat';
import Chatbox from '../components/Chatbox';
import Select from 'react-dropdown-select';

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

    var params = useParams();
    var userId = params.id;

    const genders = [
        {_id: "Nam", name: "Nam"},
        {_id: "Nữ", name: "Nữ"},
        {_id: "Khác", name: "3D"},
    ]
    
    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success: successUpdateProfile, error: errorUpdateProfile, loading: loadingUpdateProfile, } = userUpdateProfile;
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Mật khẩu và xác nhận mật phải giống nhau!');
        }else{
            //alert(birthDate);
            dispatch(updateUserProfile({userId: user._id, name, username, email, password, gender, birthDate, phoneNumber, address, occupation}));
        }
    };


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
    const socketUrl = "https://3990-27-2-17-107.ngrok.io";


    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        //dispatch(listTotalMoneySpent(userInfo._id));
        //dispatch({type: CLEAR_ALL}); //a simple line of code that solved the worst bug in my project. That later it also caused a loop bug. Thanks so much dickhead.
        setGender("Gay")
        if(!user){
           // dispatch({type: USER_UPDATE_PROFILE_RESET});
           dispatch(detailsOfUser(userId));
        }else if(user._id!==userId){
            dispatch(detailsOfUser(userId));
        }
        if(user){
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
            dispatch(getUserConversationHistory(userId));
        }
    }, [dispatch, userInfo._id, user]);
    return (
        <div id='mainprofile'>
            <button className='primary' onClick={loadConversationHistory}>HIỆN LỊCH SỬ TRÒ CHUYỆN</button>
            {userCon && userInfo && userInfo._id===userId ? <Chatbox messages={userCon} open={openPopup} handleClosePopup={closePopup} userId={userId}></Chatbox> :
            userInfo._id!==userId && <Chatbox messages={userCon} open={openPopup} handleClosePopup={closePopup} userId={userId} botPOV={true}></Chatbox>}
            {/* {userCon && userCon[0].events[0]} */}
            
            {userInfo && userInfo._id===userId && <Widget
                initPayload={userInfo._id}
                socketUrl={socketUrl}
                customData={{"language": "vi"}} // arbitrary custom data. Stay minimal as this will be added to the socket
                title={"MentalBot"}
                showFullScreenButton={true}
                displayUnreadCount={true}
                showMessageDate={true}
                subtitle={"🟢Đang rảnh"}
                inputTextFieldHint={"Nhắn tin cho bot"}
                profileAvatar={"https://cdn.discordapp.com/emojis/967412208323674243.webp?size=48&quality=lossless"}
                // openLauncherImage={""}
                />
                }
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
            <form className="form" onSubmit={submitHandler}>
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
                        userInfo.isAdmin === true ? (<div className="row left" title="Well you're the administrator so..."><h2><i className="fas fa-medal"></i>Achievement:</h2> <label className="yellow-text">🤵Admin🤵</label></div>) : 
                        (
                            <div title="The more you buy the more achievements you're gonna unlock">{loadingSpending ? (<LoadingBox></LoadingBox>) : (<MessageBox variant="error">{errorSpending}</MessageBox>)
                            &&
                            (<div className="row left"><label className="bold-text"><i className="fas fa-medal"></i>Achievement: ‎</label> {
                                (userSpending.totalMoneySpent > 2000) ? (<label className="yellow-text">💰MrBeast💰 (lv. 7)</label>) :
                            (userSpending.totalMoneySpent > 1000) ? (<label className="yellow-text">🤑Rich Kid🤑 (lv. 6)</label>) :
                            (userSpending.totalMoneySpent > 500) ? (<label className="yellow-text">✋Hi5 Gang✋ (lv. 5)</label>)  : 
                            (userSpending.totalMoneySpent > 200) ? (<label className="yellow-text">💷2YK💷 (lv. 4)</label>) :
                            (userSpending.totalMoneySpent > 100) ? (<label className="yellow-text">💯One Hundred Club💯 (lv. 3)</label>) :
                            (userSpending.totalMoneySpent > 50)? (<label className="yellow-text">🤝Nice Customer🤝 (lv. 2)</label>) :
                            (userSpending.totalMoneySpent > 0) && (<label className="yellow-text">💸Money Spender💸 (lv. 1)</label>)}</div>
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
                                <div className="row left">
                                    <label className="bold-text">Tên: ‎</label> <label>{name}</label>
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Username: ‎</label> <label>{username}</label>
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Email: ‎</label> {email}
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Giới tính: ‎</label> {gender}
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Ngày sinh: ‎</label> <DateComponent isbirthDate = "yes" passedDate = {birthDate}></DateComponent>
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Số điện thoại: ‎</label> {phoneNumber}
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Địa chỉ: ‎</label> {address}
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Nghề nghiệp: ‎</label> {occupation}
                                </div>
                                <hr></hr>
                                <div className="row center">
                                    <label className="bold-text">Thông tin MentalBot thu thập từ bạn: </label> 
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Tâm trạng: ‎</label> {mood}
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Vấn đề: ‎</label> {issues}
                                </div>
                                <div>
                                    {/* {
                                        date
                                    } */}
                                </div>
                            </div>
                            
                        )
                        :
                        (<><label htmlFor="name">
                            Tên: 
                        </label>
                        <input className='basic-slide' id="name" type="text" placeholder="Nhập tên" value={user.name} value={name} onChange={(e)=> setName(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        <label htmlFor="username">
                            Username: 
                        </label>
                        <input className='basic-slide' id="username" type="text" placeholder="Nhập username" value={user.username} value={username} onChange={(e)=> setUsername(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        <label htmlFor="email">
                            Email: 
                        </label>
                        <input className='basic-slide' id="email" type="email" placeholder="Nhập email" value={user.email} value={email} onChange={(e)=> setEmail(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        <label htmlFor="password">
                            Mật khẩu: 
                        </label>
                        <input className='basic-slide' id="password" type="password" placeholder="hidden" onChange={(e)=> setPassword(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        <label htmlFor="confirmPassword">
                            Xác nhận mật khẩu: 
                        </label>
                        <input className='basic-slide' id="confirmPassword" type="password" placeholder="hidden" onChange={(e)=> setConfirmPassword(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        <label htmlFor="gender">
                            Giới tính: 
                        </label>
                        {/* <input id="gender" type="text" placeholder="Enter Your gender here" value={user.gender} value={gender} onChange={(e)=> setGender(e.target.value)} disabled={disabled}>
                        </input> */}
                        {/* <select className='' id="gender" value={user.gender} value={gender} onChange={(e)=> setGender(e.target.value)} disabled={disabled} required={true}>
                            <option value="" hidden>Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">3D</option>
                        </select> */}
                        <Select style={{width: '60rem'}} dropdownHeight="10rem" placeholder='Chọn giới tính' options={genders.map(gen=>({value: gen._id, label: gen.name}))} onChange={values => setGender(values)} required={true}/>
                        <label htmlFor="birthDate">
                            Ngày sinh: 
                        </label>
                        {/* <input id="birthDate" type="text" placeholder="Enter Your bday here" value={user.birthDate} value={birthDate} onChange={(e)=> setbirthDate(e.target.value)} disabled={disabled}>
                        </input> */}
                        {/* <input type="date" id="birthDate2" name="birthDate2" onChange={(e)=> setGender(e.target.value)}></input>
                         */}
                        
                        <DatePicker
                            className='basic-slide'
                            dateFormat="dd/MM/yyyy"
                            selected={birthDate}
                            minDate={new Date("01-01-1950")}
                            maxDate={new Date("01-01-2003")}
                            onChange={birthDate => setbirthDate(birthDate)}
                            />
                        <label htmlFor="phoneNumber">
                            Số điện thoại:
                        </label>
                        <input className='basic-slide' id="phoneNumber" type="text" placeholder="hidden" value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        <label htmlFor="address">
                        Địa chỉ: 
                        </label>
                        <input className='basic-slide' id="address" type="text" placeholder="Nhập địa chỉ" value={address} onChange={(e)=> setAddress(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        <label htmlFor="occupation">
                        Nghề nghiệp: 
                        </label>
                        <input className='basic-slide' id="occupation" type="text" placeholder="Nhập nghề nghiệp" value={occupation} onChange={(e)=> setOccupation(e.target.value)} disabled={disabled} required={true}>
                        </input>
                        </>)}
                        {userId && userInfo && userInfo._id === userId &&
                        <div className="bottom-button-div-group">
                            <div className="bottom-button-div">
                                <button className="primary" type="button" onClick={enableEdit}>
                                {editButtonName? (<label>SỬA</label>)
                                : (<label>HỦY</label>)
                                }
                                </button>
                            </div>
                            {!editButtonName && <div className="bottom-button-div">
                                <button className="primary" type="submit" disabled={disabled}>
                                    <label>GỬI</label>
                                </button>
                            </div>}
                            
                        </div>}
                        
                        
                        
                        
                    </div>
                }
            </form>
        </div>
    )
}