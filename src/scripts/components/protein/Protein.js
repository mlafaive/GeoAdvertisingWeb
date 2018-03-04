import React from 'react';
import PropTypes from 'prop-types';
import Config from '../../Config.js';
import PDB from './pdb/PDB.js';

import ImgWrapper from '../img_wrapper/ImgWrapper.js';

import { connect } from 'react-redux';
import axios from 'axios';
import Info from '../info/Info.js';

import './Protein.scss';

class Protein extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
		this.state.has_data = false;
		this.state.id = this.props.currentUrl.params.id;

		axios.get(Config.baseUrl + Config.classification.proteins.api.route + '/' + this.props.currentUrl.params.id)
		.then((res) => {
			var newstate = res.data;

			var in_or_out = res.data.topology_show_in ? res.data.membrane.topology_in : res.data.membrane.topology_out;
			if (res.data.topology_subunit === "") {
				newstate.topology = in_or_out;
			}
			else {
				newstate.topology = "subunit " + res.data.topology_subunit + " (N terminus " + in_or_out + ")";
			}
			newstate.header = res.data.name;
			newstate.image_pdbid = res.data.pdbid;
			newstate.has_data = true;
			newstate.info = {};
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
			createInfo("proteins", res.data);
			this.setState(newstate);
		});
	}

	renderInfo(){
		var items = [];
		if (this.state.hasOwnProperty('info')){
			items.push(
				<div key={1}>
					<Info {...this.state.info}/>
				</div>
			);
		}
		return items;
	}
	renderTableRow(right, left, attr){
		return(
			<tr className={attr}>
				<td className="right"><b>{right}</b></td>
				<td className="left">{left}</td>
			</tr>
		)
	}

	renderLinks(pdbid){
		return(
			<span>
			<a className="cursor-hand external" target="_blank" href={Config.classification.proteins.pdbsum(pdbid)}> PDB Sum</a>,
			<a className="cursor-hand external" target="_blank" href={Config.classification.proteins.pdb(pdbid)}> PDB</a>,
			<a className="cursor-hand external" target="_blank" href={Config.classification.proteins.scop(pdbid)}> SCOP</a>,
			<a className="cursor-hand external" target="_blank" href={Config.classification.proteins.msd(pdbid)}> MSD</a>,
			<a className="cursor-hand external" target="_blank" href={Config.classification.proteins.oca(pdbid)}> OCA</a>,
			<a className="cursor-hand external" target="_blank" href={Config.classification.proteins.mmdb(pdbid)}> MMDB</a>
			</span>
		);
	}
	
	
	changeImage(new_pdbid){
		this.setState({image_pdbid : new_pdbid} );
	}

	renderSimplePDBLink(pdbid, showComma){
		if (this.state.image_pdbid == pdbid) {
			return(
				<span className="cursor-hand" key={pdbid}>
					<strong>
						{pdbid}
					</strong>
					{showComma ? ", " : ""}
				</span>
			);	
		}
		else {
			return(
				<span className="cursor-hand" key={pdbid}>
					<a onClick={() => this.changeImage(pdbid)}>
						{pdbid}
					</a>
					{showComma ? ", " : ""}
				</span>
			);
		}
	}
	renderOtherPDBs(){
		if (this.state.secondary_representations.length === 0){
			return (
				<span>none</span>
			);
		}
		var items = [];
		for (var i = 0; i < this.state.secondary_representations.length; i++) {
			var pdbid = this.state.secondary_representations[i].pdbid;
			let showComma = i !== (this.state.secondary_representations.length - 1);
			items.push(this.renderSimplePDBLink(pdbid, showComma));
		}
		return items;
	}
	renderDescription(){
		if (this.state.description) {
			return(<p key="description"><span className="green italic">Description: </span>{this.state.description}</p>);	
		}
	}
	renderComments(){
		if (this.state.comments) {
			return(<p key="comments"><span className="green italic">Comments: </span>{this.state.comments}</p>);
		}
	}
	renderVerification(){
		if (this.state.verification) {
			return(
			<div className="info-table full">
				<table>
					<tbody>
					<tr className="dark"><th colSpan="2"><span className="green italic">Verification:</span> {this.state.name} </th></tr>
					<tr>
						<td colSpan="2" className="small-text">{this.state.verification}</td>
					</tr>
					</tbody>
				</table>
			</div>
			);
		}
	}
	renderSubunit(key, data){
		return(
			<tr key={key}>
				<td colSpan="2" className="small-text"><b>{data.protein_letter}</b> - Tilt: {data.tilt} - Segment: {data.segment}</td>
			</tr>
			);
	}
	renderSubunits(){
		if (this.state.subunits.length == 0) {
			return;
		}
		var subunits = [];
		for (var i = 0; i < this.state.subunits.length; i++) {
			var struct = this.state.subunits[i];
			subunits.push(this.renderSubunit(i, struct));
			
		}
		return(
			<div className="info-table full">
				<table>
					<tbody>
					<tr className="dark"><th colSpan="2"><span className="green italic">Subunits: </span> {this.state.subunits.length}</th></tr>
					{subunits}
					</tbody>
				</table>
			</div>

		)
	}

	renderCitations(){
		if (this.state.citations.length == 0) {
			return;
		}
		var citations = [];
		for (var i = 0; i < this.state.citations.length; i++) {
			var citation = this.state.citations[i];
			citations.push(
				<tr key={i}>
					<td colSpan="2" className="small-text"><span className="green italic">PMID: {citation.pmid}</span> :: {citation.maintext}</td>
				</tr>
				);
			
		}
		return(
			<div className="info-table full">
				<table>
					<tbody>
					<tr className="dark"><th colSpan="2"><span className="green italic"> References</span>: {this.state.citations.length}</th></tr>
					{citations}
					</tbody>
				</table>
			</div>

		)
	}
	render()
	{
		if (!this.state.has_data) {
			return(
				<div className="info-loading">
					<img className="loading-image" src={Config.loading_image}/>
				</div>
			);
		}
		return(
			<div className="protein">
				<div className="page-header">
					{this.state.pdbid} >> {this.state.name}
				</div>
				<div className="random-protein">
					<PDB pdbid={(this.state.image_pdbid)} id={this.state.id} name={this.state.name}/>
					<div className="topology-section">
						<div className="topology-header">
							Topology in {this.state.membrane.name}
						</div>
						<table>
							<tbody>
								<tr>
									<td rowSpan="2">
										<ImgWrapper className="img-style" src={Config.topology}/>
									</td>
									<td className="topology-info out">
										{this.state.membrane.topology_out}
									</td>
								</tr>
								<tr>
									<td className="topology-info in">
										{this.state.membrane.topology_in} 
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="protein-info">
					{this.renderInfo()}
				</div>
				<div className="info-table">
					<table>
						<tbody>
						<tr className="dark"><th colSpan="2">{this.state.pdbid} >> {this.state.name}</th></tr>
							{this.renderTableRow("Hydrophobic Thickness or Depth", this.state.thickness +  " ± " + this.state.thicknesserror, "light")}	
							{this.renderTableRow("Tilt Angle", this.state.tilt +  " ± " + this.state.tilterror + "°", "dark")}	
							{this.renderTableRow("ΔGtransfer", this.state.gibbs + " kcals/mol", "light")}	
							{this.renderTableRow("Links to " + this.state.pdbid, this.renderLinks(this.state.pdbid), "dark")}	
							{this.renderTableRow("Topology", this.state.topology, "light")}	
							{this.renderTableRow("Resolution", this.state.resolution + " Å", "dark")}	
							{this.renderTableRow("Primary PDB represention", this.renderSimplePDBLink(this.state.pdbid, false), "light")}	
							{this.renderTableRow("Other PDB entries representing this structure", this.renderOtherPDBs(), "dark")}	
							{this.renderTableRow("Number of TM Secondary Structures", this.state.subunit_segments, "light")}	
						</tbody>
					</table>
				</div>
				{this.renderDescription()}
				{this.renderComments()}
				{this.renderVerification()}
				{this.renderSubunits()}
				{this.renderCitations()}
			</div>
		);
	}
}


function mapStateToProps(state) {
  return {
		currentUrl: state.currentUrl,
	};
}

export default connect(mapStateToProps)(Protein);
