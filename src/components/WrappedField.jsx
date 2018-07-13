import React from 'react';
import { string, shape, bool, number } from 'prop-types';
import { Field } from 'formik';
import { upperFirst } from 'lodash';

import fieldStateClasses from '../helpers/fieldStateClasses';

function WrappedField({ name, label, type, annotation, placeholder, hideLabel, min, max, step, props }) {
  const inputType = type || name;

  const getInputProps = () => {
    const baseProps = {
      name,
      id: name,
      className: 'field__input',
      placeholder,
    };

    switch (inputType) {
      case 'textarea':
        return {
          ...baseProps,
          component: 'textarea',
        };
      case 'number':
        return {
          ...baseProps,
          type: inputType,
          min,
          max,
          step,
        };
      default:
        return {
          ...baseProps,
          type: inputType,
        };
    }
  };

  return (
    <div className={ fieldStateClasses(name, props) }>
      { /* eslint-disable-next-line jsx-a11y/label-has-for */ }
      { !hideLabel && <label className="field__label" htmlFor={ name }>{ label || upperFirst(name) }:</label> }

      <Field { ...getInputProps() } />

      { /* eslint-disable-next-line react/prop-types */ }
      <span className="field__error">{ props.errors[name] }</span>

      { annotation && <span className="field__annotation">{ annotation }</span> }
    </div>
  );
}

WrappedField.propTypes = {
  name: string.isRequired,
  label: string,
  type: string,
  annotation: string,
  placeholder: string,
  hideLabel: bool,
  props: shape({
    errors: shape({}).isRequired,
    touched: shape({}).isRequired,
  }).isRequired,
  min: number,
  max: number,
  step: number,
};

WrappedField.defaultProps = {
  label: '',
  type: '',
  annotation: '',
  placeholder: '',
  hideLabel: false,
  min: null,
  max: null,
  step: 1,
};

export default WrappedField;
