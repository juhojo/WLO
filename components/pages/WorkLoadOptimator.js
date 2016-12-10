import React, { Component } from 'react';

import Banner from '../Banner.js';
import Footer from '../Footer.js';
import Knapsack from '../Knapsack.js';
import GraphTheory from '../GraphTheory.js';

export class WorkLoadOptimator extends Component {

	render() {
		return (
			<div className="container">
				<Banner />
        <h1 className="content-header">Knapsack Solution</h1>
        <Knapsack />
        <h1 className="content-header">Graph Theory Solution</h1>
        <GraphTheory />
        <Footer />
			</div>
		);
	}
}
