import React from 'react';
import ReactDOM from 'react-dom';

import Config from '../../Config.js';

import PDB from '../protein/pdb/PDB.js';

import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ImgWrapper from '../img_wrapper/ImgWrapper.js';

import axios from 'axios';

import './Home.scss';

class Home extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			header: "Orientations of Proteins in Membranes (OPM) database",
			id: 0,
			name: "",
			pdbid: "",
		};

		axios.get(Config.baseUrl + Config.classification["proteins"].api.route + '/random')
		.then((res) => {
			this.setState({
				header: "Orientations of Proteins in Membranes (OPM) database",
				id: res.data.id,
				name: res.data.name,
				pdbid: res.data.pdbid,
			});
		});

		this.renderImage = () => {
			if (this.state.pdbid === "") {
				return "";
			}
			return (
				<div>
					<Link to={"/proteins/" + this.state.id}>
						<ImgWrapper className="img-style" src={Config.pdb_image(this.state.pdbid)}/>
					</Link>
					<div className="protein-link">
						<Link to={"/proteins/" + this.state.id}>{this.state.name} pdb-{this.state.pdbid}</Link>
					</div>
					<hr/>
					<div className="protein-link">
						<a href={Config.pdb_file(this.state.pdbid)} download>Download File: {this.state.pdbid}.pdb</a>
					</div>
				</div>
			);
		}
	}
	makeClassStat(key, classtype){
		return(
			<div key={key} className="classtype-stat">
				<p><span className="green italic">Class:</span> <Link to={"/classes/" + classtype.id}>{classtype.name}</Link> - <span className="bold">({classtype.structure_groupings}/{classtype.complex_structures})</span></p>
			</div>
			)	
	}
	makeTypeStat(key, type){
		var classStats = []
		for (var i = 0; i < type.classes.length; i++) {
			var classtype = type.classes[i].table
			classStats.push(this.makeClassStat(i, classtype));
		}
		return(
			<div key={key} className="type-stat">
				<p><span className="green italic">Type:</span> <Link to={"/types/" + type.id}>{type.name}</Link> - <span><strong>({type.structure_groupings}/{type.complex_structures})</strong></span></p>
				<div className="classtype-stat-holder">
					{classStats}
				</div>
			</div>
			)
	}
	renderStructureStats(){
		if (this.props.stats === "") {
			return (
				<div className="info-loading">
					<img className="loading-image" src={Config.loading_image}/>
				</div>
			);
		}

		var typeStats = []
		for (var i = 0; i < this.props.stats.structure_stats.length; i++) {
			var type = this.props.stats.structure_stats[i].table;
			typeStats.push(this.makeTypeStat(i, type));
		}
		
		return typeStats;
	}

	render()
	{
		return(
			<div className="home">
				<div>
					<h1>{this.state.header}</h1>
					<div className="random-protein">
						{ this.renderImage() }
					</div>
					<div className="home-text">
						<div className="indented">
							<p>OPM provides spatial arrangements of membrane proteins with respect to the hydrocarbon core of the lipid bilayer.</p>
							<p>OPM includes all unique experimental structures of transmembrane proteins and some peripheral proteins and membrane-active peptides (<a href="">Features</a>).</p>
							<p>Each protein is positioned in a lipid bilayer of adjustable thickness by minimizing its transfer energy from water to the membrane (<a href="">Methods</a>).</p>
							<p>OPM provides structural classification and sorting according to different criteria (<a href="">Classification</a>).</p>
							<p>Our calculations are in agreement with experimental studies of 24 transmembrane and 39 peripheral peptides and proteins (<a href="">Comparison with Experiments</a>).</p>
							<p>
								<b>
									<i>For more information on single-spanning transmembrane proteins please see our <a href="">Membranome database</a></i>
								</b>
							</p>
						</div>
						<div>
							<p><b>In citing the Orientations of Proteins in Membranes (OPM) database please refer to</b></p>
							<p>Lomize MA, Pogozheva ID, Joo H., Mosberg HI, Lomize AL (2012) OPM database and PPM web server: resources for positioning of proteins in membranes.
								<i> Nucleic Acids Res.</i> 
								<b> 40 </b> 
								(Database issue), D370-D376.  
								<a href=""> PDF </a>
								<a className="external" href="http://www.ncbi.nlm.nih.gov/pubmed/21890895" target="_blank">PubMed</a>
							</p>
							<br/>
							<p><b>For an explanation of our method please refer to</b></p>
							<p>Lomize AL, Pogozheva ID, Lomize MA, Mosberg HI (2006) Positioning of proteins in membranes: A computational approach.
								<i> Protein Science.</i> 
								<b> 15</b> 
								, 1318-1333.  
								<a href=""> PDF </a>
								<a className="external" href="http://www.ncbi.nlm.nih.gov/pubmed/16731967" target="_blank">PubMed</a>
							</p>
							<br/>
							<p><b>For a new version of our method please refer to</b></p>
							<p>Lomize AL, Pogozheva ID, Mosberg HI (2011) Anisotropic solvent model of the lipid bilayer. 2. Energetics of insertion of small molecules, peptides, and proteins in membranes.
								<i> J Chem Inf Model.</i> 
								<b> 51</b> 
								, 930-946.  
								<a href=""> PDF </a>
								<a href=""> PDF (supplementary) </a>
								<a className="external" href="http://www.ncbi.nlm.nih.gov/pubmed/21438606" target="_blank">PubMed</a>
							</p>
							<br/>
							<p><b>For more information on peripheral proteins please refer to</b></p>
							<p>Lomize AL, Pogozheva ID, Lomize MA, Mosberg HI (2007) The role of hydrophobic interactions in positioning of peripheral proteins in membranes. 
								<i> BMC Struct Biol.</i> 
								<b> 7</b> 
								, 44.  
								<a href=""> PDF </a>
								<a className="external" href="http://www.ncbi.nlm.nih.gov/pubmed/17603894" target="_blank">PubMed</a>
							</p>
							
							<div className="questions-box structure-stats">
								<div className="box-header">
									<b className="header-text">Structure Statistics (proteins/total_pdb)</b>
								</div>
								<div className="box-body">
									{ this.renderStructureStats() }
								</div>
							</div>

							<div className="questions-box">
		      					<div className="box-header">
		      						<b className="header-text">Questions</b>
		      					</div>
		      					<div className="box-body">
									<p><b>1. Calculate orientation for unreleased structure or membrane protein was not in OPM?</b></p>
									<p>Please use our <a href="">web server</a> or we can process your coordinates through email (<a href="mailto:almz@umich.edu">almz@umich.edu</a>). All information is kept confidential. Orientation of membrane protein cannot be predicted if all its membrane-anchoring elements are missing or disordered.</p>
									<p><b>2. Errors in orientation or experimental verification description?</b></p>
									<p>Please <a href="">contact us</a>.</p>
								</div>
		   					</div>
		   					<div>
								<p><a className="external" href="http://nsf.gov/awardsearch/showAward.do?AwardNumber=0849713" target="_blank">OPM was funded by the National Science Foundation (NSF)</a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
		stats: state.stats,
		currentUrl: state.currentUrl,
	};
}

export default connect(mapStateToProps)(Home);
