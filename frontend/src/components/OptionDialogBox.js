import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/userAction';

export default function OptionDialogBox(props) {

  const {message, handleClosePopup, handleOpenContact, handleOpenHistory} = props;

  const dispatch = useDispatch();

  const closePopup = () =>{
    handleClosePopup();
    // alert(open);
  }

  const openContact = () =>{
    handleOpenContact();
  }

  const openHistory = () => {
    handleOpenHistory();
  }

  const signoutHandler = () => {
    dispatch(signout());
  }

  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;

  return (
    <div>
      {
      <div>
        <div className='popup option'>
          <div className='row top right'><button className='phoneConfirmBtn xClose' onClick={closePopup}><i className='fa fa-close'></i></button></div>
          {userInfo && <div className='row center'><div className='displayNameContact' onClick={closePopup}><i className='fa fa-user'></i>{userInfo.displayName}</div></div>}
          <div className='row center'><button className='phoneConfirmBtn' onClick={openContact}><i className='fa fa-address-book-o'>Danh bạ</i></button></div>
          <div className='row center'><button className='phoneConfirmBtn' onClick={openHistory}><i className='fa fa-history'>Nhật ký</i></button></div>
          {/* {userInfo && 
            <div className='row center'><button className='phoneConfirmBtn' onClick={signoutHandler}><i className='fa fa-reply'>Signout</i></button></div>
          } */}
        </div>
        <div className='popupCoverup'></div>
      </div>}
    </div>
  )
}
