import React, { Component } from 'react';
import AvailableHours from './AvailableHours.js';
import { KnapsackAddCourse, KnapsackCourses } from './Courses.js';
import Optimization from './Optimization.js';

export class KnapsackTools extends Component {
	render() {
    const { hours, updateState, updateCourses } = this.props;
		return (
			<div className="content-child">
				<h2>Setup</h2>
        <div>
          <KnapsackAddCourse updateCourses={updateCourses} />
          <AvailableHours hours={hours} updateState={updateState}/>
          <KnapsackCourses />
          <Optimization />
        </div>
			</div>
		);
	}
}

KnapsackTools.propTypes = {
  hours: React.PropTypes.number,
  updateState: React.PropTypes.func,
  updateCourses: React.PropTypes.func,
}
