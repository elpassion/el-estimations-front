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
          onSubmit={ (values) => {
            const body = values;
            body.teams = body.teams.map(team => team.value);
            this.props.client.post('/projects/', body).then(() => { window.location = '/'; });
          } }
          render={ formikProps => (
            <form onSubmit={ formikProps.handleSubmit }>
              <WrappedField name="client_name" type="text" props={ formikProps } label="Client name" />
              <WrappedField name="name" type="text" props={ formikProps } />
              <WrappedField name="description" type="textarea" props={ formikProps } />

              <SelectField
                label="Teams:"
                name="teams"
                multi
                { ...fieldState('teams', formikProps) }
                onChange={ formikProps.setFieldValue }
                onBlur={ formikProps.setFieldTouched }
                options={ this.state.teams }
              />

              <button type="submit" className="button button--wide button--spaced">Submit</button>
            </form>
          ) }
        />
      </section>
    );
  }
}
