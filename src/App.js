import React from 'react';
// import Root from './Root';
import Meet from './Meet';
import Chat from './Chat';
import NativeMeet from './NativeMeet';
import TextNSpeech from './TextNSpeech';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

function App() {

  return (
    <Router>
      <div>
        <nav>
          <div className='navbar'>
            <h3>SABHA</h3>
            <Link to="/">Jitsi</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/meet">Meet</Link>
            <Link to="/textnspeech">Text and Speech</Link>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/chat">
          <Chat />
          </Route>
          <Route path="/meet">
          <div id="meet2">
            </div> 
            <NativeMeet />
          </Route>
          <Route path="/textnspeech">
            <TextNSpeech />
          </Route>
          <Route path="/">
            <Meet divId = 'meet'/> 
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
