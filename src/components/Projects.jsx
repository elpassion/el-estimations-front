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
      id: null,
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
    const { client, me } = this.props;
    client.post('/assignees/', {
      assignee: me.id,
      project: projectId,
      team: teamId,
    }).then(() => {
      this.getData();
    });
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
            { projects.map(project => (
              <li key={ project.id }>
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
