import React, { useState } from 'react'

export default function IndependentMessageBox(props) { //MessageBox that opens on an event and closes on its own)
  //This MessageBox is independant on other external function components' states and functions


  let MenuSelectionClick = new Audio("/assets/MenuSelectionClick.mp3");
  let audioAmbientClick = new Audio("/assets/AmbientClick.mp3");

  const {message, type} = props;

  const [open, setOpen] = useState(true);

  const closePopup = () =>{
    setOpen(false);
    MenuSelectionClick.play();
    audioAmbientClick.play();
  }

  return (
    <>
      {open && ((!type || type && type==="info") ? <div>
        <div className='popup info'>
          <div className='row center'><i className='fa fa-phone'></i>{message}</div>
          <div className='row center'><button className='confirmBtn' onClick={closePopup}>Ok</button></div>
        </div>
        <div className='popupCoverup'></div>
      </div> : type === "error" && 
        <div>
          <div className='popup error'>
            <div className='row center'><i className='fa fa-error'></i>{message}</div>
            <div className='row center'><button className='confirmBtn' onClick={closePopup}>Ok</button></div>
          </div>
          <div className='popupCoverup'></div>
        </div>)
    }
    </>
  )
}
