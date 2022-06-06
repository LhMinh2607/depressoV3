import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router';
import { BrowserRouter, Link, } from 'react-router-dom';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import {useDispatch, useSelector} from 'react-redux';
import SignUpPage from './pages/SignupPage';
import { addFriend, signout } from './actions/userAction';
import ProfilePage from './pages/ProfilePage';
import ForumPage from './pages/ForumPage';
import PostDetailPage from './pages/PostDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import DateComponent from './components/DateComponent';
import CategoryIcon from './components/CategoryIcon';
import MentalBotPage from './pages/MentalBotPage';
import AdminRoute from './components/AdminRoute';
import FeedbackPage from './pages/FeedbackPage';
import UserListPage from './pages/UserListPage';
import Keypad from './components/Keypad';
import { useState } from 'react';
import NewsPage from './pages/NewsPage';
import Draggable from 'react-draggable';
import Widget from 'rasa-webchat';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { listOfNotifications } from './actions/notificationAction';
import socketIOClient from "socket.io-client";
// import {Recorder} from 'react-voice-recorder'
// import 'react-voice-recorder/dist/index.css'
// import { ReactMediaRecorder } from "react-media-recorder";
// import {
//   AudioProvider,
//   MicrophoneNode,
//   SpeakerNode,
//   GainNode,
//   GroupNode,
//   useSpeaker,
//   NoteAnalyserNode,
// } from "react-audio-mixer";
import RecorderComponent from './components/RecorderComponent';
import VoiceRecorderComponent from './components/VoiceRecorderComponent';
// import io from "socket.io-client";
import {io} from 'socket.io-client';

function App() {

  const [response, setResponse] = useState("");
  const [hzAna, setHzAna] = useState([]);
  const [speaker, setSpeaker] = useState("");

  const userSignin = useSelector((state)=> state.userSignin);
  const {userInfo, loading, error} = userSignin;

  const dispatch = useDispatch();
  const signOutHandler = () =>{
    dispatch(signout());
  };
  // let socket = io(process.env.REACT_APP_ENDPOINT);
  // let socket = io(process.env.REACT_APP_WSENDPOINT);
  let socket = io("https://8527-27-2-17-107.ngrok.io");

  const userList = useSelector(state=>state.userList);
  const {loading: loadingUL, error: errorUL, users} = userList;

  const notificationList = useSelector(state=>state.notificationList);
  const {loading: loadingNotifList, error: errorNotifList, notifications} = notificationList;

  const [openKeyPad, setOpenKeyPad] = useState(false);
  const [openMusicBox, setOpenMusicBox] = useState(false);
  const [menu, setMenu] = useState(false);
  const [recordState, setRecordState] = useState({audioDetails: {
    url: null,
    blob: null,
    chunks: null,
    duration: {
      h: 0,
      m: 0,
      s: 0
    }
  }});

  const handleAudioStop = (data) =>{
    console.log(data)
    setRecordState({ audioDetails: data });
}

  const handleAudioUpload = (file) => {
      console.log(file);
  }

  const handleCountDown = (data) => {
      console.log(data);
  }

  const handleReset = () => {
      const reset = {
        url: null,
        blob: null,
        chunks: null,
        duration: {
          h: 0,
          m: 0,
          s: 0
        }
      };
      setRecordState({ audioDetails: reset });
    }

  const getYouTubeLinkId = (url) =>{
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
  // const socketUrl = "https://1d35-27-2-17-107.ngrok.io";
  const socketUrl = "http://localhost:5005";
  // const socketUrl = "https://b7fe-27-2-17-107.ngrok.io";
  const botId = "629199aaad2ab670dc8a2f45";

  const addThisFriend = (senderId) => {
    dispatch(addFriend(senderId, userInfo._id));
  }

  let audioBeep = new Audio("/assets/beep.mp3");
  let audioMenuSelectionClick = new Audio("/assets/MenuSelectionClick.mp3");

  // var OutgoingAudioMediaStream = new MediaStream();
  // OutgoingAudioMediaStream.addTrack(audioBeep.getAudioTracks()[0]);

  // var IncomingAudioMediaStream = new MediaStream();
  // IncomingAudioMediaStream.addTrack(audioMenuSelectionClick.getAudioTracks()[0]);

  // const audioContext = new AudioContext();

  // const audioIn_01 = audioContext.createMediaStreamSource(OutgoingAudioMediaStream);
  // const audioIn_02 = audioContext.createMediaStreamSource(IncomingAudioMediaStream);

  // const dest = audioContext.createMediaStreamDestination();

  // audioIn_01.connect(dest);
  // audioIn_02.connect(dest);

  // dest.stream.addTrack(audioBeep.getVideoTracks()[0]);
  // var RecordingStream = dest.stream;
//   let constraintObj = { 
//     audio: true, 
//     // video: { 
//     //     facingMode: "user", 
//     //     width: { min: 640, ideal: 1280, max: 1920 },
//     //     height: { min: 480, ideal: 720, max: 1080 } 
//     // } 
//     video: false,
// }; 
// // width: 1280, height: 720  -- preference only
// // facingMode: {exact: "user"}
// // facingMode: "environment"

// //handle older browsers that might implement getUserMedia in some way
// if (navigator.mediaDevices === undefined) {
//     navigator.mediaDevices = {};
//     navigator.mediaDevices.getUserMedia = function(constraintObj) {
//         let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//         if (!getUserMedia) {
//             return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
//         }
//         return new Promise(function(resolve, reject) {
//             getUserMedia.call(navigator, constraintObj, resolve, reject);
//         });
//     }
// }else{
//     navigator.mediaDevices.enumerateDevices()
//     .then(devices => {
//         devices.forEach(device=>{
//             console.log(device.kind.toUpperCase(), device.label);
//             //, device.deviceId
//         })
//     })
//     .catch(err=>{
//         console.log(err.name, err.message);
//     })
// }

//   navigator.mediaDevices.getUserMedia(constraintObj)
//   .then(function(mediaStreamObj) {
//       //connect the media stream to the first video element
//       let video = document.querySelector('video');
      
//       if ("srcObject" in video) {
//           video.srcObject = mediaStreamObj;
//       } else {
//           //old version
//           video.src = window.URL.createObjectURL(mediaStreamObj);
//       }
      
//       video.onloadedmetadata = function(ev) {
//           //show in the video element what is being captured by the webcam
//           video.play();
//       };
      
//       //add listeners for saving video/audio
//       let start = document.getElementById('btnStart');
//       let stop = document.getElementById('btnStop');
//       let vidSave = document.getElementById('vid2');
//       const audioMixer = new MultiStreamsMixer([mediaStreamObj, mediaStreamObj]);
//       let mediaRecorder = new MediaRecorder(audioMixer.getMixedStream());
//       let chunks = [];
      
//       start.addEventListener('click', (ev)=>{
//           mediaRecorder.start();
//           console.log(mediaRecorder.state);
//       })
//       stop.addEventListener('click', (ev)=>{
//           mediaRecorder.stop();
//           console.log(mediaRecorder.state);
//       });
//       mediaRecorder.ondataavailable = function(ev) {
//           chunks.push(ev.data);
//       }
//       mediaRecorder.onstop = (ev)=>{
//           let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
//           chunks = [];
//           let videoURL = window.URL.createObjectURL(blob);
//           vidSave.src = videoURL;
//       }
//   })
//   .catch(function(err) { 
//       console.log(err.name, err.message); 
//   });

  

  const recordTest = () => {
    // var OutgoingAudioMediaStream = new MediaStream();
    // OutgoingAudioMediaStream.addTrack(OutgoingStream.getAudioTracks()[0]);

    // var IncomingAudioMediaStream = new MediaStream();
    // IncomingAudioMediaStream.addTrack(IncomingStream.getAudioTracks()[0]);

    // const audioContext = new AudioContext();

    // const audioIn_01 = audioContext.createMediaStreamSource(OutgoingAudioMediaStream);
    // const audioIn_02 = audioContext.createMediaStreamSource(IncomingAudioMediaStream);

    // const dest = audioContext.createMediaStreamDestination();

    // audioIn_01.connect(dest);
    // audioIn_02.connect(dest);

    // dest.stream.addTrack(IncomingStream.getVideoTracks()[0]);
    // var RecordingStream = dest.stream;
    // audioBeep.play();
    // audioMenuSelectionClick.play();
    
  }
  
  
  useEffect(()=>{
    if(userInfo){
      dispatch(listOfNotifications(userInfo._id));
    }
  

  // document.querySelector("#start-record-button").onclick = () => {
  //   left.play();
  //   recorder.startRecording();
  // };
  // document.querySelector("#stop-record-button").onclick = () => {
  //   left.pause();
  //   recorder.stopRecording(() => {
  //     var blob = recorder.getBlob();
  //     output.srcObject = null;
  //     output.src = URL.createObjectURL(blob);
  //     output.muted = false;
  //     output.loop = true;
  //     output.play();

  //     // streams.forEach(function (stream) {
  //     //   stream.getTracks().forEach(function (track) {
  //     //     track.stop();
  //     //   });
  //     // });
  //   });
  // };
  // document.querySelector("#download-button").onclick = () => {
  //   const blob = recorder.getBlob();
  //   const url = URL.createObjectURL(blob);
  //   let a = document.createElement("a");
  //   a.style.display = "none";
  //   a.href = url;
  //   a.download = "dance.webm";
  //   a.click();
  //   a.remove();
  //   URL.revokeObjectURL(url);
  // };
  
    setSpeaker("");
    // const socket = socketIOClient(process.env.ENDPOINT);
    // socket.on("FromAPI", data => {
    //   setResponse(data);
    // });
    // socket.on("loadComments", () => {
    //   // dispatch(detailsOfPost(postId));
    //   console.log("loadComments")
    //   // socket.disconnect();
    // });
    
  }, []);

  return (
      <BrowserRouter>
        <div className="grid-containter">
              <header className="row navigation-bar">
                  <div>
                    <Link to="/" className="brand">Depresso</Link>
                  </div>
                  {/* <div>
                    {userInfo && <Link to={`/user/${userInfo._id}`} className="">Mental Bot</Link>}
                  </div> */}
                {isBrowser ? <>
                  <div>
                    <Link to={`/news`} className="">Tin tức</Link>
                  </div>
                  <div>
                    <Link to={`/forum`} className="">Diễn đàn</Link>
                  </div>
                      {userInfo && userInfo.role==="admin" && <div onClick={()=>setOpenKeyPad(!openKeyPad)} className='interactiveText headerBar'><i className="fa fa-phone"></i></div>}
                      {userInfo && userInfo.backgroundMusic && <div onClick={()=>setOpenMusicBox(!openMusicBox)} className='interactiveText headerBar'><i className="fa fa-music"></i></div>}
                      <div className='bell'><i className='fa fa-bell'></i>
                      <ul className='notificationDropdown'>
                        {notifications && notifications.length && notifications.map((notif)=>(
                          notif.type==="friendRequest" && notif.status!=="checked" && <li key={notif._id}>
                            {notif.content}
                            <div className='addFriendButton interactiveText' onClick={()=>addThisFriend(notif.senderId)}>Chấp nhận</div>
                          </li> 
                        ))}
                      </ul>
                      </div>
                      {userInfo ? (
                        <div className="dropDown">
                          <Link to={`#`}>{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                        
                          <ul className="dropDown-content">
                            <li>
                              <Link to={`/user/${userInfo._id}`}>Tài khoản<i className="fa fa-user"></i></Link>
                            </li>
                          {
                            userInfo.role==="admin" && 
                            <>
                              <li>
                                <Link to={`/feedback`}>Xem feedback<i className="fa fa-book"></i></Link>
                              </li>
                              <li>
                                <Link to={`/user/list`}>Danh sách người dùng<i className="fa fa-user"></i></Link>
                              </li>
                            </>
                          }
                            <li>
                              <Link to="/" onClick={signOutHandler}>
                                Đăng xuất<i className="fa fa-hand-o-left"></i>
                              </Link>
                            </li>
                          </ul> 
                        </div>) : <Link to="/signin" className="">Đăng nhập</Link>}
                  </>: 
                  isMobile &&
                      <div className='row left'>
                        <div className='interactiveText row left'  onClick={()=>setMenu(!menu)}><i className='fa fa-bars'></i></div>
                        {menu && (userInfo ? <ul className='navigationBar'>
                          <li>
                            <Link to={`/user/${userInfo._id}`}>Tài khoản<i className="fa fa-user"></i></Link>
                          </li>
                          {userInfo.role==="admin" && 
                            <>
                              <li>
                                <Link to={`/feedback`}>Xem feedback<i className="fa fa-book"></i></Link>
                              </li>
                              <li>
                                <Link to={`/user/list`}>Danh sách người dùng<i className="fa fa-user"></i></Link>
                              </li>
                            </>}
                          <li>
                            <Link to={`/news`} className="">Tin tức</Link>
                          </li>
                          <li>
                            <Link to={`/forum`} className="">Diễn đàn</Link>
                          </li>
                            {userInfo && userInfo.role==="admin" && <li><Link to={`#`} onClick={()=>setOpenKeyPad(!openKeyPad)} className='interactiveText headerBar'><i className="fa fa-phone"></i>Callcenter</Link></li>}
                            {userInfo && userInfo.backgroundMusic && <li><Link to={`#`} onClick={()=>setOpenMusicBox(!openMusicBox)} className='interactiveText headerBar'><i className="fa fa-music"></i>Nhạc</Link></li>}
                          <li>
                              <Link to="/" onClick={signOutHandler}>
                                Đăng xuất<i className="fa fa-hand-o-left"></i>
                              </Link>
                          </li>
                        </ul> :
                        <ul className='navigationBar'>
                          <li>
                            <Link to="/signin" className="">Đăng nhập</Link>
                          </li>
                        </ul>)
                        
                      
                      }
                      </div>
                      
                  
                  }
                  

                  {userInfo && userInfo.role==="admin" && openKeyPad && <Keypad></Keypad>}
                  {userInfo && userInfo.backgroundMusic && openMusicBox &&
                    <Draggable><div className='musicPlayer' draggable={true}>
                      <div className='row right' style={{display: "flex", flexDirection:"row", justifyContent:"flex-end", color: "#fff"}}><i className='fa fa-close interactiveText' onClick={()=>setOpenMusicBox(!openMusicBox)}></i></div>
                      <iframe  src={`https://www.youtube.com/embed/${getYouTubeLinkId(userInfo.backgroundMusic)}?autoplay=1&mute=0&loop=1&playlist=${getYouTubeLinkId(userInfo.backgroundMusic)}`} type="application/x-shockwave-flash" allowscriptaccess="always" allowFullScreen={true} width="200" height="100" allow='autoplay'></iframe >
                    </div></Draggable>}
                    {/* {userInfo && userInfo.role!=="bot" && <Widget
                      initPayload={userInfo._id}
                      socketUrl={socketUrl}
                      customData={{"language": "vi"}} // arbitrary custom data. Stay minimal as this will be added to the socket
                      title={<Link to={`/user/${botId}`}>MentalBot</Link>}
                      showFullScreenButton={true}
                      displayUnreadCount={true}
                      showMessageDate={true}
                      subtitle={<Link to={`/user/${botId}`}>🟢Đang rảnh</Link>}
                      inputTextFieldHint={"Nhắn tin cho bot"}
                      profileAvatar={"https://cdn.discordapp.com/emojis/967412208323674243.webp?size=48&quality=lossless"}
                      // openLauncherImage={""}
                      />
                      } */}
              </header>
              <main>
              <div>
                {/* It's <time dateTime={response}>{response}</time> */}
                {/* <Recorder
                    record={true}
                    title={"New recording"}
                    audioURL={recordState.audioDetails.url}
                    showUIAudio
                    handleAudioStop={data => handleAudioStop(data)}
                    handleAudioUpload={data => handleAudioUpload(data)}
                    handleCountDown={data => handleCountDown(data)}
                    handleReset={() => handleReset()}
                    mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
                /> */}
                {/* <ReactMediaRecorder
                  audio={true}
                  screen={true}
                  askPermissionOnMount={false}
                  stopStreamsOnStop={true}
                  render={({ status, startRecording, stopRecording, mediaBlobUrl, isAudioMuted=false }) => (
                    <div>
                      <p>{status}</p>
                      <button onClick={startRecording}>Start Recording</button>
                      <button onClick={stopRecording}>Stop Recording</button>
                      <video src={mediaBlobUrl} controls autoPlay loop />
                    </div>
                  )}
                /> */}
                <div>
                {/* <AudioProvider>
                  
                  <MicrophoneNode
                    name="mic"
                    echoCancellation
                    noiseSuppression
                  />
                  <GainNode
                    name="gain"
                    listen="mic"
                    gain={0.5}
                  />
                  <SpeakerNode
                    name="speaker"
                    listen="gain"
                    deviceId={speaker}
                  />
                  <NoteAnalyserNode
                    listen="speaker"
                    interval={30}
                    max={0}
                    min={-60}
                    limit={10}
                    onUpdate={setHzAna}
                  />
                  
                </AudioProvider>
                  <>{hzAna.map(([h, g]) => (
                    <div key={h}>
                      hzAn: {h}: {g?.toFixed(0)}
                    </div>
                  ))}</> */}
                  {/* <p><button id="btnStart">START RECORDING</button><br/>
                  <button id="btnStop">STOP RECORDING</button></p>
                  
                  <video controls></video>
                  
                  <video id="vid2" controls></video> */}
                  {/* <button onClick={recordTest}>Record</button> */}
                  {/* <RecorderComponent source="https://webrtc.github.io/samples/src/video/chrome.webm"></RecorderComponent> */}
                  {/* <VoiceRecorderComponent source="https://webrtc.github.io/samples/src/video/chrome.webm"></VoiceRecorderComponent> */}
                  {/* <audio controls src="/assets/dance.mp3"></audio> */}
                </div>
              </div>
              {userInfo && userInfo.backgroundImage && userInfo.globalBackground==true && (<div className='globalBackground' style={{backgroundImage: `url("${userInfo.backgroundImage}")`, backgroundPosition: "center center", backgroundSize:"contain", position: "fixed", width: "100%", height: "100vh", zIndex: "-100", filter: "brightness(40%)"}}></div>)}
                <Routes>
                  {/* React Router Dom v6 syntax */}
                  <Route exact path="/" element={<HomePage></HomePage>}></Route>
                  <Route exact path="/signin" element={<SigninPage></SigninPage>}></Route>
                  <Route exact path="/signup" element={<SignUpPage></SignUpPage>}></Route>
                  <Route path="/user/:id" element={<ProfilePage></ProfilePage>}></Route>
                  {/* <Route exact path="/forum" element={<ForumPage></ForumPage>}></Route>  */}
                  <Route exact path="/mentalbot" element={<MentalBotPage></MentalBotPage>}></Route> 
                  {/* <Route exact path="/forum/post/:id" element={<PostDetailPage></PostDetailPage>}></Route> */}
                  <Route exact path="/feedback" element={<AdminRoute><FeedbackPage></FeedbackPage></AdminRoute>}></Route> 
                  <Route exact path="/user/list" element={<AdminRoute><UserListPage></UserListPage></AdminRoute>}></Route> 
                  <Route exact path="/forum" element={<ForumPage></ForumPage>}></Route>
                  <Route exact path="/forum/post/:id" element={<PostDetailPage  socket={socket}></PostDetailPage>}></Route>
                  <Route exact path="/news" element={<NewsPage></NewsPage>}></Route>
                  <Route exact path="/voicerecorder" element={<VoiceRecorderComponent source="https://webrtc.github.io/samples/src/video/chrome.webm"></VoiceRecorderComponent>}></Route> {/*Easter Eggs*/}
                  <Route path="*" element={<NotFoundPage/>} /> 
                </Routes>
                
                
              </main>
              {/* <footer className="row-bottom">
                  <div className="nav-menu-item">
                    <i className="fab fa-youtube bigger-icon"></i><a href="https://youtube.com/channel/UCGmokfRCnHmlz7AF3-suNvQ/about">LhMinh2607</a>
                  </div>
                  <div className="nav-menu-item">
                    <i className="fab fa-discord bigger-icon"></i><a href="https://www.discordapp.com/users/LhMinh2607#7347">LhMinh2607.gg</a>
                  </div>
                  <div className="nav-menu-item">
                    All Rights Reserved 
                  </div>
                  <div className="nav-menu-item">
                    <i className="fab fa-github bigger-icon"></i><a href="https://www.github.com/LhMinh2607/TTCM_AssetStore">LhMinh2607.git</a>
                  </div>
                  <div className="nav-menu-item">
                    <i className="fab fa-reddit bigger-icon"></i><a href="https://reddit.com/u/LhMinh2607">u/LhMinh2607</a>
                  </div>
              </footer> */}
          </div>
      </BrowserRouter>
    
  );
}


export default App;
