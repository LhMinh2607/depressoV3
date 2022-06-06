import React from 'react'
import MultiStreamsMixer from 'multistreamsmixer';
import RecordRTC from 'recordrtc';

export default function RecorderComponent(props) {
    const {source} = props;
    const left = document.querySelector("#left");
    const right = document.querySelector("#right");
    const output = document.querySelector("#output");
    let streams = null;
    let recorder = null;

    const startRecording = () => {
        left.play();
        recorder.startRecording();
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

        // streams.forEach(function (stream) {
        //   stream.getTracks().forEach(function (track) {
        //     track.stop();
        //   });
        // });
        });
    };

    const download = () => {
        const blob = recorder.getBlob();
        const url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "dance.webm";
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    (async () => {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
        });
        right.srcObject = cameraStream;
        right.play();
        const videoStream = await getVideoStream(left);
        streams = [videoStream, cameraStream];
        streams.forEach(s => {
        const size = getStreamSize(s);
        s.width = size.width;
        s.height = size.height;
        });
        const mixer = new MultiStreamsMixer(streams);
        mixer.startDrawingFrames();
        const mixedStream = mixer.getMixedStream();
        output.srcObject = mixedStream;
        output.play();
        recorder = RecordRTC(mixedStream, {
        type: "video",
        mimeType: "video/webm",
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

    function getStreamSize(stream) {
        const { width, height } = stream.getTracks().find(t => t.kind === "video").getSettings();
        return {width, height};
    }
  return (
    <div>
        <video id="left" src={source} crossOrigin="anonymous" preload></video>
        <video id="right"  crossOrigin="anonymous" muted></video>
        <video id="output" muted></video>
        <div>
        <button id="start-record-button" onClick={startRecording}>Start Record</button>
        <button id="stop-record-button" onClick={pauseRecording}>Stop Record</button>
        <button id="download-button" onClick={download}>Download</button>
        </div>
    </div>
  )
}
