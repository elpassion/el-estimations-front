import React from 'react';
import { string, bool, func, arrayOf, shape, oneOfType, array } from 'prop-types';
import Select from 'react-select';
import fieldStateClasses from '../helpers/fieldStateClasses';

export default class SelectField extends React.Component {
  static propTypes = {
    name: string.isRequired,
    label: string,
    options: arrayOf(shape({
      label: string.isRequired,
      value: string.isRequired,
    })),
    error: string,
    touched: bool,
    value: oneOfType([string, array]),
    disabled: bool,
    placeholder: string,
    onChange: func,
    onBlur: func,
    clearable: bool,
    multi: bool,
  };

  static defaultProps = {
    label: '',
    options: [],
    error: '',
    touched: false,
    value: '',
    disabled: false,
    placeholder: '',
    onChange: () => {},
    onBlur: () => {},
    clearable: true,
    multi: false,
  };

  handleChange = (option) => {
    if (!this.props.multi) {
      this.props.onChange(this.props.name, option ? option.value : null);
    } else {
      this.props.onChange(this.props.name, option);
    }
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { name, label, options, error, touched, value, disabled, placeholder, clearable, multi } = this.props;

    return (
      <div className={ fieldStateClasses(name, this.props) }>
        { /* eslint-disable-next-line jsx-a11y/label-has-for */ }
        { label && <label className="field__label" htmlFor={ name }>{ label }</label> }

        <Select
          clearable={ clearable }
          multi={ multi }
          placeholder={ placeholder }
          disabled={ disabled }
          className="field__select"
          id={ name }
          options={ options }
          onChange={ this.handleChange }
          onBlur={ this.handleBlur }
          value={ value }
        />

        { error && touched && <span className="field__error">{ error }</span> }
      </div>
    );
  }
}
