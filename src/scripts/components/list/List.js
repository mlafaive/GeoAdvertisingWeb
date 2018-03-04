import React from 'react';
import Config from '../../Config.js';
import { Link } from 'react-router-dom';
import ListItem from '../list_item/ListItem.js';
import PropTypes from 'prop-types';
import axios from 'axios';
import Search from '../search/Search.js';

import './List.scss';

import appendQuery from 'append-query';

// List usage example:
//	<List
//		url={'http://localhost:3000/superfamilies'}
//		type='superfamilies'
//		sub_type='families'
//	/>

class List extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			expand_disabled: true,
			data: {
				page_size: 50, 
				page_num: 0,
			},
			entries: [],
			search: '',
			url: props.url,
			ctype: this.props.ctype,
			sub_type: this.props.sub_type,
			loading: true
		};

		this.create_list_item = (obj) => {
			var type_config = Config.classification[this.state.ctype];
			var child_config = Config.classification[type_config.child];
			return (<ListItem
						ctype={this.state.ctype}
						name={obj.name}
						id={obj.id}
						subclasses={obj[child_config.api.accessor.count]}
						tcdb={obj.tcdb}
						pfam={obj.pfam}
						expandable={this.props.expandable_items}
						expand_url={Config.baseUrl + type_config.api.route + '/' + obj.id + child_config.api.route}
						onResize={this.props.onResize}
					/>);
		}

		this.fetch_entries = (objects, curr_length) => {
			let new_entries = [];


			for (let i = 0; i < objects.length; i++) {
				new_entries.push(
					<li key={curr_length+new_entries.length+1} className="list-link">
						{ this.create_list_item(objects[i]) }
					</li>
				);
			}


			return new_entries;

		}

		this.handle_search = (value) => {
			this.setState({
				expand_disabled: true,
				loading: true,
				entries: []
			});

			let params = {}

			if(value !== '')
				params.search = value;

			params.pageSize = this.state.data.page_size;
			let new_url = appendQuery(this.state.url, params);

			axios.get(new_url)
			.then((response) => {
				let new_entries = this.fetch_entries(response.data.objects, 0);
				let disable = (new_entries.length === response.data.total_objects);
				this.setState({
					entries: new_entries,
					search: value,
					expand_disabled: disable,
					data: response.data,
					loading: false
				})

			})

		}

		this.handle_expansion = () => { 
			// Load next page of data
		    let params = {};
		    let new_page = this.state.data.page_num + 1;

		    params.pageSize = this.state.data.total_objects;

		    if(this.state.search !== '')
		    	params.search = this.state.search;

		    let new_url = appendQuery(this.state.url, params)
		    axios.get(new_url)
		    .then((response) => {
		    	let new_entries = this.fetch_entries(response.data.objects.slice(this.state.entries.length, response.data.objects.length), this.state.entries.length);
		    	let curr_entries = this.state.entries.slice().concat(new_entries);
		    	let disable = (curr_entries.length === response.data.total_objects);

		    	// Render the new data
			    this.setState({
			    	entries: curr_entries,
			    	expand_disabled: true,
			    	data: {
			    		page_num: new_page,
			    		page_size: params.pageSize
			    	},
			    	loading: false
			    })

		    });

		    this.setState({
				expand_disabled: true,
				loading: true
			});

		    return;
		}
		

		if (!props.hasOwnProperty('data')) {
			let params = {
				pageSize: this.state.data.page_size
			};
			let new_url = appendQuery(this.state.url, params);

			axios.get(new_url)
			.then((response) => {
					let new_entries = this.fetch_entries(response.data.objects, 0);
					let disable = (new_entries.length === response.data.total_objects);

					this.setState({
						data: response.data,
						entries: new_entries,
						expand_disabled: disable,
						loading: false
					});
				}
			);
		}
		else {
			this.state.data = props.data;
			this.state.entries = this.fetch_entries(this.state.data.objects, 0);
			this.state.expand_disabled = (this.state.entries.length === this.state.data.total_objects);
			this.state.loading = false;
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
		// Search bar example: https://github.com/vakhtang/react-search-bar/tree/master/demo
		return(
			<div className="list">
				<div className={this.props.searchable ? "search-section" : "hidden"}>
					<Search
						onSearch={this.handle_search}
						placeholder="Search list..."
					/>
				</div>
				<ol className="list-data">
					{ this.state.entries }
				</ol>
				<div className={this.state.expand_disabled ? "hidden" : "expand"} onClick={this.handle_expansion}>
					See All...
				</div>
				<div className={this.state.loading ? "info-loading" : "hidden"}>
					<img className="loading-image" src={Config.loading_image}/>
				</div>
			</div>
		);
	}
}

List.propTypes = {
	url: PropTypes.string.isRequired,
	ctype: PropTypes.string.isRequired,
	sub_type: PropTypes.string.isRequired,
	searchable: PropTypes.bool,
	expandable_items:  PropTypes.bool,
	onResize: PropTypes.func
}

List.defaultProps = {
	searchable: true,
	expandable_items: false,
	onResize: () => {}
};

export default List;
