import React, { Component } from 'react';

export default class Footer extends Component {

	render() {
		return (
			<div className="footer">
        <div className="footer-content">
          <h2>Build with ReactJS</h2>
          <div>
            <h3>Libraries:</h3>
            <h4>jsnetworkx: http://jsnetworkx.org/</h4>
            <h4>material-ui: http://www.material-ui.com/</h4>
          </div>
          <div>
            <h3>About project:</h3>
            <h4>GitHub: https://github.com/juhojo/WLO</h4>
          </div>
        </div>
			</div>
		);
	}
}
