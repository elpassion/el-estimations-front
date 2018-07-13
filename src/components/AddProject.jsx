import React from 'react';
import { Formik } from 'formik';
import { func } from 'prop-types';
import * as Yup from 'yup';
import SelectField from './SelectField';

const schema = Yup.object().shape({
  client_name: Yup.string().required(),
  name: Yup.string().required(),
  description: Yup.string().required(),
  teams: Yup.array().required()
});

export class AddProject extends React.Component {
  static propTypes = {
    client: func.isRequired,
  };

  state = {
    teams: [],
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const res = await this.props.client.get('/teams/');
    this.setState({ teams: res.data.map((team, index) => ({label: team.name, value: "" + team.id})) });
  }

  render() {
    return (
      <Formik
        validationSchema={ schema }
        onSubmit={ (values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        } }
        render={ formikProps => (
          <form onSubmit={ formikProps.handleSubmit }>
            <input
              type="text"
              onChange={ formikProps.handleChange }
              onBlur={ formikProps.handleBlur }
              values={ formikProps.values.name }
              name="client_name"
            />
            <input
              type="text"
              onChange={ formikProps.handleChange }
              onBlur={ formikProps.handleBlur }
              values={ formikProps.values.name }
              name="name"
            />
            <textarea
              onChange={ formikProps.handleChange }
              onBlur={ formikProps.handleBlur }
              values={ formikProps.values.name }
              name="description"
            />
            <SelectField
              clearable={ false }
              name="teams"
              onChange={ formikProps.setFieldValue }
              onBlur={ formikProps.setFieldTouched }
              options={ this.state.teams }
            />
            <button type="submit">Submit</button>
          </form>
        ) }
      />
    );
  }
}
