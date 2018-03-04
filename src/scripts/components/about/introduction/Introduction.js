// import React from 'react';
import React, { Component } from 'react'
import './Introduction.scss';
import ScrollableAnchor from 'react-scrollable-anchor'

class Introduction extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {}
	}


	render()
	{
		return(
			<div className="introduction normal-info-page">
				<h1>Topology Definitions</h1>
				<hr/>
			</div>
		)
	}
}

export default Introduction;
