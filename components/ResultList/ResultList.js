import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

export class KnapsackResultList extends Component {

  renderRows(courses) {
    return courses.map((course, i) =>
      <TableRow key={i}>
        <TableRowColumn>{course.name}</TableRowColumn>
        <TableRowColumn>{course.credits}</TableRowColumn>
        <TableRowColumn>{course.hours}</TableRowColumn>
        <TableRowColumn>{course.mandatory ? 'Yes' : 'No'}</TableRowColumn>
      </TableRow>
    )
  }

  renderTotal(courses, type) {
    let total = 0;
    courses.map((course) => total += course[type]);
    return total;
  }

	render() {
    const { courses } = this.props;
		return (
			<div className="content-child">
				<h2>Results</h2>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Course</TableHeaderColumn>
              <TableHeaderColumn>Credits</TableHeaderColumn>
              <TableHeaderColumn>Hours</TableHeaderColumn>
              <TableHeaderColumn>Mandatory</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.renderRows(courses)}
            <TableRow>
              <TableRowColumn>{courses.length} Courses</TableRowColumn>
              <TableRowColumn>{this.renderTotal(courses, 'credits')}</TableRowColumn>
              <TableRowColumn>{this.renderTotal(courses, 'hours')}</TableRowColumn>
              <TableRowColumn></TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
			</div>
		);
	}
}

KnapsackResultList.propTypes = {
  courses: React.PropTypes.array,
}
