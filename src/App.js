import React from 'react';
import Root from './Root';
import Meet from './Meet';
import NativeMeet from './NativeMeet';

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
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/meet">Meet</Link>
          </div>
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
            <NativeMeet />
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
