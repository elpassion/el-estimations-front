import React from 'react';
import { shape, string, arrayOf, number } from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

import namesString from '../helpers/namesString';

function ProjectPreview({ project }) {
  return (
    <article className={ classNames(['ProjectPreview', { 'ProjectPreview--inactive': project.status === 'Done' }]) }>
      <h1 className="ProjectPreview__title">{ project.name }</h1>

      <h2 className="ProjectPreview__subtitle">{ project.client_name }</h2>

      <p className="ProjectPreview__detail">Teams: { namesString(project.teams) }</p>

      <p className="ProjectPreview__detail">Description: { project.description }</p>

      <p className="ProjectPreview__detail">Created: { moment(project.when).format('Do MMMM YYYY, kk:mm') }</p>

      {/* eslint-disable-next-line */}
      <a className="ProjectPreview__link" href="#">see details &rsaquo;</a>
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
  }).isRequired,
};

export default ProjectPreview;
