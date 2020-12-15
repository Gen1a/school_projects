import './App.css';
import { useState } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Apis from './components/Apis';
import Api from './components/Api';

const App = () => {
    const [apis, setApis] = useState([]);

    return (
      <Router>
          <Switch>
          <Route path="/api/:index">
                  <Api apis={apis}></Api>
              </Route>
              <Route path="/apis">
                  <Apis apis={apis} setApis={setApis}></Apis>
              </Route>
              <Route path="/">
                <Home></Home>
              </Route>
          </Switch>
      </Router>
    );
}

export default App;
