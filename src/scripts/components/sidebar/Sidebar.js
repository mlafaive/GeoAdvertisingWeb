import React from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { loadStats } from '../../actions/stats.js';

import Config from '../../Config.js';

import axios from 'axios';

import './Sidebar.scss'

class Sidebar extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			loading: true,
		};
		if (this.props.stats === ""){
			axios.get(Config.baseUrl + '/stats').then((res) => {
				this.props.loadStats({
					types: res.data.table.types,
					classes: res.data.table.classtypes,
					superfamilies: res.data.table.superfamilies,
					families: res.data.table.family,
					proteins: res.data.table.primary_structure,
					species: res.data.table.species,
					localizations: res.data.table.membrane,
					structure_stats: res.data.table.structure_stats,
				});

				this.setState({
					loading: false,
				});
			});
		}
		else{
			this.state = {
				loading: false,
			}
		}

	}


	navitem(key, name, route, subclasses, is_selected){
		if (!is_selected) {
			return (
				<div key={key} className={"item not-selected"}>
					<Link to={route}><strong>{name}</strong></Link>
					<span>&nbsp;({subclasses})</span>
				</div>
			);
		}
		else {
			return (
				<div key={key} className={"item"}>
					<strong>{name}</strong>
					<span>&nbsp;({subclasses})</span>
				</div>
			);
		}
	}
	navitems(){
		var cur_ctype = !this.props.hasOwnProperty('currentUrl') || 
						this.props.currentUrl.params.hasOwnProperty('id') ? "" : this.props.currentUrl.url.split('/')[1];
		if (this.state.loading) {
			return;
		}
		var items = [];
		for (var i = 0; i < Config.classifications.length; i++) {
		    let ctype = Config.classifications[i];
		    let name = ctype.charAt(0).toUpperCase() + ctype.slice(1);
		    let route = '/' + ctype;
		    items.push(this.navitem(i, name, route, this.props.stats[ctype], cur_ctype === ctype));
		}
		return items;
	}


	render()
	{	
		return(
			<div className="sidebar">
				<div className="title">
					Protein Classification
				</div>
				<div className={this.state.loading ? "hidden" : "sidebar-nav"}>
						{this.navitems()}
				</div>
				<div className={this.state.loading ? "info-loading" : "hidden"}>
					<img className="loading-image" src={Config.loading_image}/>
				</div>
				<br/>
				<div className="title">
					Protein Links
				</div>
				<div className="sidebar-nav minor">
					<a 
						className="external" 
						href="http://www.ebi.ac.uk/thornton-srv/databases/pdbsum/" 
						target="_blank">PDB Sum
					</a>,&nbsp;  
   					<a 
   						className="external"
   						href="http://www.rcsb.org/pdb/" 
   						target="_blank"
   					>
   						PDB
   					</a>,&nbsp; 
   					<a 
   						className="external"
   						href="http://bip.weizmann.ac.il/oca/" 
   						target="_blank"
   					>
   						OCA
   					</a>,&nbsp;  
   					<br/>
   					<a 
   						className="external"
   						href="http://blanco.biomol.uci.edu/Membrane_Proteins_xtal.html" 
   						target="_blank"
   					>
   							MPKS
   					</a>,&nbsp;  
   					<a 
   						className="external"
   						href="http://pdbtm.enzim.hu/" 
   						target="_blank"
   					>
   						PDBTM
   					</a>,&nbsp;  
   					<a 
   						className="external"
   						href="http://www.mpdb.tcd.ie/" 
   						target="_blank"
   					>
   						MPDB
   					</a>,&nbsp;  
   					<br/>
   					<a 
   						className="external"
   						href="http://sbcb.bioch.ox.ac.uk/cgdb/" 
   						target="_blank"
   					>
   						CGDB
   					</a>&nbsp; 
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
		loadStats,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
