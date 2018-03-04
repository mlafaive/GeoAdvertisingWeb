import React from 'react';

import { Link } from 'react-router-dom';

import Config from '../../Config.js';

import PropTypes from 'prop-types';

import ListItem from '../list_item/ListItem.js';

import './Info.scss';

class Info extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {};

		this.renderInfo = () => {
			var items = [];

			if (this.props.hasOwnProperty('types')) {
				items.push(
					<li key={0} className="info-item">
						<i className="info-name">Type:</i>&nbsp;
						<ListItem 
							ctype="types"
							id={this.props.types.id}
							name={this.props.types.name}
							subclasses={this.props.types.subclasses}
							base={this.props.base === "types"}
						/>
					</li>
				);
			}

			if (this.props.hasOwnProperty('classes')) {
				items.push(
					<li key={1} className="info-item">
						<i className="info-name">Class:</i>&nbsp;
						<ListItem 
							ctype="classes"
							id={this.props.classes.id}
							name={this.props.classes.name}
							subclasses={this.props.classes.subclasses}
							base={this.props.base === "classes"}
						/>
					</li>
				);
			}

			if (this.props.hasOwnProperty('superfamilies')) {
				items.push(
					<li key={2} className="info-item">
						<i className="info-name">Superfamily:</i>&nbsp;
						<ListItem 
							ctype="superfamilies"
							id={this.props.superfamilies.id}
							name={this.props.superfamilies.name}
							subclasses={this.props.superfamilies.subclasses}
							pfam={this.props.superfamilies.pfam}
							tcdb={this.props.superfamilies.tcdb}
							base={this.props.base === "superfamilies"}
						/>
					</li>
				);
			}

			if (this.props.hasOwnProperty('families')) {
				items.push(
					<li key={3} className="info-item">
						<i className="info-name">Family:</i>&nbsp;
						<ListItem 
							ctype="families"
							id={this.props.families.id}
							name={this.props.families.name}
							subclasses={this.props.families.subclasses}
							pfam={this.props.families.pfam}
							tcdb={this.props.families.tcdb}
							base={this.props.base === "families"}
							expandable={this.props.base === "families"}
							expand_url={Config.baseUrl + Config.classification['families'].api.route + '/' + this.props.families.id + Config.classification['proteins'].api.route}
							onResize={this.props.onResize}
						/>
					</li>
				);
			}

			if (this.props.hasOwnProperty('species')) {
				items.push(
					<li key={4} className="info-item">
						<i className="info-name">Species:</i>&nbsp;
						<ListItem 
							ctype="species"
							id={this.props.species.id}
							name={this.props.species.name}
							subclasses={this.props.species.subclasses}
							base={this.props.base === "species"}
							expandable={this.props.base === "species"}
							expand_url={Config.baseUrl + Config.classification['species'].api.route + '/' + this.props.species.id + Config.classification['proteins'].api.route}
							onResize={this.props.onResize}
						/>
					</li>
				);
			}

			if (this.props.hasOwnProperty('localizations')) {
				items.push(
					<li key={5} className="info-item">
						<i className="info-name">Localization:</i>&nbsp;
						<ListItem 
							ctype="localizations"
							id={this.props.localizations.id}
							name={this.props.localizations.name}
							subclasses={this.props.localizations.subclasses}
							base={this.props.base === "localizations"}
							expandable={this.props.base === "localizations"}
							expand_url={Config.baseUrl + Config.classification['localizations'].api.route + '/' + this.props.localizations.id + Config.classification['proteins'].api.route}
							onResize={this.props.onResize}
						/>
					</li>
				);
			}

			return items;
		}

	}


	render()
	{
		return(
			<div className="info">
				<ul className="info-data">
					{ this.renderInfo() }
				</ul>
			</div>
		);
	}
}

Info.propTypes = {
	types: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		subclasses: PropTypes.number,
	}),
	classes: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		subclasses: PropTypes.number,
	}),
	superfamilies: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		subclasses: PropTypes.number,
		pfam: PropTypes.string,
		tcdb: PropTypes.string,
	}),
	families: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		subclasses: PropTypes.number,
		pfam: PropTypes.string,
		tcdb: PropTypes.string,
	}),
	species: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		subclasses: PropTypes.number,
	}),
	localizations: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		subclasses: PropTypes.number,
	}),
	base: PropTypes.string,
	onResize: PropTypes.func
};

Info.defaultProps = {
	base: "",
	onResize: () => {}
}



export default Info;
