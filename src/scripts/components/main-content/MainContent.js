import React from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reducer from '../../reducers/reducers';
import Table from '../table/Table.js';

import './MainContent.scss'

class MainContent extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
	}


	render()
	{
		return(
			<div className="main-content">
				{this.props.children}
			</div>
		);
	}
}


function mapStateToProps(state) {
  return {
	};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
