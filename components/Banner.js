import React, { Component } from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class Banner extends Component {
  constructor() {
    super();
    this.palette = getMuiTheme().palette;
  }
	render() {
    const { handleChange, slideIndex } = this.props;
		return (
			<div className="banner">
        <div className="banner-content">
          <h1>WorkLoadOptimator</h1>
          <h2>Juho Jokela & Ilpo Oksanen</h2>
          <h3>Optimize your courses!</h3>
        </div>
        <Tabs
          inkBarStyle={{ backgroundColor: 'aquamarine', height: '3px' }}
          className="navigation"
          onChange={handleChange}
          value={slideIndex}>
          <Tab label="Knapsack" value={0} />
          <Tab label="Graph Theory" value={1} />
        </Tabs>
			</div>
		);
	}
}

Banner.propTypes = {
  handleChange: React.PropTypes.func,
  slideIndex: React.PropTypes.number,
};
