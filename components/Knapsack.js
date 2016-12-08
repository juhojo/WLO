import React, { Component } from 'react';
import { KnapsackTools } from './Tools/Tools.js';
import { KnapsackResultList } from './ResultList/ResultList.js';
import { knapsack, data } from '../js/knapsack.js';
import manda from '../js/mandatory.js';

export default class Knapsack extends Component {
  constructor() {
    super();
    this.defaultData = knapsack(data, 200);
    this.state = {
      courses: data, // Holds all courses.
      selectedCourses: data, // Initially select the default courses.
      knapsacked: this.defaultData, // Holds all knapsacked items.
      mandaed: manda(data, 200),
      hours: 0.5,
    };
  }

  addCourse(course) {
    const courses = this.state.courses.slice(0);
    courses.push(course);
    this.setState({ courses });
  }

  updateSelectedCourses(rowIds) {
    const { courses, hours } = this.state;
    let selectedCourses = [];
    if (rowIds instanceof Array) {
      rowIds.forEach((id) => {
        selectedCourses.push(courses[id]);
      });
    } else if (rowIds === 'all'){
      selectedCourses = courses.slice(0);
    }
    this.setState({ selectedCourses, knapsacked: knapsack(selectedCourses, (hours * 400)) });
  }

  updateHours(value) {
    const { selectedCourses } = this.state;
    this.setState({ hours: value, knapsacked: knapsack(selectedCourses, (value * 400)) });
  }

	render() {
    const { courses, selectedCourses, knapsacked, hours } = this.state;
    return (
      <div className="content">
        <KnapsackTools
          courses={courses}
          selectedCourses={selectedCourses}
          hours={hours}
          addCourse={this.addCourse.bind(this)}
          updateSelectedCourses={this.updateSelectedCourses.bind(this)}
          updateHours={this.updateHours.bind(this)} />
        <KnapsackResultList result={knapsacked.maxValue} courses={knapsacked.set} />
      </div>
    );
  }
}
