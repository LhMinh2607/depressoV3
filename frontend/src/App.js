import React from 'react'
import { Route, Routes } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import {useDispatch, useSelector} from 'react-redux';
import SignUpPage from './pages/SignupPage';
import { signout } from './actions/userAction';
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



function App() {


  const userSignin = useSelector((state)=> state.userSignin);
  const {userInfo, loading, error} = userSignin;

  const dispatch = useDispatch();
  const signOutHandler = () =>{
    dispatch(signout());
  };


  const userList = useSelector(state=>state.userList);
  const {loading: loadingUL, error: errorUL, users} = userList;

  const [openKeyPad, setOpenKeyPad] = useState(false);
  const [openMusicBox, setOpenMusicBox] = useState(false);

  const getYouTubeLinkId = (url) =>{
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

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
                  <div>
                    {<Link to={`/news`} className="">Tin tức</Link>}
                  </div>
                  <div>
                    {<Link to={`/forum`} className="">Diễn đàn</Link>}
                  </div>
                      {userInfo && userInfo.role==="admin" && <div onClick={()=>setOpenKeyPad(!openKeyPad)} className='interactiveText headerBar'><i className="fa fa-phone"></i></div>}
                      {userInfo && userInfo.backgroundMusic && <div onClick={()=>setOpenMusicBox(!openMusicBox)} className='interactiveText headerBar'><i className="fa fa-music"></i></div>}
                      {userInfo ? (
                        <div className="dropDown">
                          <Link to={`/user/${userInfo._id}`}>{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                        
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
                  {userInfo && userInfo.role==="admin" && openKeyPad && <Keypad></Keypad>}
                  {userInfo && userInfo.backgroundMusic && openMusicBox &&
                    <Draggable><div className='musicPlayer' draggable={true}>
                      <div className='row right' style={{display: "flex", flexDirection:"row", justifyContent:"flex-end", color: "#fff"}}><i className='fa fa-close interactiveText' onClick={()=>setOpenMusicBox(!openMusicBox)}></i></div>
                      <iframe  src={`https://www.youtube.com/embed/${getYouTubeLinkId(userInfo.backgroundMusic)}?autoplay=1&mute=0&loop=1&playlist=${getYouTubeLinkId(userInfo.backgroundMusic)}`} type="application/x-shockwave-flash" allowscriptaccess="always" allowFullScreen={true} width="200" height="100" allow='autoplay'></iframe >
                    </div></Draggable>}
              </header>
              <main>
              
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
                  <Route exact path="/forum/post/:id" element={<PostDetailPage></PostDetailPage>}></Route>
                  <Route exact path="/news" element={<NewsPage></NewsPage>}></Route>
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
