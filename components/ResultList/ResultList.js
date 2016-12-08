import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import { tableRowStyle } from '../../js/styles.js';

export class KnapsackResultList extends Component {

  renderHeaderColumns(headers) {
    return headers.map((header, i) =>
      <TableHeaderColumn key={i} style={tableRowStyle}>{header}</TableHeaderColumn>
    );
  }

  renderRows(courses) {
    return courses.map((course, i) =>
      <TableRow key={i}>
        <TableRowColumn style={tableRowStyle}>{course.name}</TableRowColumn>
        <TableRowColumn style={tableRowStyle}>{course.credits}</TableRowColumn>
        <TableRowColumn style={tableRowStyle}>{course.hours}</TableRowColumn>
        <TableRowColumn style={tableRowStyle}>{course.mandatory ? 'Yes' : 'No'}</TableRowColumn>
      </TableRow>
    )
  }

  renderTotal(courses, type) {
    let total = 0;
    courses.map((course) => total += course[type]);
    return total;
  }

	render() {
    const { result, courses } = this.props;
		return (
			<div className="content-child">
				<h2>Results</h2>
        <h3>Max amount of credits: {result}</h3>
        <Table
          selectable={false}>
          <TableHeader
            adjustForCheckbox={false}
            enableSelectAll={false}
            displaySelectAll={false}>
            <TableRow>
              {this.renderHeaderColumns(["Course", "Credits", "Hours", "Mandatory"])}
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}>
            {this.renderRows(courses)}
            <TableRow>
              <TableRowColumn style={tableRowStyle}>{courses.length} Courses</TableRowColumn>
              <TableRowColumn style={tableRowStyle}>{this.renderTotal(courses, 'credits')}</TableRowColumn>
              <TableRowColumn style={tableRowStyle}>{this.renderTotal(courses, 'hours')}</TableRowColumn>
              <TableRowColumn style={tableRowStyle}></TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
			</div>
		);
	}
}

KnapsackResultList.propTypes = {
  result: React.PropTypes.number,
  courses: React.PropTypes.array,
}
