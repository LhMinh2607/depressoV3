import React, { useState } from 'react'

export default function PopupMessageBox(props) { //MessageBox that handles external function
  //This MessageBox depends on external states

  const {message, open, handleClosePopup, type} = props;

  const closePopup = () =>{
    handleClosePopup();
    // alert(open);
  }

  return (
    <>
      {open && ((!type || type && type==="info") ? <div>
        <div className='popup info'>
          <div className='row center'><i className='fa fa-phone'></i>{message}</div>
          <div className='row center'><button className='phoneConfirmBtn' onClick={closePopup}>Ok</button></div>
        </div>
        <div className='popupCoverup'></div>
      </div> : type === "error" && 
        <div>
          <div className='popup error'>
            <div className='row center'><i className='fa fa-error'></i>{message}</div>
            <div className='row center'><button className='phoneConfirmBtn' onClick={closePopup}>Ok</button></div>
          </div>
          <div className='popupCoverup'></div>
        </div>)
    }
    </>
  )
}
