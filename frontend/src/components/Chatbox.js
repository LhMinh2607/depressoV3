import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsOfUser } from '../actions/userAction';
import UnixDateComponent from './UnixDateComponent';

export default function Chatbox(props) { //MessageBox that handles external function
  //This MessageBox depends on external states

  const {messages, open, handleClosePopup, userId, botPOV=false} = props;

  const userDetail = useSelector(state => state.userDetail);
  const {loading: loadingUser, error: errorUser, user} = userDetail;

  const closePopup = () =>{
    handleClosePopup();
    // alert(open);
  }

  const scrollToBottomHandler = () =>{
    window.scrollTo({
        bottom: 0, 
        behavior: 'smooth'
      });
  }

  // const unixTimestampConverter = (timestamp) =>{
  //   const date = (new Date(timestamp * 1000));
  //   const dayOfTheWeek = (new Date(timestamp * 1000).getDay()).toString();
  //   const dayOfTheMonth = (new Date(timestamp * 1000).getDate()).toString();
  //   const month = (new Date(timestamp * 1000).getMonth()).toString();
  //   const year = (new Date(timestamp * 1000).getFullYear()).toString();


  //   return dayOfTheWeek + " " + dayOfTheMonth + " " + month + " " + year;
  // }

  // const getDate = (dateStr) => {
  //   const date = dateStr.substr(0, 16);
  //   const dayOfTheWeek = date.substr(0, 3);
  //   const month = date.substr(4, 7);
  //   const dayOfTheMonth = date.substr(9, 11);
  //   const year = date.substr(13, 17);

  //   return dayOfTheWeek + " " + dayOfTheMonth + " " + month + " " + year;
  // }
  const pfp = "https://cdn.discordapp.com/emojis/967412208323674243.webp?size=48&quality=lossless";
  const dispatch = useDispatch();
  const elementRef = useRef();
  const botName = "Mental Bot"
  useEffect(() => {
    var myElement = document.getElementById('latest');
    if(myElement){
      // alert(myElement)
      var topPos = myElement.offsetTop;
      document.getElementById('chatBox').scrollTop = topPos;
    }
  });
  // alert(JSON.stringify(messages[0].events[3]))
  //1651213418.0374901
  //1651213420.3932219

  return (
    <>
      {!botPOV ? (open && <div className='rounded-div'>
          <div className='chatBoxHeader'>
          </div>
          <button className='confirmBtn xClose' onClick={closePopup}><i className='fa fa-close'></i></button>
          <div id="chatBox" className='popupChatBox info chatWrapper'>
              {messages && messages.map((m)=>
                m && m.events && m.events.map((e)=>
                  e && e.event === "bot" ? (
                    <div className='row left padding-text'>
                      <div className='pfpdiv'><img className='pfp' src={pfp}></img></div>
                      <div className='col-1'>
                        <div className='row left padding-text'>
                          {e.text && e.text!==null && (e.text.includes("Link hình") ? <div>
                            {<a href={e.text.replace('(Link hình)[', '').replace(']', '').replace('Link hình:', '')} target="_blank"><img className='chatImg' src={e.text.replace('(Link hình)[', '').replace(']', '').replace('Link hình:', '')}></img></a>}
                          </div> : e.text.includes('Nguồn') ? 
                              <div className='bot-text'>
                                <a href={e.text.replace('(Nguồn)[', '').replace(']', '').replace('Nguồn:', '')} style={{color: "blue"}} target="_blank">Link tới bài đăng gốc</a>
                              </div> :
                          <div className='bot-text'>
                            {e.text}
                          </div>)}
                          {e.text && e.text===null &&
                            <>
                            </>
                          }
                        </div>
                        <div className='row left padding-text'>
                          {e.text && e.text!==null && 
                          <div className='bot-timestamp'>
                            <UnixDateComponent passedDate={e.timestamp} showDate={false}></UnixDateComponent>
                          </div>}
                        </div>
                      </div>
                    </div>) : e.event === "user" && (
                    <div className='row center padding-text'>
                    {e.text===userId ? <div className='row center sessionStart'><UnixDateComponent passedDate={e.timestamp}  showTime={false}></UnixDateComponent></div> : 
                      <div className='col-1'>
                        <div className='row right padding-text'>
                          <div className='user-text'>
                            {e.text}
                          </div>
                        </div>
                        <div className='row right padding-text'>
                          <div className='user-timestamp'>
                            <UnixDateComponent passedDate={e.timestamp} showDate={false}></UnixDateComponent>
                          </div>
                        </div>
                      </div>
                    }</div>)
                )
              ) }
              <div id="latest"></div>
          </div>
          <div className='popupCoverup'></div>
        </div>) : (
          open && <div className='rounded-div'>
            <div className='chatBoxHeader'>
              {botName}
            </div>
          <button className='confirmBtn xClose' onClick={closePopup}><i className='fa fa-close'></i></button>
          {/* <div className='chatBoxTitleBar'></div> */}
          <div id="chatBox" className='popupChatBox info chatWrapper'>
              {messages && messages.map((m)=>
                m && m.events && m.events.map((e)=>
                  e && e.event === "bot" ? (
                    <div className='row right padding-text'>
                      {/* <div className='pfpdiv row right'><img className='pfp' src={pfp}></img></div> */}
                      <div className='col-1'>
                        <div className='row right padding-text'>
                          {e.text && e.text!==null && (e.text.includes("Link hình") ? <div>
                            {<img className='chatImg' src={e.text.replace('(Link hình)[', '').replace(']', '').replace('Link hình:', '')}></img>}
                          </div> : e.text.includes('Nguồn') ? 
                              <div className='bot-text'>
                                <a href={e.text.replace('(Nguồn)[', '').replace(']', '').replace('Nguồn:', '')} style={{color: "blue"}} target="_blank">Link tới bài đăng gốc</a>
                              </div> :
                          <div className='bot-text'>
                            {e.text}
                          </div>)}
                          {e.text && e.text===null &&
                            <>
                            </>
                          }
                        </div>
                        <div className='row right padding-text'>
                          {e.text && e.text!==null && 
                          <div className='bot-timestamp'>
                            <UnixDateComponent passedDate={e.timestamp} showDate={false}></UnixDateComponent>
                          </div>}
                        </div>
                      </div>
                    </div>) : e.event === "user" && (
                    <div className='row center padding-text'>
                    {e.text===userId ? <div className='row center sessionStart'><UnixDateComponent passedDate={e.timestamp}  showTime={false}></UnixDateComponent></div> : 
                    e.text==="EXTERNAL: EXTERNAL_reminder" ? null :
                      <div className='col-1'>
                        <div className='row left padding-text'>
                          <div className='user-text'>
                            {e.text}
                          </div>
                        </div>
                        <div className='row left padding-text'>
                          <div className='user-timestamp'>
                            <UnixDateComponent passedDate={e.timestamp} showDate={false}></UnixDateComponent>
                          </div>
                        </div>
                      </div>
                    }</div>)
                )
              ) }
              <div id="latest"></div>
          </div>
          <div className='popupCoverup'></div>
        </div>
        )
      }
    </>
  )
}
