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
    me: null,
  };

  componentDidMount() {
    const existingKey = window.localStorage.getItem(API_KEY_LABEL);

    if (existingKey) {
      this.setLoggedIn(existingKey);
    }
  }

  setLoggedIn = async (key) => {
    const { client } = this.props;
    window.localStorage.setItem(API_KEY_LABEL, key);
    client.defaults.headers.common.Authorization = `Token ${key}`;
    const { data } = await client.get('/users/me/');
    this.setState({ loggedIn: true, key, me: data });
  };

  removeLoggedIn = () => {
    this.setState({ loggedIn: false, key: '', me: null });
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
