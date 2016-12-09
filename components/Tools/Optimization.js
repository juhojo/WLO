import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Optimization extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, selVal) {
    this.props.changeAlgorithm(selVal);
  };

	render() {
    const { selectedAlgorithm } = this.props;
		return (
			<Card>
				<CardHeader
					title={`Optimization: ${selectedAlgorithm.label}`}
          actAsExpander={true}
          showExpandableButton={true}
				/>
        <CardText expandable={true}>
          {selectedAlgorithm.info}
          <br/>
          <SelectField
            floatingLabelText="Algorithm"
            value={selectedAlgorithm.indx}
            onChange={this.handleChange}>
            <MenuItem value={0} primaryText="Knapsack" />
            <MenuItem value={1} primaryText="Mandatory" />
            <MenuItem value={2} primaryText="V/W Ratio" />
          </SelectField>
        </CardText>
			</Card>
		);
	}
}

Optimization.propTypes = {
  changeAlgorithm: React.PropTypes.func,
  selectedAlgorithm: React.PropTypes.object,
}
