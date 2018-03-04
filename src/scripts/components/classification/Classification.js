import React from 'react';

import Config from '../../Config.js';

import { connect } from 'react-redux';

import Info from '../info/Info.js';
import List from '../list/List.js';
import Table from '../table/Table.js';

import './Classification.scss';

import axios from 'axios';


class Classification extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			resize: false
		};

		this.onResize = () => {
			if (this.hasOwnProperty('table') && this.table !== undefined && this.table !== null){
				this.table.getWrappedInstance().updateSize();
			}
		}

		this.fetch = (cur_props) => {
			var return_state = {};
			var ctype = cur_props.currentUrl.url.split('/')[1];

			// single entity
			if (cur_props.currentUrl.params.hasOwnProperty('id')){
				return_state.loading = true;
				return_state.header = 'Loading...';
				if (Config.classification[ctype].child !== "proteins"){
					return_state.listHeader = Config.classification[ctype].child.charAt(0).toUpperCase() + Config.classification[ctype].child.slice(1);
					return_state.listData = {
						url: Config.baseUrl + 
							Config.classification[ctype].api.route +
							'/' + cur_props.currentUrl.params.id +
							Config.classification[Config.classification[ctype].child].api.route,
						ctype: Config.classification[ctype].child,
						sub_type: Config.classification[Config.classification[ctype].child].child,
						expandable_items: true,
					}
				}

				 return_state.tableData = {
					title: "Proteins",
					url: Config.baseUrl + 
						Config.classification[ctype].api.route + 
						'/' + props.currentUrl.params.id + 
						Config.classification["proteins"].api.route,
					columns: Config.columns.default,
					redirect: false
			    };
				// fetch data here
				axios.get(Config.baseUrl + Config.classification[ctype].api.route + '/' + cur_props.currentUrl.params.id).then((res) => {
					var newstate = {
						loading: false,
						header: res.data.name,
						info: {
							base: ctype
						},
					}
					newstate.info[ctype] = {
						id: res.data.id,
						name: res.data.name,
						subclasses: res.data[Config.classification[Config.classification[ctype].child].api.accessor.count],
						pfam: res.data.pfam,
						tcdb: res.data.tcdb
					}

					function createInfo(cur_type, cur_obj){
						if (Config.classification[cur_type].hasOwnProperty('parents')){
							for (var i = 0; i < Config.classification[cur_type].parents.length; i++) {
								let parent = Config.classification[cur_type].parents[i];
								let parent_obj = cur_obj[Config.classification[parent].api.accessor.object];
								newstate.info[parent] = {
									id: parent_obj.id,
									name: parent_obj.name,
									subclasses: parent_obj[Config.classification[cur_type].api.accessor.count],
									pfam: parent_obj.pfam,
									tcdb: parent_obj.tcdb
								};
								// recurse with cur_type = parent, cur_obj = parent_obj
								createInfo(parent, parent_obj);
							}

						}
					}
					createInfo(ctype, res.data);
			        this.setState(newstate);
			    });
			}
			// only a table
			else if (ctype === "proteins") {
				return_state.loading = false;
				return_state.tableData = {
					title: "All proteins in OPM",
					url: Config.baseUrl + Config.classification[ctype].api.route,
					columns: Config.columns.default,
					search: cur_props.currentUrl.query.search
				};
			}
			// only a list
			else {
				return_state.loading = false;
				return_state.listHeader = ctype.charAt(0).toUpperCase() + ctype.slice(1);
				return_state.listData = {
					url: Config.baseUrl + Config.classification[ctype].api.route,
					ctype: ctype,
					sub_type: Config.classification[ctype].child
				};
			}

			return return_state;
		}

		this.state = this.fetch(props);

		this.renderClassification = () => {
			var items = [];
			if (this.state.hasOwnProperty('header')){
				items.push(
					<div key={0} className="page-header">
						{ this.state.header }
					</div>
				);
			}
			else if (this.state.hasOwnProperty('listHeader')) {
				items.push(
					<div key={0} className="page-header">
						{ this.state.listHeader }
					</div>
				);
			}

			if (this.state.hasOwnProperty('info')){
				items.push(
					<div key={1}>
						<Info onResize={this.onResize} {...this.state.info}/>
					</div>
				);
			}
			else if (this.state.loading){
				items.push(
					<div className="info-loading" key={1}>
						<img className="loading-image" src={Config.loading_image}/>
					</div>
				);
			}

			if (this.state.hasOwnProperty('listData') && this.state.hasOwnProperty('header')){
				items.push(
					<div key={2} className="list-section">
						<div className="list-header">
							{ this.state.listHeader }:
						</div>
						<List onResize={this.onResize} {...this.state.listData}/>
					</div>
				);
			}
			else if (this.state.hasOwnProperty('listData') && !this.state.hasOwnProperty('header')){
				items.push(
					<div key={2} className="list-section">
						<List {...this.state.listData}/>
					</div>
				);
			}

			if (this.state.hasOwnProperty('tableData')){
				items.push(
					<div key={3} className="table-section">
						<Table ref={ref => { this.table = ref }} {...this.state.tableData}/>
					</div>
				);
			}

			return items;
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState(this.fetch(nextProps));
	}


	render()
	{
		return(
			<div className="classification">
				{ this.renderClassification() }
			</div>
		);
	}
}


function mapStateToProps(state) {
  return {
		currentUrl: state.currentUrl,
	};
}

export default connect(mapStateToProps)(Classification);
