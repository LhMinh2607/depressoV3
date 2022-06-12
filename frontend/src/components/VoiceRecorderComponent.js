import React, { useEffect, useState } from 'react'
import MultiStreamsMixer from 'multistreamsmixer';
import RecordRTC from 'recordrtc';

export default function VoiceRecorderComponent(props) {
    const {source} = props;
    const left = document.querySelector("#left");
    const right = document.querySelector("#right");
    const output = document.querySelector("#output");
    let streams = null;
    let recorder = null;
    // const [recordingState, setRecordingState] = useState('pause');

    // const startButton = document.querySelector("#start-record-button");
    // const stopButton = document.querySelector("#stop-record-button");
    // const downloadButton = document.querySelector("#download-button");

    

    const startRecording = () => {
        left.play();
        recorder.startRecording();
        // setRecordingState("start");
        document.getElementById("start-record-button").style.opacity = "50%";
        document.getElementById("stop-record-button").style.opacity = "100%";
        document.getElementById("download-button").style.opacity = "50%";
        document.getElementById("start-record-button").style.width = "0";
        document.getElementById("stop-record-button").style.width = "100%";
        document.getElementById("download-button").style.width = "0";   
    };

    const pauseRecording = () => {
        left.pause();
        recorder.stopRecording(() => {
        var blob = recorder.getBlob();
        output.srcObject = null;
        output.src = URL.createObjectURL(blob);
        output.muted = false;
        output.loop = true;
        output.play();
        document.getElementById("start-record-button").style.opacity = "50%";
        document.getElementById("stop-record-button").style.opacity = "50%";
        document.getElementById("download-button").style.opacity = "100%";
        document.getElementById("start-record-button").style.width = "0";
        document.getElementById("stop-record-button").style.width = "0";
        document.getElementById("download-button").style.width = "100%"; 
        // streams.forEach(function (stream) {
        //   stream.getTracks().forEach(function (track) {
        //     track.stop();
        //   });
        // });
        });
        // setRecordingState("pause");

    };

    const download = () => {
        const blob = recorder.getBlob();
        const url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "dance.wav";
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        document.getElementById("start-record-button").style.opacity = "100%";
        document.getElementById("stop-record-button").style.opacity = "50%";
        document.getElementById("download-button").style.opacity = "50%";
        document.getElementById("start-record-button").style.width = "100%";
        document.getElementById("stop-record-button").style.width = "0";
        document.getElementById("download-button").style.width = "0"; 
        // setRecordingState("download");

    };

    (async () => {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
        });
        right.srcObject = cameraStream;
        right.play();
        const videoStream = await getVideoStream(left);
        streams = [videoStream, cameraStream];
        // streams.forEach(s => {
        // const size = getStreamSize(s);
        // s.width = size.width;
        // s.height = size.height;
        // });
        const mixer = new MultiStreamsMixer(streams);
        mixer.startDrawingFrames();
        const mixedStream = mixer.getMixedStream();
        output.srcObject = mixedStream;
        output.play();
        recorder = RecordRTC(mixedStream, {
        type: "audio",
        mimeType: "audio/mp3",
        previewStream: function (s) {
            output.srcObject = s;
            output.play();
        }
        });
    })();

    function getVideoStream(video) {
        return new Promise((resolve) => {
        video.play();
        const onplay = () => {
            resolve(video.captureStream());
            video.pause();
            video.currentTime = 0;
            video.removeEventListener("play", onplay);
        };
        video.addEventListener("play", onplay);
        });
    }

    // function getStreamSize(stream) {
    //     const { width, height } = stream.getTracks().find(t => t.kind === "video").getSettings();
    //     return {width, height};
    // }

    useEffect(() => {
        document.getElementById("start-record-button").style.opacity = "100%";
        document.getElementById("stop-record-button").style.opacity = "50%";
        document.getElementById("download-button").style.opacity = "50%";
        document.getElementById("start-record-button").style.width = "100%";
        document.getElementById("stop-record-button").style.width = "0";
        document.getElementById("download-button").style.width = "0";       
    }, [])
    
  return (
    <div>
        <audio id="left" src={source} crossOrigin="anonymous" preload></audio>
        <audio id="right"  crossOrigin="anonymous" muted></audio>
        <audio controls id="output" muted></audio>
        <div className='row left'>
        {/* {(recordingState === "pause") && <button id="start-record-button" onClick={startRecording}>Start Record</button>}
        {recordingState === "start" && <button id="stop-record-button" onClick={pauseRecording}>Stop Record</button>}
        {recordingState === "pause" &&
        <button id="download-button" onClick={download}>Download</button>} */}
            <button className='col-0' id="start-record-button" onClick={startRecording}><i className='fa fa-play-circle'></i></button>
            <button className='col-0' id="stop-record-button" onClick={pauseRecording}><i className='fa fa-stop-circle'></i></button>
            <button className='col-0' id="download-button" onClick={download}><i className='fa fa-download'></i></button>
        </div>
    </div>
  )
}
