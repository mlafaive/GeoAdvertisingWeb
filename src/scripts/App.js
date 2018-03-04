import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reducer from './reducers/reducers';
import { updateCurrentUrl } from './actions/url.js';

import Header from './components/header/Header.js';
import Sidebar from './components/sidebar/Sidebar.js';
import MainContent from './components/main-content/MainContent.js';
import Footer from './components/footer/Footer.js';
import Search from './components/search/Search.js';

import * as qs from 'query-string';

import './App.scss';

class App extends Component
{
	constructor(props) {
		super(props);
		this.state = props.match;
		this.state.query = qs.parse(props.location.search);
		this.state.history = props.history;

		this.props.updateCurrentUrl(this.state);

		this.handle_search = (value) => {
			this.props.history.push('/proteins?search=' + value);
		}
	}

	componentWillReceiveProps(nextProps) {
		var newstate = nextProps.match;
		newstate.query = qs.parse(nextProps.location.search);
		newstate.history = this.props.history;
		this.props.updateCurrentUrl(newstate);
	}

	render()
	{
		// #layout of the main app
		return (
			<div className="app">
				<div className="search-opm">
					<Search
						placeholder="Search proteins by PDB ID or name"
						onSearch={this.handle_search}
						initial=""
					/>
				</div>
				<Header/>
				<div className="flex-container">
					<Sidebar/>
					<MainContent children={this.props.children}/>
				</div>
				<Footer/>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators ({ updateCurrentUrl }, dispatch);
}

export default connect(undefined, mapDispatchToProps)(App);

