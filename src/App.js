import React, { useEffect, useState } from 'react';
import Root from './Root';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
// import { JitsiMeetExternalAPI } from './jitsi-min';

function App() {
  let [jitsiState, setJitsiState] = useState(false);
  let [jitsiParentNode, setJitsiParentNode] = useState(document.getElementById('meet'));

  const domain = 'meet.jit.si';
  const options = {
    roomName: 'JitsiMeetWithSaiTeja',
    height: '35em',
    parentNode: ''
  };

  useEffect(() => {
    // Update the document title using the browser API
      if(!jitsiState) {
        const script = document.createElement("script");
        script.src = "https://meet.jit.si/external_api.js";
        script.async = false;
        script.onload = () => {

          console.log("************************\n" + document.getElementById('meet'));
          const JitsiMeetExternalAPI = window.JitsiMeetExternalAPI;
          // setJitsiState(true);
          options.parentNode = document.getElementById('meet');
          // setJitsiParentNode(document.getElementById('meet'));
          console.log(window.JitsiMeetExternalAPI);
          new JitsiMeetExternalAPI(domain, options);

        };

        document.body.appendChild(script);
      }
      else {
        const JitsiMeetExternalAPI = window.JitsiMeetExternalAPI;
        new JitsiMeetExternalAPI(domain, options);
      }
    
  });

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/meet">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
          <Root />
          </Route>
          <Route path="/meet">
          <div id="meet2">
            </div> 
          </Route>
          <Route path="/">
            <div id="meet">
            </div>  
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
