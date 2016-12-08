import React, { Component } from 'react';
import { KnapsackTools } from './Tools/Tools.js';
import { KnapsackResultList } from './ResultList/ResultList.js';
import { knapsack, data } from '../js/knapsack.js';

export default class Knapsack extends Component {
  constructor() {
    super();
    this.state = {
      courses: data, // Initial courses
      knapsacked: knapsack(this.turnToSackable(data), 200),
      hours: 0.5,
    };
  }

  turnToSackable(courses) {
    const knapsack = [];
    courses.map(course => {
      knapsack.push({ w: course.hours, b: course.credits });
    });
    return knapsack;
  }

  updateCourses(course) {
    const courses = this.state.courses.slice(0);
    courses.push(course);
    this.setState({ courses });
  }

  updateState(key, value) {
    this.setState({[key]: value});
  }

	render() {
    const { courses, knapsacked, hours } = this.state;
    console.log(knapsacked);
    return (
      <div className="content">
        <KnapsackTools hours={hours} updateCourses={this.updateCourses.bind(this)} updateState={this.updateState.bind(this)}/>
        <KnapsackResultList courses={courses} />
      </div>
    );
  }
}
