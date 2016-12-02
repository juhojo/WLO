import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

export default class Optimization extends Component {
	render() {
		return (
			<Card>
				<CardHeader
					title="Optimization: Most Credits per Hour"
					actAsExpander={true}
					showExpandableButton={true}
				/>
				<CardText expandable={true}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
					Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
					Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
				</CardText>
			</Card>
		);
	}
}
