import React, { Component } from 'react';
import { KnapsackTools } from './Tools/Tools.js';
import { KnapsackResultList } from './ResultList/ResultList.js';
import { knapsack, data } from '../js/knapsack.js';
import manda from '../js/mandatory.js';

export default class Knapsack extends Component {
  constructor() {
    super();
    this.algorithmInfo = [
      { indx: 0, label: 'Most Credits per Hour', info: "Given items of different values and volumes, find the most valuable set of items that fit in a knapsack of fixed volume.", data: knapsack(data, 200) },
      { indx: 1, label: 'Priorities Mandatory Courses', info: "Priorities mandatory items as most valuable and pick the ones that have the highest value, then fills the knapsack with regular items of best value to weight ratio.", data: manda(data, 200) },
    ];
    this.state = {
      courses: data, // Holds all courses.
      selectedCourses: data, // Initially select the default courses.
      dataSets: [
        knapsack(data, 200), // Holds knapsacked items.
        manda(data, 200), // Mandatory prioritiesed items.
      ],
      pickAlgorithm: this.algorithmInfo[0], // Initially use knapsack as default.
      hours: 0.5,
    };
  }

  componentDidUpdate(oldProps, oldStates) {
    const { selectedCourses, hours } = this.state;
    if (oldStates.selectedCourses !== selectedCourses || oldStates.hours !== hours) {
      this.updateSelectedAlg();
    }
  }

  addCourse(course) {
    const courses = this.state.courses.slice(0);
    courses.push(course);
    this.setState({ courses });
  }

  updateSelectedAlg() {
    const pickAlgorithm = Object.assign({}, this.state.pickAlgorithm);
    pickAlgorithm.data = this.state.dataSets[pickAlgorithm.indx];
    this.setState({ pickAlgorithm });
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
    this.setState({
      selectedCourses,
      dataSets: [
        knapsack(selectedCourses, (hours * 400)),
        manda(selectedCourses, (hours * 400)),
      ],
    });
  }

  updateHours(value) {
    const { selectedCourses } = this.state;
    this.setState({
      hours: value,
      dataSets: [
        knapsack(selectedCourses, (value * 400)),
        manda(selectedCourses, (value * 400)),
      ],
    });
  }

  changeAlgorithm(newAlgKey) {
    this.setState({
      pickAlgorithm: {
        indx: newAlgKey,
        label: this.algorithmInfo[newAlgKey].label,
        info: this.algorithmInfo[newAlgKey].info,
        data: this.state.dataSets[newAlgKey],
      },
    });
  }

	render() {
    const { courses, selectedCourses, pickAlgorithm, hours } = this.state;
    return (
      <div className="content">
        <KnapsackTools
          courses={courses}
          selectedCourses={selectedCourses}
          hours={hours}
          addCourse={this.addCourse.bind(this)}
          updateSelectedCourses={this.updateSelectedCourses.bind(this)}
          updateHours={this.updateHours.bind(this)}
          changeAlgorithm={this.changeAlgorithm.bind(this)}
          selectedAlgorithm={pickAlgorithm}/>
        <KnapsackResultList result={pickAlgorithm.data.maxValue} courses={pickAlgorithm.data.set} />
      </div>
    );
  }
}
