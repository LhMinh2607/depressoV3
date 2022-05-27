import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UnixDateComponent from './UnixDateComponent';

export default function Gallery(props) {
    const {messages, userId, botPOV=false} = props;

    const userDetail = useSelector(state => state.userDetail);
    const {loading: loadingUser, error: errorUser, user} = userDetail;
    const dispatch = useDispatch();
    const botName = "Mental Bot";
    useEffect(() => {
        var myElement = document.getElementById('latest');
        if(myElement){
            // alert(myElement)
            var topPos = myElement.offsetTop;
            document.getElementById('chatBox').scrollTop = topPos;
        }
    });
    return (
    <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
        {messages && messages.map((m)=>
        m && m.events && m.events.map((e)=>
            e && e.event === "bot" && e.text && e.text!==null && (e.text.includes("Link hình") && (
            <div className='row center padding-text'>
                <div className='col-1'>
                    <div className='row center padding-text'>
                        <div>
                            {<a href={e.text.replace('(Link hình)[', '').replace(']', '').replace('Link hình:', '')} target="_blank"><img className='chatImg' src={e.text.replace('(Link hình)[', '').replace(']', '').replace('Link hình:', '')}></img></a>}
                            <div className='bot-timestamp'>
                                <UnixDateComponent passedDate={e.timestamp} showDate={true}></UnixDateComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        )))}
    </div>
    )
}
