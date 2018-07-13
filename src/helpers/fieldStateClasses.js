import classNames from 'classnames';

export default function fieldStateClasses(fieldName, { errors = {}, touched = {}, error = '' }) {
  return classNames([
    'field', {
      'field--has-error': (errors[fieldName] && touched[fieldName]) || (error && touched === true),
    }]);
}
