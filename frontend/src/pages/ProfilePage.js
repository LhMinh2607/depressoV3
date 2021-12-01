import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { detailsOfUser, updateUserProfile } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import DateComponent from '../components/DateComponent';
import DatePicker from 'react-datepicker'; //pre-made from react-datepicker
//import 'react-datepicker/dist/react-datepicker.css'; 


export default function ProfilePage(props){
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [gender, setGender] = useState();
    const [birthDate, setBirthDate] = useState();
    const [phoneNumber, setPhoneNumber] = useState('');
    

    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const userDetail = useSelector(state => state.userDetail);
    const {loading: loadingUser, error: errorUser, user} = userDetail;
    // const [date, setDate] = useState("");   
    
    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success: successUpdateProfile, error: errorUpdateProfile, loading: loadingUpdateProfile, } = userUpdateProfile;
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Mật khẩu và xác nhận mật phải giống nhau!');
        }else{
            //alert(birthDate);
            dispatch(updateUserProfile({userId: user._id, name, email, password, gender, birthDate, phoneNumber}));
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


    // const setTheBirthDate = (e) =>{
    //     setBirthDate(e.target.value);
    // }
    

    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        //dispatch(listTotalMoneySpent(userInfo._id));
        //dispatch({type: CLEAR_ALL}); //a simple line of code that solved the worst bug in my project. That later it also caused a loop bug. Thanks so much dickhead.
        if(!user){
           // dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailsOfUser(userInfo._id));
        }else{
            setName(user.name);
            setEmail(user.email);
            setBirthDate(user.birthDate);
            setGender(user.gender);
            setBirthDate(new Date(user.birthDate));
            setPhoneNumber(user.phoneNumber);
        }
    }, [dispatch, userInfo._id, user]);
    return (
        <div>
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
                                    <label className="bold-text">Email: ‎</label> {email}
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Giới tính: ‎</label> {gender}
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Ngày sinh: ‎</label> <DateComponent isBirthDate = "yes" passedDate = {birthDate}></DateComponent>
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Số điện thoại: ‎</label> {phoneNumber}
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
                        <input id="name" type="text" placeholder="Enter Your Name here" value={user.name} value={name} onChange={(e)=> setName(e.target.value)} disabled={disabled}>
                        </input>
                        <label htmlFor="email">
                            Email: 
                        </label>
                        <input id="email" type="email" placeholder="Enter Your Email here" value={user.email} value={email} onChange={(e)=> setEmail(e.target.value)} disabled={disabled}>
                        </input>
                        <label htmlFor="password">
                            Mật khẩu: 
                        </label>
                        <input id="password" type="password" placeholder="hidden" onChange={(e)=> setPassword(e.target.value)} disabled={disabled}>
                        </input>
                        <label htmlFor="confirmPassword">
                            Xác nhận mật khẩu: 
                        </label>
                        <input id="confirmPassword" type="password" placeholder="hidden" onChange={(e)=> setConfirmPassword(e.target.value)} disabled={disabled}>
                        </input>
                        <label htmlFor="gender">
                            Giới tính: 
                        </label>
                        {/* <input id="gender" type="text" placeholder="Enter Your gender here" value={user.gender} value={gender} onChange={(e)=> setGender(e.target.value)} disabled={disabled}>
                        </input> */}
                        <select id="gender" value={user.gender} value={gender} onChange={(e)=> setGender(e.target.value)} disabled={disabled}>
                            <option value="" hidden>Select your gender</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="others">3D</option>
                        </select>
                        <label htmlFor="birthDate">
                            Ngày sinh: 
                        </label>
                        {/* <input id="birthDate" type="text" placeholder="Enter Your bday here" value={user.birthDate} value={birthDate} onChange={(e)=> setBirthDate(e.target.value)} disabled={disabled}>
                        </input> */}
                        {/* <input type="date" id="birthDate2" name="birthDate2" onChange={(e)=> setGender(e.target.value)}></input>
                         */}
                        
                        <DatePicker

                            dateFormat="dd/MM/yyyy"
                            selected={birthDate}
                            minDate={new Date("01-01-1950")}
                            maxDate={new Date("01-01-2003")}
                            onChange={birthDate => setBirthDate(birthDate)}
                            />
                        <label htmlFor="phoneNumber">
                            Số điện thoại:
                        </label>
                        <input id="phoneNumber" type="text" placeholder="hidden" value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} disabled={disabled}>
                        </input>
                        </>)}
                        <div className="bottom-button-div-group">
                            <div className="bottom-button-div">
                                <button className="primary" type="button" onClick={enableEdit}>
                                {editButtonName? (<label>EDIT</label>)
                                : (<label>CLOSE</label>)
                                }
                                </button>
                            </div>
                            {!editButtonName && <div className="bottom-button-div">
                                <button className="primary" type="submit" disabled={disabled}>
                                    <label>SUBMIT</label>
                                </button>
                            </div>}
                            
                        </div>
                        
                        
                        
                        
                    </div>
                }
            </form>
        </div>
    )
}