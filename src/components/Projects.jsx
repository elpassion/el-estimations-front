import React, { Fragment } from 'react';
import { func, shape, number, arrayOf } from 'prop-types';

import ProjectPreview from './ProjectPreview';

export default class Projects extends React.Component {
  static propTypes = {
    client: func.isRequired,
    me: shape({
      teams: arrayOf(shape({ id: number.isRequired })),
    }),
  };

  static defaultProps = {
    me: {
      teams: [],
    },
  };

  state = {
    projects: [],
  };

  componentDidMount() {
    this.getData();
  }

  onAssignButtonClick = ({ projectId, teamId }) => {
    // eslint-disable-next-line
    console.log(`assign me to project ${projectId} as ${teamId}`);
  };

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
                <ProjectPreview
                  project={ project }
                  myTeams={ this.props.me.teams }
                  onAssignButtonClick={ this.onAssignButtonClick }
                />
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
        { this.renderList('Pending') }

        { this.renderList('Done') }
      </Fragment>
    );
  }
}
