import React from 'react'

export default function TimeConverter(props) {


    const {timeInSec} = props;

    let hours   = Math.floor(timeInSec / 3600); 
    let minutes = Math.floor((timeInSec - (hours * 3600)) / 60); 
    let seconds = timeInSec - (hours * 3600) - (minutes * 60);
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    return (
        <div>
            {timeInSec===0 ? <div className='row'>"00:00:00"</div>:
                <div className='row'>{hours+':'+minutes+':'+seconds}</div>
            }
            {!timeInSec && <div className='row'>Unvailable</div>}
        </div>
    )
}
