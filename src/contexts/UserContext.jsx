import React from 'react';
import { func, oneOfType, array, node } from 'prop-types';
import { API_KEY_LABEL } from '../helpers/constants';

/* eslint-disable react/no-unused-state */

export const UserContext = React.createContext({});

export class UserProvider extends React.Component {
  static propTypes = {
    requestApiToken: func.isRequired,
    children: oneOfType([array, node]),
    client: func.isRequired,
  };

  static defaultProps = {
    children: null,
  };

  state = {
    loggedIn: false,
    key: '',
  };

  componentDidMount() {
    const existingKey = window.localStorage.getItem(API_KEY_LABEL);

    if (existingKey) {
      this.setLoggedIn(existingKey);
    }
  }

  setLoggedIn = (key) => {
    this.setState({ loggedIn: true, key });
    window.localStorage.setItem(API_KEY_LABEL, key);
    this.props.client.defaults.headers.common.Authorization = `Token ${key}`;
  };

  removeLoggedIn = () => {
    this.setState({ loggedIn: false, key: '' });
    window.localStorage.removeItem(API_KEY_LABEL);
    this.props.client.defaults.headers.common.Authorization = '';
  };

  logIn = (accessToken) => {
    const { requestApiToken } = this.props;
    requestApiToken(accessToken)
      .then(({ data: { key } }) => this.setLoggedIn(key));
  };

  render() {
    const { children } = this.props;
    return (
      <UserContext.Provider
        value={ {
          state: this.state,
          logOut: this.removeLoggedIn,
          logIn: this.logIn,
        } }
      >
        { children }
      </UserContext.Provider>
    );
  }
}
