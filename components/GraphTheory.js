import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Calendar from './reusable/Calendar.js';
var jsnx = require('jsnetworkx');

import courses from '../js/courses';

export default class GraphTheory extends Component {
  constructor(props) {
    super(props);
    this.G = new jsnx.Graph();
  }

  componentDidMount() {
    this.populateGraph();
  }

  populateGraph() {
    for (let i = 0; i < courses.length; i++) {
      this.G.addNode(i);
    }
    for (let i = 0; i < courses.length; i++) {
      const helper = courses[i].edges.slice(0);
      helper.splice(helper.indexOf(i), 1);
      for (let j = 0; j < helper.length; j++) {
        this.G.addEdgesFrom([[i, helper[j]], [helper[j], i]]);
      }
    }
  }

  findCliques() {
    const self = this;
    jsnx.genFindCliques(this.G).then(function(cliques) {
      console.log(cliques);
      jsnx.genNumberOfCliques(self.G, self.G.nodes(), cliques).then(function(result){console.log(result);});
    });
  }

  drawGraph() {
    jsnx.draw(this.G, {
      element: '#canvas',
      weighted: true,
      edgeStyle: {
        'stroke-width': 5
      }
    });
  }

  renderCourses() {
    return courses.map((course, i) => {
      console.log(course);
      return (
        <Card key={i}>
          <CardText expandable={false}>
            {course.name}
          </CardText>
        </Card>
      );
    });
  }

	render() {
		return (
      <div className="content">
        <div className="content-child">
          <h2>Setup</h2>
          <Card>
            <div id="gt-setup-card">
              <div id="gt-setup-tools">
                <button onClick={this.drawGraph.bind(this)}>Click to draw</button>
                <button onClick={this.findCliques.bind(this)}>Click me</button>
              </div>
              <div style={{ flexDirection: 'column', height: '100%' }}>
                <h3>Available courses</h3>
                <div className="card-list-container">
                  {this.renderCourses()}
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="content-child">
          <h2>Results</h2>
          <Card>
            <div onTouchMove={e=>{ e.stopPropagation(); e.preventDefault(); }}id="canvas"></div>
          </Card>
        </div>
        { this.props.visible &&
          <div className="content-child-wide">
            <h2>Calendar</h2>
            <Card style={{padding: '20px'}}>
              <Calendar />
            </Card>
          </div>
        }
			</div>
		);
	}
}

GraphTheory.propTypes = {
  visible: React.PropTypes.bool,
}
