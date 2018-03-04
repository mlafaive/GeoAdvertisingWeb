import React from 'react';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Config from '../../../Config.js';

import ImgWrapper from '../../img_wrapper/ImgWrapper.js';

import './PDB.scss';

class PDB extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
	}

	render()
	{
		return(
			<div className="pdb">
				<a href={Config.pdb_image(this.props.pdbid)} target="_blank">
					<ImgWrapper 
						className="img-style" 
						src={Config.pdb_image(this.props.pdbid)} 
					/>
				</a>
				<hr className="divider"/>
				<div className="protein-link">
					<a href={Config.pdb_file(this.props.pdbid)} download>Download File: {this.props.pdbid}.pdb</a>
				</div>
			</div>
		);
	}
}

PDB.propTypes = {
	pdbid: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
};

export default PDB;
