import React, { Component } from 'react';
import Tools from '../Tools/Tools.js';
import ResultList from '../ResultList/ResultList.js';
import courses from '../../js/courses';
// import { todo, courses } from '../../temp.js';
var jsnx = require('jsnetworkx');

import Banner from '../Banner.js';

export class WorkLoadOptimator extends Component {
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
    jsnx.genFindCliques(this.G).then(function(cliques) {
      console.log(cliques);
      for (let i = 0; i < cliques.length; i++) {
        console.log(cliques[i]);
      }
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

	render() {
		// console.log(courses);
		return (
			<div className="container">
				<Banner />
				<div className="content">
					<Tools />
					<ResultList />
				</div>
        <div id="canvas"></div>
        <button onClick={this.drawGraph.bind(this)}>Click to draw</button>
        <button onClick={this.findCliques.bind(this)}>Click me</button>
			</div>
		);
	}
}
