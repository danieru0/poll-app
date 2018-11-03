import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Head from './components/Head/head';
import Nav from './components/Nav/nav';
import Poll from './components/Poll/poll';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div>
            <Nav />
            <Switch>
              <Route exact path="/" component={Head}/>
              <Route path="/:id" component={Poll}/>
            </Switch>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
