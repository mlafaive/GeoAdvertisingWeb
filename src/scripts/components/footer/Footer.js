import React from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reducer from '../../reducers/reducers';
// import {
// 	addPolitician,
// 	removePolitician,
// 	populatePoliticians,
// 	deletePolitician,
// 	clearPoliticians
// } from '../../actions/politicians';

import './Footer.scss'

class Footer extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
	}


	render()
	{
		return(
			<div className="footer-box">
				<div className="maintext">
					Copyright &copy; 2018 <a href="mailto:almz@umich.edu">Andrei Lomize</a> &amp; <a href="mailto:irinap@umich.edu">Irina Pogozheva</a> <br/>
					University of Michigan, Ann Arbor, MI 48109 USA 
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
  return {
		// selectedPoliticians: state.selectedPoliticians,
		// nonSelectedPoliticians: state.nonSelectedPoliticians,
	};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
		// addPolitician,
		// removePolitician,
		// populatePoliticians,
		// deletePolitician,
		// clearPoliticians,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
