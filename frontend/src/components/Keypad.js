import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cancelCall, getAllHistory, logACall, makeACall } from '../actions/callActions';
import JsSIP from "jssip";
// import { CALL_CONNECTED, CALL_DISCONNECTED } from '../consts.js/CallConsts';
import PopupMessageBox from './PopupMessageBox';
import Timer from './Timer';
import OptionDialogBox from './OptionDialogBox';
import { getAContact, getAllContact, removeAContact, saveAContact, searchContact } from '../actions/contactActions';
import { CALL_DISCONNECTED, CALL_LOG_RESET, CALL_RESET, CONTACT_SAVE_RESET } from '../constants/CallConsts';
import DateComponent from '../components/DateComponent';
import { useStopwatch  } from 'react-timer-hook'; //from react-timer-hook
import TimeConverter from './TimeConverter';
import { detailsOfUserBasedOnPhone, signin, signup } from '../actions/userAction';
import YesNoBox from './YesNoBox';
import IndependentMessageBox from './IndependantMessageBox';


export default function Keypad(props) {

  const {setOpenKeyPad, currentNumber, fullname} = props;

  const [num, setNum] = useState('');
  const [name, setName] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [popupType, setPopupType] = useState('info');
  const [endCallSession, setEndCallSession] = useState(false);
  const [keypadMode, setKeypadMode] = useState('keypad');
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [messageBoxContent, setMessageBoxContent] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [contactName, setContactName] = useState('');
  const [addContact, setAddContact] = useState(false);
  const [callStartedBy, setCallStartedBy] = useState('You');
  const [callEndedBy, setCallEndedBy] = useState('');
  const [totalLength, setTotalLength] = useState(0);
  const [signinBox, setSigninBox] = useState(false);
  const [uri, setURI] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [signupBox, setSignupBox] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [keyword, setKeyword] = useState('');

  // const [seconds, setSeconds] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [hours, setHours] = useState(0);
  // const [days, setDays] = useState(0);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  const stop = () =>{
    pause();
  }

  const callingStatus = useSelector(state=>state.callingStatus);
  const {loading: loadingCall, error: errorCall, connected} = callingStatus;

  const contactSaving = useSelector(state=>state.contactSaving);
  const {loading: loadingSaving, error: errorSaving, contact} = contactSaving;
  
  const contactList = useSelector(state=>state.contactList);
  const {loading: loadingList, error: errorList, contacts} = contactList;

  const userList = useSelector(state=>state.userList);
  const {loading: loadingUserList, error: errorUserList, users} = userList;

  const contactDetail = useSelector(state=>state.contactDetail);
  const {loading: loadingDetail, error: errorDetail, contactInfo} = contactDetail;

  const userDetailByPhone = useSelector(state=>state.userDetailByPhone);
  const {loading: loadingUserDetail, error: errorUserDetail, user: userContact} = userDetailByPhone;

  const historyList = useSelector(state=>state.historyList);
  const {loading: loadingHistory, error: errorHistory, history} = historyList;

  const loggingACall = useSelector(state=>state.loggingACall);
  const {loading: loadingLog, error: errorLog, log} = loggingACall

  const userSignin = useSelector(state=>state.userSignin);
  const {loading: loadingSignin, error: errorSignin, userInfo} = userSignin;

  const contactSearching = useSelector(state=>state.contactSearching);
  const {loading: loadingSearch, error: errorSearch, results}= contactSearching;
  
  

  

  if(userInfo){

    //wss://sbc03.tel4vn.com:7444
    const websocket = process.env.REACT_APP_WEBSOCKET;
    const account = process.env.REACT_APP_ACCOUNT;
    const pwd = process.env.REACT_APP_PASSWD;
    var socket = new JsSIP.WebSocketInterface(websocket);
    var configuration = {
      sockets  : [ socket ],
      // uri      : userInfo.uri,
      uri: account,
      // uri: process.env.REACT_APP_ACCOUNT,
      // password : process.env.REACT_APP_PASSWD,
      password: pwd,
      session_timers: false,
      display_name: name,
    };

    var ua = new JsSIP.UA(configuration);

    

    JsSIP.debug.disable('JsSIP:*');

    ua.on('newRTCSession', function(e){ 
      var remoteAudio =  window.document.createElement('audio');
      window.document.body.appendChild(remoteAudio);

      var rtcSession = e.session;
      

      rtcSession.connection.addEventListener('addstream',function(e) {  // Or addtrack
        remoteAudio.srcObject = e.stream;
        remoteAudio.play();
      });

      // rtcSession.connection.addEventListener('removestream',function(e) { 
      //   alert('yes');
      //   remoteAudio.srcObject = null;
      //   remoteAudio.stop();
      //   document.getElementById("invisi").style.visibility = "hidden";
      // });

      // rtcSession.connection.addEventListener('ended', function(e){
      //   alert('end');
      //   document.getElementById("invisi").style.visibility = "hidden";
      // })

      document.getElementById("endButton").addEventListener('click',function(e) { 
        // console.log("loading="+loadingCall);
        // console.log("loading="+connected);
        // console.log("loading="+log._id);
        // cancel(rtcSession);
        rtcSession.terminate();
        // document.getElementById("invisi").style.visibility = "hidden";
        // var elem = document.getElementsByTagName("audio"); 
        // elem.parentNode.removeChild(elem);
      })
      
      rtcSession.on('ended', (e) => {
        document.getElementById("invisi").style.visibility = "hidden";
      })

      rtcSession.on('failed', (e) => {
        document.getElementById("invisi").style.visibility = "hidden";
      })
      
      
      // rtcSession.on('connection', function(e2) {
      //     alert(' *** connection', e.originator, e2, e.connection);

      //     // onaddstream
      //     e2.connection.onaddstream = function(e3) {
      //         alert(' *** onaddstream', e.originator, e3);
      //         remoteAudio.srcObject = e3.stream;
      //         remoteAudio.play();
      //     }
      //     onremovestream
      //     e2.connection.onremovestream = function(e3) {
      //         alert(' *** onremovestream', e.originator, e3);
      //         remoteAudio.srcObject = null;
      //         remoteAudio.stop();
      //     }
      // });
      // alert(JSON.stringify(rtcSession));
      // if(rtcSession.getReceivers().length > 0) {
      //     remoteAudio.src = window.URL.createObjectURL(rtcSession.getReceivers()[0]);
      //     remoteAudio.play();
      // }
    });
  }

  let audioBeep = new Audio("/assets/beep.mp3");
  let audioAmbientClick = new Audio("/assets/AmbientClick.mp3");
  let audioMenuSlectionClick = new Audio("/assets/MenuSelectionClick.mp3");
  


  const input = (value) => { //Keypad
    audioBeep.play();
    // document.getElementById('audioBeep').play();
    var re = new RegExp("[0-9]");
    console.log(num.length);
    setNum(num+value);
    
    if(num.length+1>10){
      setMessageBoxContent("10 Digit-number only");
      setPopupType('error');
      setOpenPopup(true);
      setNum(num);
    }else if(num.length+1===10 && re.test(num+value)){
      dispatch(detailsOfUserBasedOnPhone(num+value));
    }
    // alert(num+value);
  }

  const backspace = () => { //Keypad
    audioBeep.play();
    audioAmbientClick.play();
    setNum("");
  }

  const closePopup = () =>{
    setOpenPopup(false);
    audioMenuSlectionClick.play();
    dispatch({type: CONTACT_SAVE_RESET});
  }

  const closeSigninPopup = () =>{
    setOpenPopup(false);
    audioMenuSlectionClick.play();
  }


  const cancel = () =>{
    audioAmbientClick.play();
    // console.log(log._id);
    // console.log("length="+totalLength);
    console.log("time="+hours+":"+minutes+":"+seconds);
    if(log){
      stop();
      let totalSeconds = 0;
      let totalMinutes = 0;
      let totalTime = 0;
      totalSeconds=seconds;
      totalMinutes=totalSeconds+(minutes*60);
      totalTime=totalMinutes+hours*3600;
      console.log(hours+":"+minutes+":"+seconds);
      console.log("totalTime = "+totalTime);
      // setTotalLength(totalTime);
      dispatch(cancelCall("You", totalTime, "Canceled by user", log._id));
      document.getElementById("invisi").style.visibility = "hidden";
    }
  }

  const dispatch = useDispatch();

  const logCall = () =>{
    
    audioAmbientClick.play();
    // alert(userInfo.displayPass);
    if(num.length>10){
      setMessageBoxContent('10 digit-number only');
      setOpenPopup(true);
      setNum("");
    }else{
      dispatch(logACall(num, name, callStartedBy));
    }
    
  }

  const makeCall = (logId) => {
    // alert(userInfo.uri + " " + userInfo.password);
    // if(num.length>10){
    //   setMessageBoxContent('10 digit-number only');
    //   setOpenPopup(true);
    //   setNum("");
    // }
    // alert(JSON.stringify(configuration))
    document.getElementById("invisi").style.visibility = "visible";
    console.log("Keypad log._id="+logId);
    dispatch(makeACall(num, name, callStartedBy, ua, logId));

    // JsSIP.debug.enable('JsSIP:*');
    //JsSIP.debug.enable('JsSIP:Transport JsSIP:RTCSession*');
    // let pc = new RTCPeerConnection();
    // Register callbacks to desired call events
    // ua.call('sip:REDACTED', options);
    //coolPhone.call('sip:'+extension+'@'+server, options);
    // dispatch(makeACall("0981232607"));
    // alert('call in progress');
  }

  const openOptionDialogBox = () => {
    audioBeep.play();
    audioAmbientClick.play();
    
    setOpenDialogBox(true);
  }

  const closeDialogBox = () =>{ 
    audioMenuSlectionClick.play();
    audioAmbientClick.play();
    setOpenDialogBox(false);
  }

  const openContact = () => { //Contact
    dispatch(getAllContact());
    audioMenuSlectionClick.play();
    audioAmbientClick.play();
    if(keypadMode==='keypad'){
      setKeypadMode('contact');
    }else if(keypadMode==='contact'){
      setKeypadMode('keypad');
    }
    setOpenDialogBox(false);
  }

  const openHistory = () =>{
    dispatch(getAllHistory());
    audioMenuSlectionClick.play();
    audioAmbientClick.play();
    if(keypadMode==='keypad'){
      setKeypadMode('history');
    }else if(keypadMode==='history'){
      setKeypadMode('keypad');
    }
    setOpenDialogBox(false);
  }

  const submitNewContact = (e) =>{ //Contact
    e.preventDefault();
    var re = new RegExp("[0-9]{10}");
    setPopupType('error');
    if(contactNum.length<10 || contactNum.length>10 || !re.test(contactNum)){
      setOpenPopup(true);
      setMessageBoxContent("10 Digit-number only");
    }else if(contactName===""){
      setOpenPopup(true);
      setMessageBoxContent("Name is required");
      
    }else if(contactNum.length===10){
      setPopupType('info');
      dispatch(saveAContact(contactNum, contactName));
      dispatch(getAllContact());
    }
    setAddContact(false);
  }

  const dialNum = (e) =>{ //Contact
    // alert(e.currentTarget.value.split("|")[0]);
    setNum(e.currentTarget.value.split("|")[0]);
    setName(e.currentTarget.value.split("|")[1]);
    dispatch(detailsOfUserBasedOnPhone(e.currentTarget.value.split("|")[0]));
    setKeypadMode('keypad');
    audioBeep.play();
    audioAmbientClick.play();
  }


  const setNumFromKeyboard = (e) =>{ //Keypad
    var re = new RegExp("[0-9]");
    console.log(e.target.value.length);
    setNum(e.target.value);
    
    if(e.target.value.length>10){
      setPopupType('error');
      setMessageBoxContent("10 Digit-number only");
      setOpenPopup(true);
      setNum(e.target.value.slice(0, -1));
    }else if(e.target.value.length===10 && re.test(e.target.value)){
      dispatch(detailsOfUserBasedOnPhone(e.target.value));
    }
  }

  const openAddContact = () =>{
    audioAmbientClick.play();
    setAddContact(!addContact);
  }

  

  // const [width, setWidth] = useState(window.innerWidth);

  // const isMobile = width <= 1024;

  // const handleWindowResize = () => {
  //   setWidth(window.innerWidth);
  //   window.addEventListener("resize", handleWindowResize);
  //   return () => window.removeEventListener("resize", handleWindowResize);
  // }

  const signinHandler = (e) =>{
    audioAmbientClick.play();
    e.preventDefault(); //prevent the form from being refreshed
    dispatch(signin(uri, password));
    setURI('');
    setPassword('');
  }

  const signupHandler = (e) =>{
    e.preventDefault(); //prevent the form from being refreshed
    //sign in action
    audioAmbientClick.play();
    dispatch(signup(uri, password, displayName));
    dispatch(signin(uri, password));
  };

  const openSignupBox = () =>{
    audioAmbientClick.play();
    setSigninBox(false);
    setSignupBox(true);
  }

  const openSigninBox = () =>{
    audioAmbientClick.play();
    setSignupBox(false);
    setSigninBox(true);
  }

  const removeContact = (e) =>{
    dispatch(removeAContact(e.currentTarget.value));
    dispatch(getAllContact());
  }

  const editContact = (e) =>{
    openAddContact();
  }

  const search = (e) =>{
    setKeyword(e.target.value);
    dispatch(searchContact(e.target.value));
  }

  let touchstartX = 0
  let touchendX = 0
      
  function checkDirection() {
    if (touchendX < touchstartX) {
      console.log('swiped left!')
      setOpenKeyPad(false);
    }
    if (touchendX > touchstartX) {
      console.log('swiped right!')
      return false;
    }
  }

  document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
  })

  document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
  })

  useEffect(()=>{
    // window.scrollTo({
    //   top: 0, 
    // });
    
    if(!userInfo){
      setSigninBox(true);
    }else{
      setSigninBox(false);
    }
    // alert(currentNumber)

    if(currentNumber){
      // alert(currentNumber)
      setNum(currentNumber);
      // setName(fullname);
      setKeypadMode('keypad');
      dispatch(detailsOfUserBasedOnPhone(currentNumber));
    }
    
    setPopupType('info');
    // handleWindowResize();
    if(keypadMode==='keypad' && loadingCall===false && connected===false){
      // stop();
      setMessageBoxContent('Call Ended');
      setOpenPopup(true);
    }
    if(connected){
      reset();
      start();
    }
    if(log && log._id && loadingCall===false && connected===null){
      makeCall(log._id);
      console.log("log._id="+log._id);
      dispatch({type: CALL_LOG_RESET});
      // setCallId(log._id);
      // console.log(log._id);
    }
    // if(connected===true){
    // alert(endCallSession);
    // }
  },[loadingCall, connected, openPopup, log, userInfo, dispatch, idToDelete, keyword]);

  return (
    <>
      <div className='keyPad'>
        {keypadMode==='keypad' && !loadingCall && !connected && <div>
          <div className='keyRow'>
            <input className='phoneNum' type="number" onChange={setNumFromKeyboard} value={num} pattern="[0-9]{10}"></input>
          </div>
          <div className='keyRow'>
            {/* <div className='contentRow'>{name}</div> */}
            <div className='contentRow'>{userContact && userContact.name}</div>
          </div>
          <div className='keyRow'>
            <button type="submit" value="1" onClick={() => input("1")} className='keyNum'><div className='keyContent'>1</div></button>
            <button type="submit" value="2" onClick={() => input("2")} className='keyNum'><div className='keyContent'>2</div><div className='keyContent sub'>ABC</div></button>
            <button type="submit" value="3" onClick={() => input("3")} className='keyNum'><div className='keyContent'>3</div><div className='keyContent sub'>DEF</div></button>
          </div>
          <div className='keyRow'>
            <button type="submit" value="4" onClick={() => input("4")} className='keyNum'><div className='keyContent'>4</div><div className='keyContent sub'>GHI</div></button>
            <button type="submit" value="5" onClick={() => input("5")} className='keyNum'><div className='keyContent'>5</div><div className='keyContent sub'>JKL</div></button>
            <button type="submit" value="6" onClick={() => input("6")} className='keyNum'><div className='keyContent'>6</div><div className='keyContent sub'>MNO</div></button>
          </div>
          <div className='keyRow'>
            <button type="submit" value="7" onClick={() => input("7")} className='keyNum'><div className='keyContent'>7</div><div className='keyContent sub'>PQRS</div></button>
            <button type="submit" value="8" onClick={() => input("8")} className='keyNum'><div className='keyContent'>8</div><div className='keyContent sub'>TUV</div></button>
            <button type="submit" value="9" onClick={() => input("9")} className='keyNum'><div className='keyContent'>9</div><div className='keyContent sub'>WXYZ</div></button>
          </div>
          <div className='keyRow'>
            {/* <button className='keyNum'><div className='keyContent'>*</div></button> */}
            <button type="submit" value="" className='keyNum' onClick={openOptionDialogBox}><i className='fas fa-ellipsis-v'></i></button>

            <button type="submit" value="0" onClick={() => input("0")} className='keyNum'><div className='keyContent'>0</div><div>+</div></button>
            {/* <button className='keyNum'><div className='keyContent'>#</div></button> */}
            <button type="submit" value="" onClick={backspace} className='keyNum keyBackspace'><div className='keyContent'><i className='fa fa-arrow-left'></i></div></button>

          </div>
          <div className='keyRow'>
            <button type="submit" onClick={logCall} className='callButton'><i className='fa fa-phone'></i></button>
          </div>
          <div>
          </div>
        </div>}
        {loadingCall && !connected ?
        <div>
          <div className='keyRow'>
            <div className='contentRow'>ĐANG GỌI {num}</div>
          </div>
          <div className='keyRow'>
            <div className='contentRow'>{name}</div>
          </div>
          <div className='keyRow'>
            <div className='keyRow'>
              <button type="submit" value="Mute" className='keyNum round'><div className='keyContent sub'>Mute</div></button>
              <button type="submit" value="Keypad" className='keyNum round'><div className='keyContent sub'>Keypad</div></button>
              <button type="submit" value="Pause" className='keyNum round'><div className='keyContent sub'>Pause</div></button>
              <button type="submit" value="Forward" className='keyNum round'><div className='keyContent sub'>Forward</div></button>
            </div>
          </div>
          <div className='pan'>
              
          </div>
        </div>: connected && 
          <div>
            <div className='keyRow'>
              <div className='contentRow displayNumber'>{num}</div>
            </div>
            <div className='keyRow'>
              <div className='contentRow'>ĐÃ KẾT NỐI</div>
            </div>
            <div className='keyRow'>
              {/* <Timer connectivity={connected}></Timer> */}
              <div style={{textAlign: 'center'}}>
                <div className='timer'>
                    <span>{hours<10 ? "0"+hours : hours}</span><span>:</span><span>{minutes<10 ? "0"+minutes : minutes}</span><span>:</span><span>{seconds<10 ? "0"+seconds : seconds}</span>
                </div>
                {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
                {/* <button onClick={start}>Start</button> */}
                {/* <button onClick={pause}>Pause</button> */}
                {/* {connectivity} */}
                {/* <button onClick={reset}>Reset</button> */}
              </div>
            </div>
            <div className='pan'>

            </div>
          </div>
        }
        {openPopup && <PopupMessageBox open={openPopup} type={popupType} message={messageBoxContent} handleClosePopup={closePopup}></PopupMessageBox>}
        {/* {connected && <div>CONNECTED</div>} */}
        
        {/* <div className='popup cancel'>
          <div className='row center'><i className='fa fa-phone'></i>User Hang up</div>
          <div className='row center'><button className='phoneConfirmBtn'>Ok</button></div>
        </div> */}
        {/* <div className='popup info'>
          <div className='row center'></div>
          <div className='row center'><button className='phoneConfirmBtn cancel' onClick={cancel}><i className='fa fa-phone red'></i></button></div>
        </div> */}
        <div><div id="invisi" className='keyRow invisi'>
          <div className='row center'><button className='callButton red' id="endButton" onClick={cancel}><i className='fa fa-phone red hangupIcon'></i></button></div>
        </div></div>
        {/* <div className='coverTheCancelButton'>

        </div> */}
        {keypadMode==='contact' && 
          <>
          <div className='row center'><input className='searchBar' placeholder='Tìm kiếm' onChange={search}></input></div>
          <div className='row center'><button onClick={openContact} className='phoneConfirmBtn back'><i className='fa fa-mail-reply'></i></button>
           <button onClick={openAddContact} className='phoneConfirmBtn info'><i className='fa fa-plus'></i></button></div>
              {keyword==="" ? (<div className='row inline scrollableDiv'>
                {/* <table>
                  <thead>
                    <tr>
                      <th>
                        Name
                      </th>
                      <th>
                        Phone number
                      </th>
                      <th>
                        Dial
                      </th>
                    </tr>
                  </thead>
                  <tbody>{contacts && contacts.length>0 && contacts.map(contact=>(
                    <tr key={contact._id}>
                      <td>
                        {contact.name}
                      </td>
                      <td>
                        {contact.phoneNum}
                      </td>
                      <td>
                        <button className='callButton' value={contact.phoneNum+"|"+contact.name} onClick={dialNum}><i className='fa fa-mobile'></i></button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table> */}
                <div className='col-2'>
                  {users && users.length>0 && users.map(contact=>(
                    <div className='row left inline' key={contact._id}>
                      <div className='col-1 inline'>
                        <div className='displayNameContact row left'>{contact.name}</div><div className='displayNumberContact row left'>{contact.phoneNumber}</div>
                      </div>
                      <div className='col-1 inline'>
                        <div className='row right' title="Dial this number"><button className='contactMenuBtn' value={contact.phoneNumber+"|"+contact.name} onClick={dialNum}><i className='fa fa-mobile'></i></button></div>
                        {/* <div className='row right' title="Remove this contact"><button className='contactMenuBtn remove' value={contact._id} onClick={removeContact}><i className='fa fa-trash'></i></button></div> */}
                        {/* <div className='row right' title="Edit this contact"><button className='contactMenuBtn edit' value={contact._id} onClick={editContact}><i className='fa fa-edit'></i></button></div> */}
                      </div>
                      <div className='row right'><hr className='default'></hr></div>
                    </div>
                  ))}
                </div>
              </div>) : 
            (
              <div className='row inline scrollableDiv'>
                <div className='col-2'>
                  {results && results.length>0 && results.map(result=>(
                    <div className='row left inline' key={result._id}>
                      <div className='col-1 inline'>
                        <div className='displayNameContact row left'>{result.name}</div><div className='displayNumberContact row left'>{result.phoneNum}</div>
                      </div>
                      <div className='col-1 inline'>
                        <div className='row right' title="Dial this number"><button className='contactMenuBtn' value={result.phoneNum+"|"+result.name} onClick={dialNum}><i className='fa fa-mobile'></i></button></div>
                        <div className='row right' title="Remove this contact"><button className='contactMenuBtn remove' value={result._id} onClick={removeContact}><i className='fa fa-trash'></i></button></div>
                        <div className='row right' title="Remove this contact"><button className='contactMenuBtn edit' value={result._id} onClick={editContact}><i className='fa fa-edit'></i></button></div>
                      </div>
                      <div className='row right'><hr className='default'></hr></div>
                    </div>
                  ))}
                </div>
            </div>)}
          </>
        }
        {
          keypadMode==='contact' && !keyword==="" &&
          <>
            
          </>
        }
        {keypadMode==='history' &&
          <div><div className='row right'><button onClick={openHistory} className='phoneConfirmBtn back'><i className='fa fa-mail-reply'></i></button></div>
              {/* <div className='row scrolltable'>
                <table>
                  <thead>
                    <tr>
                      <th>
                        Name
                      </th>
                      <th>
                        Phone number
                      </th>
                      <th>
                        Started by
                      </th>
                      <th>
                        Ended by
                      </th>
                      <th>
                        Date
                      </th>
                      <th>
                        Dial
                      </th>
                    </tr>
                  </thead>
                  <tbody>{history && history.length>0 && history.map(hist=>(
                    <tr key={hist._id}>
                      <td>
                        {hist.name}
                      </td>
                      <td>
                        {hist.phoneNum}
                      </td>
                      <td>
                        {<DateComponent onlyTime={true} passedDate={hist.createdAt}></DateComponent>}
                      </td>
                      <td>
                        <button className='callButton' value={hist.phoneNum+"|"+hist.name} onClick={dialNum}><i className='fa fa-mobile'></i></button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>  */}
              <div className='scrollableDiv'>
                <div className='col-2'>
                  {history && history.length>0 && history.map(hist=>(
                    <div key={hist._id}>
                      <div className='row center displayNumberContact'>{hist._id}</div>
                      {hist.list.map(l=>(
                        <div className='row left inline' key={l._id} title={l.callEndedWithCause ?( (l.callEndedWithCause.includes('Canceled') || l.callEndedWithCause.includes('Terminated')) ? "You made this call" : l.callEndedWithCause.includes('failed') && "The call was hung up") : "No data available (mostly because the call log wasn't completed in this period of development)"}>
                          <div className='col-1 inline'>
                            <div className='displayNameContact row left' >
                            {l.callEndedWithCause ? ((l.callEndedWithCause.includes('Canceled') || l.callEndedWithCause.includes('Terminated')) ?  <div className='callStartedIcon'><i className='fa fa-phone'></i><i className='fa fa-arrow-up'></i></div> : l.callEndedWithCause.includes('failed') && <div className='callNotPickedUpIcon'><i className='fa fa-phone'></i><i className='fa fa-ban'></i></div>) :  <div className='callNoData'><i className='fa fa-phone'></i><i className='fa fa-question'></i></div>}
                            {l.name}</div>
                            <div className='displayNumberContact row left'>{l.phoneNum}</div>
                            <div className='displayNumberContact row left'>{l.length && <TimeConverter timeInSec={Math.round(l.length)}></TimeConverter>}</div>
                            {/* <div className='displayNumberContact row left'>Call ended by {l.endedBy}</div> */}
                          </div>
                          <div className='col-0 inline'>
                            <div className='row'>
                              <div className='col-0 right displayNumberContact'><DateComponent passedDate={l.createdAt} onlyTime={true}></DateComponent></div>
                              <div className='col-0 right'><button className='callButton dial' value={l.phoneNum+"|"+l.name} onClick={dialNum}><i className='fa fa-mobile'></i></button></div>
                            </div>
                          </div>
                          <div className='row right'><hr className='default'></hr></div>

                        </div>
                      ))
                      }
                    </div>
                  ))}
                </div>
              </div>
            </div>
        }
        {openDialogBox && 
          <OptionDialogBox handleClosePopup={closeDialogBox} handleOpenContact={openContact} handleOpenHistory={openHistory}></OptionDialogBox>
        }
        {loadingSaving ? <></> : errorSaving ? (errorSaving.includes("E11000") ?
          <IndependentMessageBox type="error" message="Duplicate phone number detected. Please check the number again."></IndependentMessageBox> : <IndependentMessageBox type="error" message={errorSaving}></IndependentMessageBox>) :
        contact && contact.success && 
          <IndependentMessageBox message={contact.message}></IndependentMessageBox>
        }
      </div>
      {addContact && 
      <div>
        <div className='popup info'>
          <div className='row top right'>
            <button type="submit" value="" className='phoneConfirmBtn xClose' onClick={openAddContact}><i className='fas fa-close'></i></button>
          </div>
          <form onSubmit={submitNewContact}>
            
            <div className='row center'>
              <input type="text" className='inputBox' placeholder='Name' id="name" autocomplete="off" onChange={e=>setContactName(e.target.value)}/>
            </div>
            <div className='row center'>
              <input type="number" className='inputBox' placeholder='Phone number' id="phoneNum" autocomplete="off" onChange={e=>setContactNum(e.target.value)}/>
            </div>
            <div className='row center'>
              <button type="submit" className='submitBtn'>ENTER</button>
            </div>
          </form>
        </div>
        <div className='popupCoverup'></div>
      </div>}
      {signinBox && 
        <div>
          <div className='popup info'>
            <div className='row top center displayNameContact'>
              SIGN IN 
            </div>
            <form onSubmit={signinHandler}>
              <div className='row center'>
                <input type="text" className='inputBoxS' placeholder='URI' id="uri" autoComplete="new-password" onChange={e=>setURI(e.target.value)}/>
              </div>
              <div className='row center'>
                <input type="password" className='inputBoxS' placeholder='Password' id="pass" autoComplete="new-password" onChange={e=>setPassword(e.target.value)}/>
              </div>
              {/* <div className='row center'>
                <input type="text" className='inputBox' placeholder='Display Name' id="uri" autoComplete="off" onChange={e=>setDisplayName(e.target.value)}/>
              </div> */}
              <div className='row center'>
                <button type="submit" className='submitBtn'>Gửi</button>
              </div>
              <div className='row center'>
                Chưa có tài khoản? <button className='phoneConfirmBtn' onClick={openSignupBox}>Đăng ký</button>
              </div>
            </form>
          </div>
          <div className='popupCoverup'></div>
        </div>
      }
      {signupBox &&
        <div>
          <div className='popup info'>
            <div className='row top center displayNameContact'>
              SIGN UP
            </div>
            <form onSubmit={signupHandler}>
              <div className='row center'>
                <input type="text" className='inputBoxS' placeholder='URI' id="uri" autoComplete="new-password" onChange={e=>setURI(e.target.value)}/>
              </div>
              <div className='row center'>
                <input type="password" className='inputBoxS' placeholder='Password' id="pass" autoComplete="new-password" onChange={e=>setPassword(e.target.value)}/>
              </div>
              <div className='row center'>
                <input type="text" className='inputBoxS' placeholder='Display Name' id="uri" autoComplete="off" onChange={e=>setDisplayName(e.target.value)}/>
              </div>
              <div className='row center'>
                <button type="submit" className='submitBtn'>Submit</button>
              </div>
              <div className='row center'>
                Có tài khoản? <button className='phoneConfirmBtn' onClick={openSigninBox}>Đăng nhập</button>
              </div>
            </form>
          </div>
          <div className='popupCoverup'></div>
        </div>
      }
      {/* {
        loadingSignin ? <></> : errorSignin ? signinBox &&  
        <IndependentMessageBox  type="error" message={errorSignin} ></IndependentMessageBox> : userInfo && <IndependentMessageBox type="info" message="Signed in Successfully" ></IndependentMessageBox>
      } */}
      {/* {removeContactBox &&
        <YesNoBox message="ARE YOU SURE? IT CAN'T BE UNDONE" handleYes={removeContact} handleNo={setIdToDelete('')}></YesNoBox>
      } */}
    </>
  )
}
