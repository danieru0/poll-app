import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Head from './components/Head/head';
import Nav from './components/Nav/nav';
import Poll from './components/Poll/poll';
import Results from './components/Results/results';
import All from './components/All/all';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div>
            <Nav />
            <Switch>
              <Route exact path="/" component={Head}/>
              <Route path="/all" component={All}/>
              <Route path="/:id/results" component={Results}/>
              <Route path="/:id" component={Poll}/>
            </Switch>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
