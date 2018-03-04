// import React from 'react';
import React, { Component } from 'react'
import './Classification.scss';
import ScrollableAnchor from 'react-scrollable-anchor'

class Classification extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {}
	}


	render()
	{
		return(
			<div className="classification-page normal-info-page">
				<h1>Classification</h1>
				<hr/>
				<p>OPM consists of quaternary complexes (biological units) 
				that are classified based on the structure of their main 
				transmembrane or membrane-associated domain. The classification 
				was built using <a href="http://scop.mrc-lmb.cam.ac.uk/scop/" target="_blank" class="external"> SCOP </a> 
				and <a href="http://www.tcdb.org/" target="_blank" class="external"> TCDB </a>, but it 
				differs from both systems in certain aspects. There are four levels of 
				hierarchy in the classification:</p>

				<ol>
				    <li><b>Type</b>: transmembrane proteins, monotopic/peripheral proteins, or membrane-active peptides.</li>
				    <li><b>Class</b>: all-α, all-β, α+β, α/β, or nonregular proteins.</li>
				    <li><b>Superfamily</b>: evolutionarily related proteins with superimposable 3D structures.</li>
				    <li><b>Family</b>: proteins with detectable sequence homology.</li>
				</ol>

				<p>OPM allows sorting of membrane proteins by hydrophobic thicknesses,
				 tilt angles, destination membranes, number of transmembrane helices or 
				 subunits, structural family and superfamily, or biological source.</p>
			</div>
		)
	}
}

export default Classification;
