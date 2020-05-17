import React from 'react';
import './ChatStyles.css';

const Chat2 = (props) => {

    const {mychat, otherschat} = props;

    return (
        <div className="msger">
            <header className="msger-header">
                <div className="msger-header-title">
                    <i className="fas fa-comment-alt"></i> Sabha Chat
                </div>
                <div className="msger-header-options">
                    <span><i className="fas fa-cog"></i></span>
                </div>
            </header>

            <div className="msger-chat">
                <div className="msg left-msg">
                    <div
                        className="msg-img"
                        style={{backgroundImage: "url(https://image.flaticon.com/icons/svg/327/327779.svg)"}}
                    ></div>

                    <div className="msg-bubble">
                        <div className="msg-info">
                            <div className="msg-info-name">{otherschat.name}</div>
                            <div className="msg-info-time">{otherschat.time}</div>
                        </div>

                        <div className="msg-text">
                            {otherschat.text}
                        </div>
                    </div>
                </div>

                <div className="msg right-msg">
                    <div
                        className="msg-img"
                        style={{backgroundImage: "url(https://image.flaticon.com/icons/svg/145/145867.svg)"}}
                    ></div>

                    <div className="msg-bubble">
                        <div className="msg-info">
                            <div className="msg-info-name">{mychat.name}</div>
                            <div className="msg-info-time">{mychat.time}</div>
                        </div>

                        <div className="msg-text">
                            {mychat.text}
                        </div>
                    </div>
                </div>
            </div>

            <form className="msger-inputarea">
                <input type="text" className="msger-input" placeholder="Enter your message..."/>
                    <button type="submit" className="msger-send-btn">Send</button>
            </form>
        </div>
    )
}

export default Chat2;