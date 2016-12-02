import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Calendar from '../reusable/Calendar.js';

export default class Courses extends Component {
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
          <Calendar />
        </CardText>
      </Card>
		);
	}
}
