import React from 'react'
import { isBrowser, isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import Widget from 'rasa-webchat';
import { Link } from 'react-router-dom';




export default function MobileChatBot() {
    // const socketUrl = "http://localhost:5005"
    // const socketUrl = "https://8102-27-2-16-47.ngrok.io";
    // const socketUrl = "https://1e2b-27-2-16-47.ngrok.io"
    // const socketUrl = "https://8131-27-2-16-47.ngrok.io";
    // const socketUrl = "https://3545-27-2-16-47.ngrok.io";
    // const socketUrl = "https://d990-27-2-16-47.ngrok.io"
    const socketUrl = "https://ba5b-27-2-16-47.ngrok.io"

    const botId = "629199aaad2ab670dc8a2f45";
    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo, loading, error} = userSignin;
  return (
    <div>
            {userInfo && userInfo.role!=="bot" && <Widget
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
                embedded={true}
                />
            }
    </div>
  )
}
