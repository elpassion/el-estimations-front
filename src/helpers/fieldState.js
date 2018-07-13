export default function fieldState(fieldName, { values = {}, errors = {}, touched = {} }) {
  return {
    value: values[fieldName],
    error: errors[fieldName],
    touched: !!touched[fieldName],
  };
}
