import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Calendar from '../reusable/Calendar.js';

export default class ResultList extends Component {
	render() {
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
            <TableRow>
              <TableRowColumn>Some course</TableRowColumn>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>20</TableRowColumn>
              <TableRowColumn>Yes</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Some course</TableRowColumn>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>20</TableRowColumn>
              <TableRowColumn>Yes</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Some course</TableRowColumn>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>20</TableRowColumn>
              <TableRowColumn>Yes</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
				<Calendar />
			</div>
		);
	}
}
