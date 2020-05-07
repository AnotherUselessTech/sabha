import React from 'react';
import logo from './logo.svg';
import Jitsi from './jitsi-min';

export default function () {
    const domain = 'meet.jit.si';
    const options = {
        roomName: 'JitsiMeetAPIExample',
        width: 700,
        height: 700,
        parentNode: document.getElementById('meet')
    };
    console.log("************************\n"+options.parentNode)
    console.log(document.getElementById("meet"));
    // new Jitsi(domain, options);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )
}