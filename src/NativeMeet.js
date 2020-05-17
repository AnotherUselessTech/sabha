import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { serverUrl } from './urls';
const videoDiv = {
    display: 'flex',
    justifyContent: 'space-around'
}

const video = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    height: '80%'
}

const NativeMeet = (props) => {

    let [streamedVideo, setStreamedVideo] = useState('');

    useEffect(() => {
        const localVideo = document.getElementById('local-video');
        console.log("Local video: "+localVideo);
        console.log("Streamed video is: "+streamedVideo);
        console.log("Server: "+serverUrl());
        console.log("Publi URL: "+process.env.PUBLIC_URL);
        console.log("Port: "+process.env.PORT);
        const socket = io(serverUrl());
        navigator.getUserMedia(
            { video: true, audio: true },
            stream => {
              if (localVideo) {
                localVideo.srcObject = stream;
                console.log(stream);
                socket.emit('streaming', {id: 'local-video', audio: stream.getTracks()[0].id, video: stream.getTracks()[1].id});
                !streamedVideo && setStreamedVideo('bla');
              }
            },
            error => {
              console.warn(error.message);
            }
           );
    }, [streamedVideo]);
    
    useEffect(() => {
        if(streamedVideo === 'bla') {
            const socket = io('http://localhost:3001');
            socket.on('listening', (msg) => {
                console.log(msg);
                if(msg.id) {
                    const newMedia = new window.MediaStream();
                    const actualMedia = document.getElementById(msg.id).srcObject.getTracks()
                    newMedia.addTrack(actualMedia[0]);
                    newMedia.addTrack(actualMedia[1]);
                    let streamedVideo = document.getElementById('streamed-video');
                    streamedVideo.srcObject = newMedia;
                    setStreamedVideo('ad');
                }
            });
        }
    });

    return (
        <div style={{ height: '35em' }}>
            <div className="content-container">
                <div className="video-chat-container">
                    <div className="video-container" style={videoDiv}>
                        <div style={video}>
                            <h3>Me</h3>
                            <video autoPlay muted className="local-video" id="local-video"></video>
                        </div>
                        <div style={video}>
                            <h3>You</h3>
                            <video autoPlay muted className="streamed-video" id="streamed-video">{streamedVideo}</video>
                        </div>         
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NativeMeet;