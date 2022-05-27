import React, { useEffect } from 'react';
import { useStopwatch  } from 'react-timer-hook';

export default function Timer(props) {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });

    const {connectivity} = props;
    
    const stop = () =>{
        console.log(hours+":"+minutes+":"+seconds)
        pause();
    }
    var totalTime = 0; //in seconds

    useEffect(()=>{
        if(connectivity===false){
            totalTime=seconds;
            totalTime+=minutes*60;
            totalTime+=hours*3600;
            alert(totalTime);
            stop();
        }
    }, [connectivity]);
    return (
    <div style={{textAlign: 'center'}}>
        <div className='timer'>
            <span>{hours<10 ? "0"+hours : hours}</span><span>:</span><span>{minutes<10 ? "0"+minutes : minutes}</span><span>:</span><span>{seconds<10 ? "0"+seconds : seconds}</span>
        </div>
        {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
        {/* <button onClick={start}>Start</button> */}
        {/* <button onClick={pause}>Pause</button> */}
        {/* {connectivity} */}
        {/* <button onClick={reset}>Reset</button> */}
    </div>
  );
}