import React, { Component } from 'react';

export default class Footer extends Component {

	render() {
		return (
			<div className="footer">
        <div className="footer-content">
          <h2>Build with ReactJS</h2>
          <div>
            <h3>Libraries:</h3>
            <h5>material-ui: <a href="http://www.material-ui.com/">http://www.material-ui.com/</a></h5>
            <h5>jsnetworkx: <a href="http://jsnetworkx.org/">http://jsnetworkx.org/</a></h5>
            <h5>fullcalendar: <a href="http://fullcalendar.io/">http://fullcalendar.io/</a></h5>
          </div>
          <div>
            <h3>About project:</h3>
            <h5>GitHub: <a href="https://github.com/juhojo/WLO/">https://github.com/juhojo/WLO/</a></h5>
          </div>
        </div>
			</div>
		);
	}
}
