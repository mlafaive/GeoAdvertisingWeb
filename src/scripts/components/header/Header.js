import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.scss'

class Header extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
		this.navbar_items = [
			{
				name:"HOME",
				route:"/",
			},
			{
				name:"ABOUT OPM",
				route:"/about",
			},
			{
				name:"DOWNLOAD OPM FILES",
				route:"/download",
			},
			{
				name:"CONTACT US",
				route:"/contact",
			},
			{
				name:"PPM SERVER",
				route:"/server",
			},
			// {
			// 	name:"LIPID COMPOSITION ATLAS",
			// 	route:"/atlas",
			// },
		];
	}

	navitem(key, name, route, is_selected){
		if (is_selected) {
			return (
				<div key={key} className="selected-item">
					<strong>{name}</strong>
				</div>
			);
		}
		else {
			return (
				<div key={key} className="navbar-item">
					<Link to={route}><strong>{name}</strong></Link>
				</div>
			);
		}
	}
	navbarRender(){
		var cur_route = !this.props.hasOwnProperty('currentUrl') ? "" : this.props.currentUrl.url;
		var items = [];
		for (var i = 0; i < this.navbar_items.length; i++) {
		    var navbar_item = this.navbar_items[i];
		    items.push(this.navitem(i, navbar_item.name, navbar_item.route, cur_route === navbar_item.route));
		}
		return items;
	}

	render()
	{
		return(
			<div className="header">
				<img className="header-img" src="/images/opm-background.png" alt=""/>
				<div className="navbar">
					{this.navbarRender()}
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
  return {
		currentUrl: state.currentUrl,
	};
}

export default connect(mapStateToProps)(Header);
