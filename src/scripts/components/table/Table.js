import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import axios from 'axios'
import appendQuery from 'append-query';

import Config from '../../Config.js';

import { Column, Table as VTable, WindowScroller, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import './react-virtualized.scss';

import ImgWrapper from '../img_wrapper/ImgWrapper.js';

import Search from '../search/Search.js';

import { Link } from 'react-router-dom';

import './Table.scss';

var CancelToken = axios.CancelToken;

class Table extends React.Component{
	constructor(props)
	{
		super(props);
		this.state = {
			data: {
				total_objects: 0,
				objects: [],
				sort: "",
				direction: ""
			},
			title: this.props.title,
			loading: true,
			search: props.search,
			display: false,
			table_width: 850,
			header_height: 65,
			row_height: 75,
			style: {},
			name: '',
			src: ''
		};

		this.unmounted = false;

		this.gen_widths = () => {
			let remaining_width = this.state.table_width;
			let remaining_columns = this.props.columns.length;
			for (let i = 0; i < this.props.columns.length; i++) {
				if (this.props.columns[i].hasOwnProperty('width')){
					remaining_width -= this.props.columns[i].width;
					remaining_columns--;
				}
			}
			let default_width = remaining_width/remaining_columns;
			
			let widths = [];
			for (var i = 0; i < this.props.columns.length; i++) {
				let width = default_width;
				if (this.props.columns[i].hasOwnProperty('width')){
					width = this.props.columns[i].width;
				}
				widths.push(width);
			}

			return widths;
		}
		this.state.widths = this.gen_widths();

		this.render_cell = (column) => {
			return (props) => {
				let row = props.rowData;
				row.onImgChange = (state) => { 
					this.setState(state); 
				};

				let color_class = (props.rowIndex % 2) === 0 ? "even" : "odd";

				return (
					<div className={color_class}>
						{ column.Cell(row) }
					</div>
				);
			}
		}

		this.render_header = (column) => {
			return () => {

				let sorted_class = "hidden";
				if (this.state.data.sort === column.id) {
					sorted_class = this.state.data.direction.toLowerCase();
				}

				return (
					<div className="header-wrapper">
						{ column.Header() }
						<div className={sorted_class}></div>
					</div>
				)
			}
		}

		this.row_height = () => {
			return this.state.row_height;
		}

		this.render_body = () => {
			let items = [];
			for (var i = 0; i < this.props.columns.length; i++) {
				items.push(
					<Column
						key={i}
				    	headerRenderer={this.render_header(this.props.columns[i])}
				    	cellRenderer={this.render_cell(this.props.columns[i])}
						width={this.state.widths[i]}
						flexGrow={this.props.columns[i].hasOwnProperty('width') ? 0 : 1}
						dataKey={this.props.columns[i].id}
				    />
				);
			}
			return items;
		}

		this.cancelReq = null;

		this.fetch_data = (params, search = false) => {
			params.pageSize = 100;
			let url = appendQuery(this.props.url, params);

			if (this.cancelReq !== null) {
				this.cancelReq();
			}
			axios.get(url,
			{ 
				cancelToken: new CancelToken((c) => {
					// An executor function receives a cancel function as a parameter
					this.cancelReq = c;
				})
			})
		    .then((res) => {
		    	if (this.unmounted) {
		    		return;
		    	}
		    	if (search && this.props.redirect && res.data.total_objects === 1) {
		    		this.props.currentUrl.history.push('/proteins/' + res.data.objects[0].id);
		    		return;
		    	}
		    	if (res.data.total_objects <= 100) {
		    		this.setState({
						data: res.data,
						loading: false
					});
		        	return;
		        }
		        this.setState({
		        	data: res.data
		        });

		        params.pageSize = res.data.total_objects;
		        url = appendQuery(this.props.url, params);
		        axios.get(url, 
		        { 
					cancelToken: new CancelToken((c) => {
						// An executor function receives a cancel function as a parameter
						this.cancelReq = c;
					})
				})
			    .then((res) => {
			    	if (this.unmounted) {
			    		return;
			    	}
			        this.setState({
			         	data: res.data,
			        	loading: false
			        });
			        this.cancelReq = null;
		    	});
		    });
		}

		this.handle_sort = (props) => {
			let direction = 'ASC';
			if (props.dataKey === this.state.data.sort && this.state.data.direction === 'ASC'){
				direction = 'DESC';
			}
			let params = {
				sort: props.dataKey,
				direction: direction
			};  
		    this.fetch_data(params);
		    this.setState({
		    	loading: true,
		    	search: "",
		    	data: {
		    		total_objects: 0,
					objects: [],
					sort: "",
					direction: ""
		    	}
		    });
		}

		this.handle_search = (value) => {
			let params = {
				search: value
			}; 
		    this.fetch_data(params, true);
		    this.setState({
		    	loading: true,
		    	search: value,
		    	data: {
		    		total_objects: 0,
					objects: [],
					sort: "",
					direction: ""
		    	},
		    	title: value === "" ? this.props.title : "Search Results for \"" + value + "\""
		    });
		}

		this.handle_no_rows = () => {
			return (
				<div className={this.state.loading ? "hidden" : "no-rows"}>
					no proteins found
				</div>
			);
		}

		if(props.hasOwnProperty('data')){
			this.state.data = props.data;
			this.state.loading = false;
		}
		else {
			this.fetch_data({ search: this.props.search }, this.props.search !== "");
			if (this.props.search !== ""){
				this.state.title = "Search Results for \"" + this.props.search + "\""
			}
		}
		this.updateSize = this.updateSize.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.search !== this.props.search) {
			this.handle_search(nextProps.search);
		}
	}
	componentWillUnmount() {
		this.unmounted = true;
	}

	updateSize() {
		this.windowScrollerRef.updatePosition();
	}

	render()
	{
		return(
			<div className="light-table">
				<h2 className='table-header'>
					{this.state.title + ' (' + this.state.data.total_objects + ' entries)'}
				</h2>
				<div className="search-section">
					<Search
						onSearch={this.handle_search}
						placeholder="Search table..."
						initial={this.state.search}
					/>
				</div>
				<div className="virtual-table">
					<WindowScroller ref={ref => { this.windowScrollerRef = ref }}>
	    				{({ height, isScrolling, onChildScroll, scrollTop }) => (
	    					<AutoSizer disableHeight>
	    						{({ width }) => (
									<VTable
										autoHeight
								        height={height}
								        isScrolling={isScrolling}
								        onScroll={onChildScroll}
								        scrollTop={scrollTop}
									    width={width < this.state.table_width ? this.state.table_width : width}
									    headerHeight={this.state.header_height}
									    rowHeight={this.row_height}
									    rowCount={this.state.data.objects.length}
									    rowGetter={({ index }) => this.state.data.objects[index]}
									    onHeaderClick={this.handle_sort}
									    noRowsRenderer={this.handle_no_rows}
									>
									    { this.render_body() }
									</VTable>
								)}
							</AutoSizer>
						)}
	  				</WindowScroller>
	  				<div className={this.state.display ? "floating-image" : "hidden"} style={this.state.style}>
						<div className="image-header">
							<span className="header-text">{this.state.name}</span>
						</div>
						<ImgWrapper src={this.state.src}/>
					</div>
				</div>
				<div className={this.state.loading ? "info-loading" : "hidden"}>
					<img className="loading-image" src={Config.loading_image}/>
				</div>
			</div>
		);
	}
}

Table.propTypes = {
	url: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	search: PropTypes.string,
	redirect: PropTypes.bool
};

Table.defaultProps = {
	search: "",
	redirect: true
};

function mapStateToProps(state) {
  return {
		 currentUrl: state.currentUrl,
	};
}

export default connect(mapStateToProps, null, null, { withRef: true })(Table);