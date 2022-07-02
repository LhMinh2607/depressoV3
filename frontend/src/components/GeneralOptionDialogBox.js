import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/userAction';

export default function GeneralOptionDialogBox(props) {

  const {message, func1Name, func2Name, func3Name, handleFunc1, handleFunc2, handleFunc3, handleClosePopup} = props;

  const dispatch = useDispatch();

  const closePopup = () =>{
    handleClosePopup();
    // alert(open);
  }

  const function1 = (a) =>{
    handleFunc1(a);
  }

  const function2 = (a) => {
    handleFunc2(a);
  }

  const function3 = (a) => {
    handleFunc3(a)
  }

  return (
    <div>
      {
      <div className='popupBackground'>
        <div className='popup option' style={{paddingTop: "2rem"}}>
          <div className='row top right'><button className='phoneConfirmBtn xClose' onClick={closePopup}><i className='fa fa-close'></i></button></div>
          {func1Name && <div className='row center'><button className='primary2' onClick={()=>function1(func1Name)}>{func1Name}</button></div>}
          {func2Name && <div className='row center'><button className='primary2' onClick={()=>function2(func2Name)}>{func2Name}</button></div>}
        </div>
      </div>}
    </div>
  )
}
