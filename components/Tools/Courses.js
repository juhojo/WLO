import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import moment from 'moment';
import _ from 'lodash';

export class KnapsackAddCourse extends Component {
  constructor() {
    super();
    this.defaultCourse = {
      name: '',
      credits: '',
      hours: '',
      mandatory: false,
    };
    this.state = {
      course: Object.assign({}, this.defaultCourse),
      disabled: true,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event, value) {
    const { disabled } = this.state;
    const key = event.target.name;
    const course = this.state.course;
    if (key === "credits" || key === "hours") { value = parseInt(value); }
    course[key] = value;

    let bool = Object.keys(course).some((key) => {
      if (typeof course[key] === 'string' && course[key].length < 1) {
        return true;
      }
      return false;
    });
    this.setState({ disabled: bool, course });
  }

  addCourse(e) {
    const { course } = this.state;
    this.props.addCourse(course);
    this.setState({ course: this.defaultCourse, disabled: true });
  }

  renderTextField(floatingLabelText, fullWidth, value, type, name, onChange) {
    return <TextField
      floatingLabelText={floatingLabelText}
      fullWidth={fullWidth}
      value={value}
      type={type}
      name={name}
      onChange={onChange}
    />;
  }

	render() {
    const { course: { name, credits, hours, mandatory }, disabled } = this.state;
		return (
      <Card>
        <CardHeader
          title="Create a new Course"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          Please fill all the fields listed below. You only need to know the course name,
          how many credits is the course worth and how many hours it takes to finish it.
          {this.renderTextField("Course name", true, name, "string", "name", this.onChange)}
          <br/>
          {this.renderTextField("Credits", true, credits, "number", "credits", this.onChange)}
          <br/>
          {this.renderTextField("Hours", true, hours, "number", "hours", this.onChange)}
          <br/>
          <div className="input-container">
            <div className="input-content">
              <Checkbox
                label="Mandatory"
                name="mandatory"
                onCheck={this.onChange}
                />
            </div>
          </div>
          <RaisedButton
            label="Add Course"
            primary={true}
            disabled={disabled}
            onTouchTap={this.addCourse.bind(this)}/>
        </CardText>
      </Card>
		);
	}
}

KnapsackAddCourse.propTypes = {
  addCourse: React.PropTypes.func,
};











export class KnapsackCourses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: props.courses,
      previousKey: 'name',
    };
  }

  sortBy(key, event) {
    const { courses, previousKey } = this.state;
    const helper = key === previousKey ? _.sortBy(courses, key) : _.reverse(_.sortBy(courses, key));
    this.setState({ courses: helper, previousKey: key });
  }

  renderHeaderColumns(headers) {
    const { previousKey } = this.state;
    return headers.map((header, i) => {
      const active = previousKey === header.k;
      const icon = <i style={active ? {color:'black', marginLeft: '5px'} : {marginLeft: '5px'}}>{active ? '▼' : '▲'}</i>;
      return <TableHeaderColumn onTouchTap={this.sortBy.bind(this, header.k)} key={i}>{header.v}{icon}</TableHeaderColumn>;
    });
  }

  isSelected(course) {
    const { selectedCourses } = this.props;
    return selectedCourses.indexOf(course) >= 0;
  }

  renderRows() {
    const { courses } = this.state;
    return courses.map((course, i) =>
      <TableRow selected={this.isSelected(course)} key={i}>
        <TableRowColumn>{course.name}</TableRowColumn>
        <TableRowColumn>{course.credits}</TableRowColumn>
        <TableRowColumn>{course.hours}</TableRowColumn>
        <TableRowColumn>{course.mandatory ? 'Yes' : 'No'}</TableRowColumn>
      </TableRow>
    )
  }

  handleRowSelection(rowIds) {
    this.props.updateSelectedCourses(rowIds);
  }

	render() {
    const { courses, selectedCourses } = this.props;
    let totalCredits = 0;
    selectedCourses.forEach((course) => { totalCredits += course.credits });
		return (
      <Card>
        <CardHeader
          title={`Select Courses (${selectedCourses.length}/${courses.length}, total credits: ${totalCredits})`}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          Select the courses you wish to get optimized.
          <Table
            allRowsSelected={courses.length === selectedCourses.length}
            onRowSelection={this.handleRowSelection.bind(this)}
            multiSelectable={true}>
            <TableHeader>
              <TableRow>
                {this.renderHeaderColumns([{k: 'name', v: 'Course'}, {k: 'credits', v: 'Credits'}, {k: 'hours', v: 'Hours'}, {k: 'mandatory', v: 'Mandatory'}])}
              </TableRow>
            </TableHeader>
            <TableBody
              deselectOnClickaway={false}>
              {this.renderRows()}
            </TableBody>
          </Table>
        </CardText>
      </Card>
		);
	}
}

KnapsackCourses.propTypes = {
  courses: React.PropTypes.array,
  selectedCourses: React.PropTypes.array,
  updateSelectedCourses: React.PropTypes.func,
};











export class GraphTheoryCourses extends Component {

  renderRadioButtons(times) {
    const width = 100 / times;
    return Array(times).fill(0).map((v, i) =>
      <RadioButton
        key={i+1}
        value="light"
        label={i+1}
        style={{ display: 'inline-block', width: `${width}%`}}
      />
    );
  }
	render() {
		return (
      <Card>
        <CardHeader
          title="Courses"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          Please type all the possible courses below. You only need to know the course name,
          how many credits is the course worth and how many hours it takes to finish it.
          <TextField
            floatingLabelText="Course name"
            fullWidth={true}
          /><br/>
          <TextField
            floatingLabelText="Credits"
            fullWidth={true}
          /><br/>
          <div className="input-container">
            <div className="input-content">
              <Checkbox
                label="Mandatory" />
            </div>
          </div>
          <label className="input-label">Period</label>
          <div className="input-container">
            <div className="input-content">
              <RadioButtonGroup name="Period">
                {this.renderRadioButtons(4)}
              </RadioButtonGroup>
            </div>
          </div>
        </CardText>
      </Card>
		);
	}
}
