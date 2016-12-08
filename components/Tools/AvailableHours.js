import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Slider from 'material-ui/Slider';

export default class AvailableHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  };

  sliderChange(e, value) {
    const { updateHours } = this.props;
    updateHours(value);
  }

	render() {
    const { hours } = this.props;
    const { expanded } = this.state;
    const headerText = expanded ? "Available hours" : `Available hours (${hours * 400} hours)`;
		return (
      <Card expanded={expanded} onExpandChange={this.handleExpandChange.bind(this)}>
        <CardHeader
          title={headerText}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          Choose the amount of hours you have available for courses.
          <Slider name="hours" onChange={this.sliderChange.bind(this)} step={0.10} value={hours} />
          <p>{hours * 400} hours</p>
        </CardText>
      </Card>
		);
	}
}

AvailableHours.propTypes = {
  hours: React.PropTypes.number,
  updateHours: React.PropTypes.func,
}
