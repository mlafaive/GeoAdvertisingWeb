// import React from 'react';
import React, { Component } from 'react'
import './ComparisonOther.scss';
import ScrollableAnchor from 'react-scrollable-anchor'

class ComparisonOther extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {}
	}


	render()
	{
		return(
			<div className="comparison-other normal-info-page">
				<h1>Topology Definitions</h1>
				<hr/>
			</div>
		)
	}
}

export default ComparisonOther;
