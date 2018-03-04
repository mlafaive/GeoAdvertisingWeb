// import React from 'react';
import React, { Component } from 'react'
import './Topology.scss';
import ScrollableAnchor from 'react-scrollable-anchor'

class Topology extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {}
	}


	render()
	{
		return(
			<div className="topology normal-info-page">
				<h1>Topology Definitions</h1>
				<hr/>
				<p>Topologies of proteins are taken from publications or UniProt</p>
				<div><b>&nbsp;</b></div>
				<div><b>Definitions of inner and outer membrane sides in OPM</b> </div>
				<div>&nbsp;</div>
				<p><u>Plasma membrane</u>: IN – cytoplasmic, OUT – extracellular;</p>
				<p><u>Endoplasmic reticulum, Golgi, nuclear, peroxisome, endosome, vacuole, and vesicle membranes</u>: IN – cytoplasmic, OUT – luminal; </p>
				<p><u>Outer mitochondrial, chloroplast or nuclear membrane</u>: IN – cytoplasmic, OUT – intermembrane space; </p>
				<p><u>Inner nuclear membrane</u>: IN – lumen, OUT – perinuclear space; </p>
				<p><u>Inner mitochondrial or chloroplast membrane</u>: IN – matrix/stroma, OUT –intermembrane space; </p>
				<p><u>Chloroplast thylakoid membrane</u>: IN- stromal, OUT – thylakoid space. </p>
				<p><u>Inner bacterial membrane</u>: IN – cytoplasmic, OUT – periplasmic or extracellular space; </p>
				<p><u>Outer bacterial membrane</u>: IN – periplasmic space, OUT – extracellular; </p>
			</div>
		)
	}
}

export default Topology;
