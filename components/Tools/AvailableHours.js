import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Slider from 'material-ui/Slider';

export default class AvailableHours extends Component {
	render() {
		return (
      <Card>
        <CardHeader
          title="Available hours"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          Choose the amount of hours you have available for courses.
          <Slider step={0.10} value={0.5} />
          <p>215 hours</p>
        </CardText>
      </Card>
		);
	}
}
