/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { serverUrl } from './urls';
const socket = io("http://localhost:3001");
const { RTCPeerConnection, RTCSessionDescription } = window;
import Button from '@material-ui/core/Button';

const peerConnection = new RTCPeerConnection();

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
    let [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const localVideo = document.getElementById('local-video');
        console.log("Local video: "+localVideo);
        console.log("Streamed video is: "+streamedVideo);
        console.log("Server: "+serverUrl());
        console.log("Publi URL: "+process.env.PUBLIC_URL);
        console.log("Port: "+process.env.PORT);
        
        let isAlreadyCalling = false;
        // NEW EXP CODE
        socket.on("update-user-list", ({ users }) => {
            updateUserList(users);
        });
        socket.on("remove-user", ({ socketId }) => {
            const elToRemove = document.getElementById(socketId);
            
            if (elToRemove) {
              elToRemove.remove();
            }
        });
        socket.on("call-made", async data => {
            await peerConnection.setRemoteDescription(
              new RTCSessionDescription(data.offer)
            );
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(new RTCSessionDescription(answer));
            
            socket.emit("make-answer", {
              answer,
              to: data.socket
            });
        });
        socket.on("answer-made", async data => {
            await peerConnection.setRemoteDescription(
              new RTCSessionDescription(data.answer)
            );
            
            if (!isAlreadyCalling) {
              callUser(data.socket);
              isAlreadyCalling = true;
            }
        });

        //OLD CODE
        navigator.getUserMedia(
            { video: true, audio: true },
            async stream => {
              if (localVideo && !streamedVideo) {
                localVideo.srcObject = stream;
                console.log(stream);
                stream.getTracks().forEach(track => {peerConnection.addTrack(track, stream)})
                // navigator.mediaDevices.getDisplayMedia().then((screenShare) => {
                //     console.log(screenShare);
                //     const allTracks = [];
                //     peerConnection.addTrack(screenShare.getTracks()[0], screenShare);
                //     // socket.emit('streaming', {id: 'local-video', audio: 'none', video: stream.getTracks()[0].id});
                // }).catch(rej => {console.log(rej)});
                // socket.emit('streaming', {id: 'local-video', audio: stream.getTracks()[0].id, video: stream.getTracks()[1].id});
                !streamedVideo && setStreamedVideo('bla');
              }
            },
            error => {
              console.warn(error.message);
            }
        );
        peerConnection.ontrack = function(stream) {
            const remoteVideo = document.getElementById("streamed-video");
            if (remoteVideo) {
                console.log(stream.streams[0]);
                remoteVideo.srcObject = stream.streams[0];
            
            
            }
           };
    }, []);
    
    useEffect(() => {
        if(streamedVideo === 'bla') {
            // const socket = io("http://localhost:3001");
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
    },[]);
    
    const updateUserList = (users) => {
        console.log("Users are: ", users);
        setAllUsers(allUsers.concat(users));
    }

    async function callUser(socketId) {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
        
        socket.emit("call-user", {
          offer,
          to: socketId
        });
    }
    

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
            <div>
                <ul>
    {allUsers.map(user => <li onClick={() => {callUser(user)}} key={user}><Button color="primary">Call - {user}</Button></li>)}
                </ul>
            </div>
        </div>
    );
}

export default NativeMeet;