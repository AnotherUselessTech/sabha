/* eslint-disable */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
// import Chat2 from './Chat2';
import './ChatStyles.css';
// import { serverUrl } from './urls';

const inputStyle = {
    width: '30%',
    lineHeight: 2.5,
    borderRadius: '4px',
    border: '1px solid green',
    padding: '5px',
    backgroundColor: '#dcf4d1',
    marginLeft: '10px'
}

const chatInputStyle = {
    width: '50%',
    lineHeight: 2.5,
    borderRadius: '4px',
    border: '1px solid green',
    padding: '5px',
    backgroundColor: '#dcf4d1',
    marginLeft: '10px'
}

const buttonStyle = {
    backgroundColor: 'lightgreen',
    lineHeight: 2.5,
    fontSize: 'medium',
    borderRadius: '4px',
    width: '30%',
    marginTop: '30px'
}

const chatButtonStyle = {
    backgroundColor: 'lightgreen',
    lineHeight: 1.5,
    fontSize: 'medium',
    borderRadius: '4px',
    width: '30%',
    marginTop: '30px'
}

const divStyle = {
    display: 'flex',
    margin: '10%',
    marginLeft: '30%',
    width: '50%',
    flexDirection: 'column',
    alignItems: 'center'
}

const inputDiv = {
    width: '100%',
    display: 'flex',
    margin: '10px',
    alignItems: 'center',
    flex: 1
}

const buttonDiv = {
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end'
}

const Chat = () => {
    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [chatStarted, setrChatStarted] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [otherChat, setOtherChat] = useState({});
    const [myChat, setMyChat] = useState({});
    const [allChat, setAllChat] = useState({chatsData: []});

    const setUsersData = (chats, othersChatSet, myChatSet) => {
        Object.keys(chats.chatsData).forEach(user => {
            if (chats.chatsData[user].messages.length) {
                if (user !== userName) {
                    if (othersChatSet[user] && (chats.chatsData[user].messages.length !== othersChatSet[user].messages.length)) {
                        console.log(1)
                        othersChatSet[user] = { username: user, messages: chats.chatsData[user].messages };
                        console.log(2)
                        console.log("others chat changed");
                    }
                    else if (!othersChatSet[user]) {
                        othersChatSet[user] = { username: user, messages: chats.chatsData[user].messages };
                        console.log("others chat created");
                    }
                }
                else {
                    if (myChat[user] && (chats.chatsData[user].messages.length !== myChat[user].messages.length)) {
                        myChatSet[user] = { username: user, messages: chats.chatsData[user].messages };
                        console.log("my chat changed");
                    }
                    else if (!myChatSet[user]) {
                        myChatSet[user] = { username: user, messages: chats.chatsData[user].messages }
                        console.log("my chat created");
                    }
                }
            }
        });

    }

    useEffect(() => {
        if(chatStarted) {
            console.log("In effect, without socket!")
            // const socket = io(window.location.origin, {transports: ['websocket']});
            const socket = io();
            socket.emit('initialize', {roomName});
            socket.on('otherschatreplies', (chats) => {
            let myChatSet = {};
            let othersChatSet = {};
            // setUsersData(chats, othersChatSet, myChatSet);
            // setOtherChat(othersChatSet);
            // setMyChat(myChatSet);
            console.log("Trying not to look");
            console.log(chats.dontlook);
            const sortedChats = collectAndSortMessages(chats.chatsData);
            setAllChat(chats);

        });
        }
    }, [chatStarted]);

    const collectAndSortMessages = (allChats) => {
        // const allChats = { ...otherChat, ...myChat };
        let messages = [];
        messages = allChats.sort((a,b) => a.time - b.time);
        // allChats.forEach(user => {
        //     const msgsOfUser = allChats[user].messages.map(message => {
        //         return {
        //             user,
        //             time: message.time,
        //             text: message.text
        //         }
        //     });
        //     messages = messages.concat(msgsOfUser);
        //     messages = messages.sort((a, b) => a.time - b.time);
        // });

        return messages;
    }

    const login = () => {
        return (
            <div style={divStyle}>
                <div style={inputDiv}>
                    <span>Room Name</span>
                    <input style={inputStyle} key="roomname" onChange={(e) => { setRoomName(e.target.value) }}></input>
                </div>
                <div style={inputDiv}>
                    <span>User Name &nbsp;</span>
                    <input style={inputStyle} key="username" onChange={(e) => { setUserName(e.target.value) }}></input>
                </div>
                <div style={buttonDiv}>
                    <button style={buttonStyle} onClick={() => {
                        setrChatStarted(true);
                        // const socket = io(window.location.origin, {transports: ['websocket']});
                        const socket = io();
                        socket.emit('joined', { roomName: roomName, username: userName });
                    }}>Join Chat Room</button>
                </div>
            </div>
        )
    }

    const getTimeString = (timeStamp) => {
        let time = new Date(Number(timeStamp));
        return `${time.getHours()}:${time.getMinutes()}`;
    }

    const chatView = () => {
        console.log("Rerendering chat view...");
        // const allChats = { ...otherChat, ...myChat };
        // console.log({ ...otherChat, ...myChat });
        console.log(allChat);
        console.log(userName, roomName);
        // const allMessages = collectAndSortMessages();
        return (
            <div>
                <div className="msger">
                    <header className="msger-header">
                        <div className="msger-header-title">
                            <i className="fas fa-comment-alt"></i> Sabha Chat Room - {roomName}
                        </div>
                        <div className="msger-header-options">
                            <span><i className="fas fa-cog">{userName}</i></span>
                        </div>
                    </header>

                    <div className="msger-chat">
                        {/* allMessages.map(...*/}
                        {allChat.chatsData.map(message => {
                            if (message.user !== userName) {
                                return (
                                    <div className="msg left-msg">
                                        <div
                                            className="msg-img"
                                            style={{ backgroundImage: "url(https://image.flaticon.com/icons/svg/327/327779.svg)" }}
                                        ></div>

                                        <div className="msg-bubble">
                                            <div className="msg-info">
                                                <div className="msg-info-name">{message.user}</div>
                                                <div className="msg-info-time">{getTimeString(message.time)}</div>
                                            </div>

                                            <div className="msg-text">
                                                {message.message}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            else {
                                return <div className="msg right-msg">
                                    <div
                                        className="msg-img"
                                        style={{ backgroundImage: "url(https://image.flaticon.com/icons/svg/145/145867.svg)" }}
                                    ></div>

                                    <div className="msg-bubble">
                                        <div className="msg-info">
                                            <div className="msg-info-name">{message.user}</div>
                                            <div className="msg-info-time">{getTimeString(message.time)}</div>
                                        </div>

                                        <div className="msg-text">
                                            {message.message}
                                        </div>
                                    </div>
                                </div>
                            }
                        })

                        }

                    </div>

                    <form className="msger-inputarea" onSubmit={(e) => {
                        e.preventDefault();
                        // const socket = io(window.location.origin, {transports: ['websocket']});
                        const socket = io();
                        socket.emit('captureChat', {
                            username: userName,
                            roomName: roomName,
                            message: {
                                time: (new Date()).getTime(),
                                text: chatInput
                            }
                        });
                        allChat.chatsData.push({user: userName, message: chatInput, time: (new Date()).getTime()});
                        setAllChat(allChat);
                        setChatInput('');
                    }}>
                        <input type="text" value={chatInput} onChange={(e) => { setChatInput(e.target.value) }} className="msger-input" placeholder="Enter your message..." />
                        <button type="submit" className="msger-send-btn" >Send</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div style={{ height: '35em' }}>
            {chatStarted ? chatView() : login()}
        </div>
    )
}

export default Chat;