import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Head from './components/Head/head';
import Nav from './components/Nav/nav';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div>
            <Nav />
            <Switch>
              <Route exact path="/" component={Head}/>
            </Switch>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
