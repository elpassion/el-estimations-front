import React from 'react';
import { bool } from 'prop-types';
import classNames from 'classnames';

function Spinner({ active }) {
  return (
    <div className={ classNames(['Spinner', { 'Spinner--active': active }]) } />
  );
}

Spinner.propTypes = {
  active: bool,
};

Spinner.defaultProps = {
  active: false,
};

export default Spinner;
