import React, { Component } from 'react';
import Tools from '../Tools/Tools.js';
import ResultList from '../ResultList/ResultList.js';

import Banner from '../Banner.js';

export class WorkLoadOptimator extends Component {

	render() {

		return (
			<div className="container">
				<Banner />
				<div className="content">
					<Tools />
					<ResultList />
				</div>
			</div>
		);
	}
}
