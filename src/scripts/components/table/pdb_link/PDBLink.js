import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Config from '../../../Config.js';

import './PDBLink.scss'


class PDBLink extends React.Component{


	constructor(props)
	{
		super(props);
		this.state = {};

		this.handle_mouse_enter = (e) => {
			this.props.onImgChange({
				display: true,
				src: Config.pdb_image(this.props.pdb),
				name: this.props.name,
				style: {
					top: e.clientY + 1,
					left: e.clientX + 1,
				}
			});
		}

		this.handle_mouse_move = (e) => {
			this.props.onImgChange({
				style: {
					top: e.clientY + 1,
					left: e.clientX + 1,
				}
			});
		}

		this.handle_mouse_leave = (e) => {
			this.props.onImgChange({
				display: false
			});
		}
	}	


	render()
	{

		return(
			<div className="pdb-link">
				<div 
					className="name-link"
					onMouseEnter={this.handle_mouse_enter}
					onMouseMove={this.handle_mouse_move}
					onMouseLeave={this.handle_mouse_leave}
				>
					<Link to={"/proteins/" + this.props.id}>{this.props.cell}</Link>
				</div>
			</div>
		);
	}
}

PDBLink.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	pdb: PropTypes.string.isRequired,
	cell: PropTypes.string.isRequired,
	onImgChange: PropTypes.func.isRequired,
};

PDBLink.defaultProps = {};


export default PDBLink;