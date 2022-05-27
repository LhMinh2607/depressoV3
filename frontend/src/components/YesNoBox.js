import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function YesNoBox(props) {

  const {message, handleYes, handleNo} = props;

  const dispatch = useDispatch();

  const yes = () =>{
    handleYes();
  }

  const no = () => {
    handleNo();
  }

  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;

  return (
    <div>
      {
        <div>
            <div className='popup option'>
                <div className='row center'>{message}</div>
                <div className='row center'>
                    <div className='col-1'><button className='phoneConfirmBtn' onClick={yes}></button></div>
                    <div className='col-1'><button className='phoneConfirmBtn' onClick={no}></button></div>
                </div>
            </div>
            <div className='popupCoverup'></div>
        </div>}
    </div>
  )
}
