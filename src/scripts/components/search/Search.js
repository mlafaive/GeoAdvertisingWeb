import React from 'react';

import PropTypes from 'prop-types';

import './Search.scss';

import 'bootstrap';

class Search extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {};

		this.handleKeyPress = (event) => {
			if (event.key === 'Enter'){
				this.props.onSearch(event.target.value);
			}
		}

		this.handleSearch = () => {
			this.props.onSearch(this.textInput.value);
		}

	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.hasOwnProperty('initial')) {
			this.textInput.value = nextProps.initial;
		}
	}

	render()
	{	
		return(
			<div className="search">
				<div className="input-group">
				    <input 
				    	ref={(input) => { this.textInput = input; }}
				    	type="text" 
				    	className="search-bar form-control input-sm"
				    	onKeyPress={this.handleKeyPress} 
						placeholder={this.props.placeholder}
				    />
				    <span className="submit-button input-group-addon" onClick={this.handleSearch}>
				        <i>search</i>
				    </span>
				</div>
			</div>
		);
	}
}

Search.propTypes = {
	onSearch: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	initial: PropTypes.string
}

Search.defaultProps = {
	placeholder: "Search...",
}

export default Search;
