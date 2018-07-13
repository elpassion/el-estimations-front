import React from 'react';
import { shape, string, arrayOf, number, func } from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

function ProjectPreview({ project, myTeams, onAssignButtonClick }) {
  const fulfilledTeamIds = project.assignees.map(assignee => assignee.team.id);

  const myUsefulTeams = myTeams.filter(team => project.teams.find(projectTeam => projectTeam.id === team.id && !fulfilledTeamIds.includes(projectTeam.id)));

  return (
    <article className={ classNames(['ProjectPreview', { 'ProjectPreview--inactive': project.status === 'Done' }]) }>
      <header className="ProjectPreview__header">
        <h1 className="ProjectPreview__title">{ project.name }</h1>

        <h2 className="ProjectPreview__subtitle">
          { project.teams.map((team, index) => (
            <span
              key={ index }
              className={ classNames(['ProjectPreview__team', { 'ProjectPreview__team--fulfilled': fulfilledTeamIds.includes(team.id) }]) }
            >
              { team.name }
            </span>
          )) }
        </h2>
      </header>

      <p className="ProjectPreview__detail">
        <strong>Client: </strong>
        { project.client_name }
      </p>

      <p className="ProjectPreview__detail">
        <strong>Description: </strong>
        { project.description }
      </p>

      <p className="ProjectPreview__detail">
        <strong>Created: </strong>
        { moment(project.when).format('Do MMMM YYYY, kk:mm') }
      </p>

      { project.assignees.length > 0 && (
        <div className="ProjectPreview__detail">
          <strong>Assignees: </strong>
          <ul>
            { project.assignees.map((item, index) => (
              <li key={ index }>
                { item.assignee.first_name } { item.assignee.last_name } as { item.team.name }
              </li>
            )) }
          </ul>
        </div>
      ) }

      { ( project.status !== 'Done' && myUsefulTeams.length > 0 ) && (
        <div className="ProjectPreview__actions">
          <strong>Join as: </strong>
          { myUsefulTeams.map((team, index) => (
            <button
              key={ index }
              className="button ProjectPreview__action js_killerFeature"
              type="button"
              onClick={ () => onAssignButtonClick({ projectId: project.id, teamId: team.id }) }
            >
              { team.name }
            </button>
          )) }
        </div>
      ) }
    </article>
  );
}

ProjectPreview.propTypes = {
  project: shape({
    name: string.isRequired,
    client_name: string.isRequired,
    description: string.isRequired,
    status: string.isRequired,
    when: string.isRequired,
    teams: arrayOf(shape({
      id: number.isRequired,
      name: string.isRequired,
    })),
    assignees: arrayOf(shape({})).isRequired,
  }).isRequired,
  myTeams: arrayOf(shape({
    id: number.isRequired,
    name: string.isRequired,
  })),
  onAssignButtonClick: func,
};

ProjectPreview.defaultProps = {
  myTeams: [],
  onAssignButtonClick: () => {
  },
};

export default ProjectPreview;
