import React from 'react';

import Config from '../../Config.js';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import appendQuery from 'append-query';

import List from '../list/List.js';
import ProteinList from '../list/protein/ProteinList.js';

import axios from 'axios';

import './ListItem.scss';

class ListItem extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			expanded: false,
			loading: false,
		};

		this.expand = () => {
			if (!this.state.expanded) {
				let params = {
					pageSize: 20,
					sort: 'name'
				};
				let new_url = appendQuery(this.props.expand_url, params);
				axios.get(new_url)
				.then((response) => {
						this.setState({
							listData: response.data,
							loading: false
						});
					}
				);
			}
			this.setState({
				expanded: !this.state.expanded,
				loading: !this.state.expanded
			});

		};

		this.renderItem = () => {
			var parts = [];
			var type_config = Config.classification[this.props.ctype];
			// name link
			if (this.props.base){
				parts.push(
					<strong key={0}>
						{this.props.name}
					</strong>
				);
			}
			else {
				parts.push(
					<Link key={0} to={'/' + this.props.ctype + '/' + this.props.id}>
						{this.props.name}
					</Link>
				);
			}

			if (this.props.base) {
				if (this.props.expandable && !this.state.loading) {
					parts.push(
						<strong key={1}>
							&nbsp;({this.props.subclasses}&nbsp;{type_config.child}&nbsp;
							<span key={1} className="expand-item" onClick={this.expand}>
								{this.state.expanded ? "hide" : "show"}
							</span>
							&nbsp;)
						</strong>
					);
				}
				else if (this.props.expandable && this.state.loading){
					parts.push(
						<strong key={1}>
							&nbsp;({this.props.subclasses}&nbsp;{type_config.child}&nbsp;
							<span className="small-loader">
								<img src={Config.loading_image_small}/>
							</span>
							)
						</strong>
					);
				}
				else {
					parts.push(
						<strong key={1}>
							&nbsp;({this.props.subclasses}&nbsp;{type_config.child})
						</strong>
					);
				}
			}
			else {
				if (this.props.expandable && !this.state.loading) {
					parts.push(
						<span key={1}>
							&nbsp;({this.props.subclasses}&nbsp;{type_config.child}&nbsp;
							<span className="expand-item" onClick={this.expand}>
								{this.state.expanded ? "hide" : "show"}
							</span>
							&nbsp;)
						</span>
					);
				}
				else if (this.props.expandable && this.state.loading){
					parts.push(
						<span key={1}>
							&nbsp;({this.props.subclasses}&nbsp;{type_config.child}&nbsp;
							<span className="small-loader">
								<img src={Config.loading_image_small}/>
							</span>
							)
						</span>
					);
				}
				else {
					parts.push(
						<span key={1}>
							&nbsp;({this.props.subclasses}&nbsp;{type_config.child})
						</span>
					);
				}
			}
			
				
			if (type_config.hasOwnProperty('tcdb') && this.props.tcdb !== "") {
				parts.push(
					<span key={2}>
						&nbsp;
						<a className="external" target="_blank" href={type_config.tcdb(this.props.tcdb)}>
							{this.props.tcdb}&nbsp;(TCDB)
						</a>
					</span>
				);
			}
		

			if (type_config.hasOwnProperty('pfam') && this.props.pfam !== ""){
				parts.push(
					<span key={3}>
						&nbsp;
						<a className="external" target="_blank" href={type_config.pfam(this.props.pfam)}>
							{this.props.pfam}
						</a>
					</span>
				);
			}

			if (type_config.hasOwnProperty('pdb') && this.props.pfam !== ""){
				parts.push(
					<span key={4}>
						&nbsp;
						<a className="external" target="_blank" href={type_config.pdb(this.props.pfam)}>
							PDBsum
						</a>
					</span>
				);
			}

			if (this.state.expanded && type_config.child !== 'proteins' && !this.state.loading){
				parts.push(
					<div key={6} className="expanded-list-section">
						<List
							url={this.props.expand_url}
							ctype={type_config.child}
							sub_type={Config.classification[type_config.child].child}
							searchable={false}
							expandable_items={true}
							data={this.state.listData}
							onResize={this.props.onResize}
						/>
					</div>
				);
			}
			else if (this.state.expanded && !this.state.loading) {
				parts.push(
					<div key={6}>
						<ProteinList
							url={this.props.expand_url}
							data={this.state.listData}
							onResize={this.props.onResize}
						/>
					</div>
				);
			}
			
			return parts;
		};

	}
	componentWillReceiveProps(nextProps) {
		if (this.props.ctype !== nextProps.ctype || this.props.id !== nextProps.id) {
			this.setState({
				expanded: false,
			});
		}
	}

	componentDidMount() {
		if (this.props.hasOwnProperty('onResize')){
			this.props.onResize();
		}
	}

	componentDidUpdate() {
		if (this.props.hasOwnProperty('onResize')){
			this.props.onResize();
		}
	}

	render()
	{
		return(
			<span className="list-item">
				{ this.renderItem() }
			</span>
		);
	}
}

ListItem.propTypes = {
	// types, classes, superfamilies, families, localizations (membranes), species, proteins (structure_groupings) 
	ctype: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	subclasses: PropTypes.number.isRequired,
	tcdb: PropTypes.string,
	pfam: PropTypes.string,
	base: PropTypes.bool,
	expandable: PropTypes.bool,
	expand_url: PropTypes.string,
	onResize: PropTypes.func
};

ListItem.defaultProps = {
	tcdb: "",
	pfam: "",
	base: false,
	expandable: false,
	expand_url: "",
	onResize: () => {}
};

export default ListItem;
