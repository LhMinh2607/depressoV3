import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { editNotification, listOfNotifications } from '../actions/notificationAction';

export default function MobileNotification(props) {
    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo, loading, error} = userSignin;
    const dispatch = useDispatch();
    const notificationList = useSelector(state=>state.notificationList);
    const {loading: loadingNotifList, error: errorNotifList, notifications} = notificationList;

    const {currentSocket} = props;


    const allNotificationList = useSelector(state=>state.allNotificationList);
    const {loading: loadingAllNotifList, error: errorAllNotifList, allNotifications} = allNotificationList;
    const updateNotificationStatus = (notifId) =>{
        dispatch(editNotification(notifId));
        // alert("Test"+notifId)
        currentSocket.emit("addCounselingRequest");
        console.log("addCounselingRequest")
        dispatch(listOfNotifications(userInfo._id))
      }
  return (
    <div>
        {userInfo && <div className='bell'>
            <div className='row'>
                <div><i className='fa fa-bell'></i></div>
                {/* temporary solution. This should use localStorage */}
                {notifications && notifications.filter(notif=>notif.status==="").length} thông báo
                
            </div>
            {userInfo && <ul className='' style={{backgroundColor: "#0055ff", width: "100vw", height: "100%"}}>
            {/* {notifications && notifications.length && notifications.map((notif)=>(
                notif.type==="friendRequest" && notif.status!=="checked" && <li key={notif._id}>
                {notif.content}
                <div className='addFriendButton interactiveText' onClick={()=>addThisFriend(notif.senderId)}>Chấp nhận</div>
                </li> 
            ))} */}
            {notifications && notifications.length && notifications.map((notif)=>(
                (notif.type==="commentAlert") && (notif.status==="" ? <Link to={`/forum/post/${notif.postId}`} onClick={()=>updateNotificationStatus(notif._id)}><li className='' key={notif._id} >
                {notif.content}
                </li></Link> : notif.status === "checked" && <Link to={`/forum/post/${notif.postId}`}><li style={{color: "grey"}} className='' key={notif._id} >
                {notif.content}
                </li></Link>)
            ))}
            {/* {notifications && notifications.length && notifications.map((notif)=>(
                notif.type==="commentAlert" && notif.status!=="checked" && <li className='' onClick={()=>updateNotificationStatus(notif._id)} key={notif._id} >
                {notif.content}
                </li>
            ))} */}
            </ul>}
            </div>}
    </div>
  )
}
