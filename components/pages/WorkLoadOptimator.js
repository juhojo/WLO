import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';

import Banner from '../Banner.js';
import Footer from '../Footer.js';
import Knapsack from '../Knapsack.js';
import GraphTheory from '../GraphTheory.js';

export class WorkLoadOptimator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      slideIndex: value,
    });
  };

	render() {
    const { slideIndex } = this.state;
		return (
			<div className="container">
				<Banner slideIndex={slideIndex} handleChange={this.handleChange}/>
        <SwipeableViews
          index={slideIndex}
          onChangeIndex={this.handleChange}>
          <div>
            <h1 className="content-header">Knapsack Solution</h1>
            <Knapsack />
          </div>
          <div>
            <h1 className="content-header">Graph Theory Solution</h1>
            <GraphTheory visible={slideIndex === 1} />
          </div>
        </SwipeableViews>
        <Footer />
			</div>
		);
	}
}
