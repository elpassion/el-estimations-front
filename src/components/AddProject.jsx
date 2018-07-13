import React from 'react';
import { Formik } from 'formik';
import { func } from 'prop-types';
import * as Yup from 'yup';
import SelectField from './SelectField';
import WrappedField from './WrappedField';
import fieldState from '../helpers/fieldState';

const schema = Yup.object().shape({
  client_name: Yup.string().required(),
  name: Yup.string().required(),
  description: Yup.string().required(),
  teams: Yup.array().required(),
});

export default class AddProject extends React.Component {
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
    const teams = res.data.map(team => ({ label: team.name, value: `${team.id}` }));
    this.setState({ teams });
  }

  render() {
    return (
      <section className="segment">
        <h1>Add new project</h1>

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
              <WrappedField name="client_name" type="text" props={ formikProps } label="Client name" />
              <WrappedField name="name" type="text" props={ formikProps } />
              <WrappedField name="description" type="textarea" props={ formikProps } />

              <SelectField
                name="teams"
                multi
                { ...fieldState('teams', formikProps) }
                onChange={ formikProps.setFieldValue }
                onBlur={ formikProps.setFieldTouched }
                options={ this.state.teams }
              />
              <button type="submit">Submit</button>
            </form>
          ) }
        />
      </section>
    );
  }
}
