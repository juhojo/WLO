import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

export default class Optimization extends Component {
	render() {
		return (
			<Card>
				<CardHeader
					title="Optimization: Most Credits per Hour"
					actAsExpander={true}
          expandable={false}
					showExpandableButton={false}
				/>
			</Card>
		);
	}
}
