import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import AvailableHours from './AvailableHours.js';
import Courses from './Courses.js';
import Optimization from './Optimization.js';

export default class Tools extends Component {
	render() {
		return (
			<div className="content-child">
				<h2>Setup</h2>
				<AvailableHours />
				<Courses />
        <Optimization />
			</div>
		);
	}
}
