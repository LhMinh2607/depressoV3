import React from 'react'

export default function MessageBox(props) {
    return(
        <div className={`alert alert-${props.variant || 'info'}`}>
            {props.variant==="error" ? <i className="fa fa-warning"></i> : <i className="fa fa-info-circle"></i>}{props.children}
        </div>
    )
}

// const {message, open, handleClosePopup, type} = props;

//   const closePopup = () =>{
//     handleClosePopup();
//     // alert(open);
//   }

//   return (
//     <>
//       {open && ((!type || type && type==="info") ? <div>
//         <div className='popup info'>
//           <div className='row center'><i className='fa fa-phone'></i>{message}</div>
//           <div className='row center'><button className='confirmBtn' onClick={closePopup}>Ok</button></div>
//         </div>
//         <div className='popupCoverup'></div>
//       </div> : type === "error" && 
//         <div>
//           <div className='popup error'>
//             <div className='row center'><i className='fa fa-error'></i>{message}</div>
//             <div className='row center'><button className='confirmBtn' onClick={closePopup}>Ok</button></div>
//           </div>
//           <div className='popupCoverup'></div>
//         </div>)
//     }
//     </>
//   )
// }