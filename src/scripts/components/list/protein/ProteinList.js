import React from 'react';
import Config from '../../../Config.js';
import { Link } from 'react-router-dom';

import ImgWrapper from '../../img_wrapper/ImgWrapper.js';

import PropTypes from 'prop-types';
import axios from 'axios'

import './ProteinList.scss';

import appendQuery from 'append-query'

class ProteinList extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			entries: [],
			total_proteins: 0,
			url: props.url,
			ctype: 'proteins',
			page_size: 20,
			page_num: 1,
			expand_disabled: true,
			loading: true
		};

		this.fetch_entries = (objects) => {
			let new_entries = this.state.entries;

			for (var i = 0; i < objects.length; i++) {
				let name = new_entries.length === 0 ? "" : new_entries[new_entries.length - 1].name;

				let pdbids = [objects[i].pdbid];
				for (var j = 0; j < objects[i].secondary_representations.length; j++) {
					pdbids.push(objects[i].secondary_representations[j].pdbid);
				}

				if (objects[i].primary_name === name) {
					new_entries[new_entries.length - 1].proteins.push({
						id: objects[i].id,
						species: {
							id: objects[i].species_id,
							name: objects[i].species_name_cache,
						},
						pdbids: pdbids,
						primary_pdbid: objects[i].pdbid,
						current_pdbid: objects[i].pdbid
					});
				}
				else {
					new_entries.push({
						name: objects[i].primary_name,
						proteins: [
							{
								id: objects[i].id,
								species: {
									id: objects[i].species_id,
									name: objects[i].species_name_cache,
								},
								pdbids: pdbids,
								primary_pdbid: objects[i].pdbid,
								current_pdbid: objects[i].pdbid
							}
						]
					});
				}
			}
			return new_entries;
		}

		this.fetch_data = (expanding = false) => {
			let psize = expanding ? this.state.total_objects : this.state.page_size;
			let params = {
				sort: 'name',
				pageNum: this.state.page_num,
				pageSize: psize
			};
			let new_url = appendQuery(this.state.url, params);

			axios.get(new_url)
			.then((res) => {
					let new_entries = this.fetch_entries(res.data.objects.slice(this.state.total_proteins, res.data.objects.length));
					let total_proteins = this.state.total_proteins + res.data.objects.length;
					let disable = expanding || (total_proteins === res.data.total_objects);

					this.setState({
						entries: new_entries,
						expand_disabled: disable,
						total_proteins: total_proteins,
						page_num: this.state.page_num + 1,
						loading: false,
						total_objects: res.data.total_objects
					});

				}
			);
		}

		this.handle_expand = () => {
			this.setState({
				loading: true,
				expand_disabled: true
			});
			this.fetch_data(true);
		}

		if (!props.hasOwnProperty('data')) {
			this.fetch_data();
		}
		else {
			this.state.entries = this.fetch_entries(props.data.objects);
			this.state.total_proteins = props.data.objects.length;
			this.state.expand_disabled = (this.state.total_proteins === props.data.total_objects);
			this.state.loading = false;
			this.state.total_objects = props.data.total_objects;
		}

		this.change_pdb = (entry, protein, new_pdb) => {
			var old_entries = this.state.entries;
			old_entries[entry].proteins[protein].current_pdbid = new_pdb;

			this.setState({
				entries: old_entries
			});
		}

		this.create_pdb_list = (pdbs, cur_pdb, entry, protein) => {
			var items = [];
			for (var i = 0; i < pdbs.length; i++) {
				let pdb = pdbs[i];
				if (pdb !== cur_pdb) {
					items.push(
						<span key={i}>
							<span>
								{i === 0 ? "" : ", "}
							</span>
							<span className="pdb-link" onClick={() => this.change_pdb(entry, protein, pdb)}>
								{pdb}
							</span>
						</span>
					);
				}
				else {
					items.push(
						<span key={i}>
							<span>
								{i === 0 ? "" : ", "}
							</span>
							<strong>
								{pdbs[i]}
							</strong>
						</span>
					);
				}
			}
			return items;
		}

		this.create_list_item = (proteins, entry) => {
			var items = [];

			for (var i = 0; i < proteins.length; i++) {
				items.push(
					<div key={i} className="protein-section">
						<div className="image-section">
							<Link to={"/proteins/" + proteins[i].id}>
								<ImgWrapper 
									className="pdb-image" 
									src={Config.pdb_image(proteins[i].current_pdbid)}
								/>
							</Link>
						</div>
						<div className="protein-text">
							<Link to={"/species/" + proteins[i].species.id}>
								<i className="species-header">
									{ proteins[i].species.name }
								</i>
							</Link>
							&nbsp;
							<div className="pdbids">
								({this.create_pdb_list(proteins[i].pdbids, proteins[i].current_pdbid, entry, i)})
							</div>
							<div className="protein-link">
								<Link to={"/proteins/" + proteins[i].id}>
									Link to protein
								</Link>
							</div>
						</div>
					</div>
				);
			}
			return items;
		}

		this.renderList = () => {
			var items = [];
			for (let i = 0; i < this.state.entries.length; i++) {
				items.push(
					<li key={i}>
						<span>
							{this.state.entries[i].name}
						</span>
						<div>
							{ this.create_list_item(this.state.entries[i].proteins, i) }
						</div>
					</li>
				);
			}


			return items;

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
			<div className="protein-list">
				<ol className="protein-data">
					{ this.renderList() }
				</ol>
				<div className={this.state.expand_disabled ? "hidden" : "expand"} onClick={this.handle_expand}>
					See All...
				</div>
				<div className={this.state.loading ? "info-loading" : "hidden"} key={1}>
					<img className="loading-image" src={Config.loading_image}/>
				</div>
			</div>
		);
	}
}

ProteinList.propTypes = {
	url: PropTypes.string.isRequired,
	onResize: PropTypes.func
}

ProteinList.defaultProps = {
	onResize: () => {}
};

export default ProteinList;
