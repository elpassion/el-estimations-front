import React, { Fragment } from 'react';
import { func } from 'prop-types';

import ProjectPreview from './ProjectPreview';

export default class Projects extends React.Component {
  static propTypes = {
    client: func.isRequired,
  };

  state = {
    projects: [],
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const res = await this.props.client.get('/projects/');
    this.setState({ projects: res.data });
  }

  renderList = (status) => {
    const projects = this.state.projects.filter(project => project.status === status);
    return (
      <section className="segment">
        <h2>{ `${status} projects` }</h2>

        { projects.length < 1 ? (<p>no projects</p>) : (
          <ul>
            { projects.map((project, index) => (
              <li key={ index }>
                <ProjectPreview project={ project } />
              </li>
            )) }
          </ul>
        ) }
      </section>
    );
  };

  render() {
    return (
      <Fragment>
        {this.renderList('Pending')}

        {this.renderList('Done')}
      </Fragment>
    );
  }
}
