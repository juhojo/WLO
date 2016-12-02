import React, { Component } from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default class Banner extends Component {

	render() {

		return (
			<div className="banner">
        <div className="banner-content">
          <h1>WorkLoadOptimator</h1>
          <h2>Juho Jokela & Ilpo Oksanen</h2>
          <h3>Optimize your courses!</h3>
        </div>
				<div className="button-positioner">
					<FloatingActionButton>
						<ContentAdd />
					</FloatingActionButton>
				</div>
			</div>
		);
	}
}
