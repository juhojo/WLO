import React, { Component } from 'react';
import AvailableHours from './AvailableHours.js';
import { KnapsackAddCourse, KnapsackCourses } from './Courses.js';
import Optimization from './Optimization.js';

export class KnapsackTools extends Component {
	render() {
    const { courses, selectedCourses, hours, updateHours, addCourse, updateSelectedCourses, changeAlgorithm, selectedAlgorithm } = this.props;
		return (
			<div className="content-child">
				<h2>Setup</h2>
        <div>
          <KnapsackAddCourse addCourse={addCourse} />
          <AvailableHours hours={hours} updateHours={updateHours}/>
          <KnapsackCourses courses={courses} selectedCourses={selectedCourses} updateSelectedCourses={updateSelectedCourses} />
          <Optimization changeAlgorithm={changeAlgorithm} selectedAlgorithm={selectedAlgorithm}/>
        </div>
			</div>
		);
	}
}

KnapsackTools.propTypes = {
  corses: React.PropTypes.array,
  selectedCourses: React.PropTypes.array,
  hours: React.PropTypes.number,
  updateHours: React.PropTypes.func,
  addCourse: React.PropTypes.func,
  updateSelectedCourses: React.PropTypes.func,
  changeAlgorithm: React.PropTypes.func,
  selectedAlgorithm: React.PropTypes.object,
}
