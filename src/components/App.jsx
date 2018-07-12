import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import { UserProvider, UserContext } from '../contexts/UserContext';

import Spinner from './Spinner';
import Navbar from './Navbar';
import Login from './Login';
import TestPage from './TestPage';
import TestPage2 from './TestPage2';

export default class App extends React.Component {
  constructor() {
    super();

    this.client = axios.create({
      baseURL: 'https://floating-anchorage-81205.herokuapp.com/api/v1',
    });
  }

  requestApiToken = googleToken => this.client.post('/auth/google/', { access_token: googleToken });

  render() {
    return (
      <UserProvider requestApiToken={ this.requestApiToken }>
        <UserContext.Consumer>
          { ({ state: { loggedIn } }) => (!loggedIn ? <Login /> : (
            <Router>
              <Fragment>
                <header>
                  <Navbar />
                </header>

                <main className="container container--full-height">
                  <Switch>
                    <Route path="/other" component={ TestPage2 } />
                    <Route path="/" component={ TestPage } />
                  </Switch>
                </main>
              </Fragment>
            </Router>

          )) }
        </UserContext.Consumer>
        <Spinner active={ false } />
      </UserProvider>
    );
  }
}
