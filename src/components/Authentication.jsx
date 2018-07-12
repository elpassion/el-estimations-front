import React, { Fragment } from 'react';
import { string } from 'prop-types';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { UserContext } from '../contexts/UserContext';

const GOOGLE_CLIENT = process.env.REACT_APP_GOOGLE_AUTH_CLIENT;
const GOOGLE_DOMAIN = process.env.REACT_APP_GOOGLE_AUTH_DOMAIN;

function Authentication({ className }) {
  return (
    <UserContext.Consumer>
      { ({ state, logOut, logIn }) => {
        const { loggedIn } = state;

        const onSuccess = (response) => {
          logIn(response.accessToken);
        };

        const onError = (res) => {
          // eslint-disable-next-line no-console
          console.log('e', 'Something went wrong!', res);
        };

        return (
          <Fragment>
            { !loggedIn && (
              <GoogleLogin
                className={ className }
                clientId={ GOOGLE_CLIENT }
                hostedDomain={ GOOGLE_DOMAIN }
                buttonText="Log In with Google"
                onSuccess={ onSuccess }
                onFailure={ onError }
              />
            ) }

            { loggedIn && (
              <GoogleLogout
                className={ className }
                buttonText="Logout"
                onLogoutSuccess={ logOut }
              />
            ) }
          </Fragment>
        );
      } }
    </UserContext.Consumer>
  );
}

Authentication.propTypes = {
  className: string,
};

Authentication.defaultProps = {
  className: '',
};

export default Authentication;
