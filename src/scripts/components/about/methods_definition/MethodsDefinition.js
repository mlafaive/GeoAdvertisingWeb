// import React from 'react';
import React, { Component } from 'react'
import './MethodsDefinition.scss';
import ScrollableAnchor from 'react-scrollable-anchor'

class MethodsDefinition extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {}
	}


	render()
	{
		return(
			<div className="methods-definition normal-info-page">
				<h1>Topology Definitions</h1>
				<hr/>
			</div>
		)
	}
}

export default MethodsDefinition;
