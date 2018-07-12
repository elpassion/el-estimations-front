import React, { Fragment } from 'react';
import axios from 'axios';

import { UserProvider, UserContext } from '../contexts/UserContext';

import Spinner from './Spinner';
import Navbar from './Navbar';
import Login from './Login';

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
            <Fragment>
              <header>
                <Navbar />
              </header>

              <main className="container container--full-height">
                <section className="segment">
                  <h1>
                      Some title
                  </h1>

                  <p>
                      Some intro text
                  </p>

                  <div>
                    <a href="/" className="button button--spaced">
                        button 1
                    </a>
                  </div>
                </section>

                <section className="segment">
                  <form>
                    <div className="field">
                      <label className="field__label" htmlFor="name">
                          Name:
                      </label>

                      <input className="field__input" type="text" id="name" name="name" />

                      <span className="field__annotation">
annotation
                      </span>
                    </div>

                    <div className="field">
                      <input type="checkbox" id="checkbox" name="checkbox" />

                      <label className="field__checkbox-label" htmlFor="checkbox">
                          Checkbox!
                      </label>
                    </div>
                  </form>
                </section>

                <section className="segment">
                  <table>
                    <thead>
                      <tr>
                        <th>
                            A table!
                        </th>

                        <th>
                            column 1
                        </th>

                        <th>
                            column 2
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>
                            row 1
                        </td>

                        <td>
                            val 1.1
                        </td>

                        <td>
                            val 1.2
                        </td>
                      </tr>

                      <tr>
                        <td>
                            row 2
                        </td>

                        <td>
                            val 2.1
                        </td>

                        <td>
                            val 2.2
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <a href="/" className="button button--secondary button--spaced">
                      button 2
                  </a>
                </section>
              </main>
            </Fragment>

          )) }
        </UserContext.Consumer>
        <Spinner active={ false } />
      </UserProvider>
    );
  }
}
