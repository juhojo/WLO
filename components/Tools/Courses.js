import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
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
    course[key] = value;

    let bool = Object.keys(course).some((key) => {
      if (typeof course[key] === 'string' && course[key].length < 1) {
        return true;
      }
      return false;
    });
    this.setState({ disabled: bool, course });
  }

  addCourse() {
    const { course } = this.state;
    this.props.updateCourses(course);
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
          title="New Course"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          Please fill all required field listed below. You only need to know the course name,
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
  updateCourses: React.PropTypes.func,
};

export class KnapsackCourses extends Component {

	render() {
		return (
      <Card>
        <CardHeader
          title="Select Courses"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          Select the pool of courses for our algorithm.
          <div>Some table</div>
        </CardText>
      </Card>
		);
	}
}


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
