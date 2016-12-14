import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ThumbsUpDown from 'material-ui/svg-icons/action/thumbs-up-down';
import _ from 'lodash';
import Calendar from './reusable/Calendar.js';
var jsnx = require('jsnetworkx');

import courses from '../js/courses';

export default class GraphTheory extends Component {
  constructor(props) {
    super(props);
    this.G = new jsnx.Graph();
    this.palette = getMuiTheme().palette;
    this.state = {
      result: [],
      calendarCourses: [],
    };
    this.cliqueWorker = new Worker("../js/cliqueWorker.js");
  }

  componentDidMount() {
    this.populateGraph(this.drawGraph);
    // const graph = [[0,1,0,0,1,0],[1,0,1,0,1,0],[0,1,0,1,0,0],[0,0,1,0,1,1],[1,1,0,1,0,0],[0,0,0,1,0,0]];
  }

  componentDidUpdate(oldProps, oldState) {
    if (oldState.result !== this.state.result) {
      const calendarCourses = [];
      const circles = d3.select("#canvas").select(".nodes").selectAll(".node").select("circle");
      courses.forEach((course, i) => {
        if (this.state.result.indexOf(i) >= 0) {
          d3.select(circles[0][i]).style("fill", this.palette.primary1Color);
          calendarCourses.push(course);
        } else {
          d3.select(circles[0][i]).style("fill", this.palette.accent1Color);
        }
      });
      this.setState({ calendarCourses: calendarCourses });
    }
  }

  populateGraph(callback) {
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
    callback(this);
  }

  findCliques() {
    const self = this;
    const graph = [];
    for (let i = 0; i<courses.length; i++) {
      graph[i] = [];
      for (let j = 0; j<courses.length; j++) {
        graph[i][j] = ~courses[i].edges.indexOf(j) ? 1 : 0;
      }
    }
    this.cliqueWorker.postMessage([graph]);
    this.cliqueWorker.onmessage=e=>{
      this.setState({ result: e.data });
    }
  }

  drawGraph(self) {
    jsnx.draw(self.G, {
      element: '#canvas',
      layoutAttr: {
         linkDistance: 160
      },
      nodeAttr: {
        r: 20
      },
      nodeStyle: {
          fill: self.palette.primary2Color,
          stroke: 'none'
      },
      withLabels: true,
      labelStyle: {
        fill: 'white'
      },
      edge_attr: {
      },
      edgeStyle: {
        'stroke-width': 2
      }
    });
  }

  renderCourses() {
    const { result } = this.state;
    return courses.map((course, i) => {
      let icon = <i><ThumbDown color={this.palette.accent1Color}/></i>;
      if (result.length === 0) icon = <i><ThumbsUpDown color={this.palette.primary2Color}/></i>;
      else if (result.indexOf(i) >= 0) icon = <i><ThumbUp color={this.palette.primary1Color}/></i>;
      const title = `${i}. ${course.name}`;
      // console.log(course);
      return (
        <Card key={i}>
          <CardHeader
            title={title}
            avatar={icon}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            Course code: {course.id}
            <br/>
            Period: {course.period}
            <br/>
            Credits: {course.credits}
          </CardText>
        </Card>
      );
    });
  }

	render() {
		return (
      <div className="content">
        <div className="content-child" id="setupCardParent">
          <h2>Setup</h2>
          <Card>
            <div id="gt-setup-card">
              The algorithm will choose the largest combination of courses that is possible.
              The graph contains all the courses listed below and the calendar will be generated
              with the most desirable combination of courses.
              <div style={{ margin: '10px 0 20px 0' }}>
                <RaisedButton
                  label="Solve"
                  primary={true}
                  onTouchTap={this.findCliques.bind(this)}/>
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
          <h2>Graph</h2>
          <Card>
            <div onTouchMove={e=>{ e.stopPropagation(); e.preventDefault(); }}id="canvas"></div>
          </Card>
        </div>
        { this.props.visible &&
          <div className="content-child-wide">
            <h2>Calendar</h2>
            <Card style={{padding: '20px'}}>
              <Calendar courses={this.state.calendarCourses}/>
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
