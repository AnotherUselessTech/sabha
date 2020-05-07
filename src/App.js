import React, { useEffect, useState } from 'react';
import Root from './Root';
import Meet from './Meet';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
// import { JitsiMeetExternalAPI } from './jitsi-min';

function App() {

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
              <Link to="/meet">Meet</Link>
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
            <Meet divId = 'meet2'/> 
          </Route>
          <Route path="/">
            <div id="meet">
            </div>
            <Meet divId = 'meet'/> 
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
