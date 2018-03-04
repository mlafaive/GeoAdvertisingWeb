import React from 'react';

import Config from '../../Config.js';

import PropTypes from 'prop-types';

import './ImgWrapper.scss';

class ImgWrapper extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			loaded: false,
			found: true,
		};


		this.handle_load = () => {
			this.setState({
				loaded: true
			});
		}

		this.handle_error = (e) => {
			e.target.src = this.props.fallback === "" ? Config.no_image : this.props.fallback;
		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.src !== nextProps.src) {
			this.setState({
				loaded: false,
				found: true,
			});
		}
	}

	render()
	{	
		return(
			<div className="image-wrapper">
				<img 
					className={this.state.loaded ? this.props.className : "hidden"}
					src={this.props.src}
					onLoad={this.handle_load}
					onError={this.handle_error}
				/>
				<img
					className={this.state.loaded ? "hidden" : this.props.className}
					src={Config.loading_image}
				/>
			</div>
		);
	}
}

ImgWrapper.propTypes = {
	src: PropTypes.string.isRequired,
	className: PropTypes.string,
	fallback: PropTypes.string
};

ImgWrapper.defaultProps = {
	className: "",
	fallback: ""
};

export default ImgWrapper;
