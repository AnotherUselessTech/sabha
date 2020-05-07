import React from 'react';
import Root from './Root';

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
            Whatev
          </Route>
          <Route path="/">
            <div id="meet">
              I am here
            </div>  
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
