// import React from 'react';
import React, { Component } from 'react'
import './Features.scss';
import ScrollableAnchor from 'react-scrollable-anchor'

class Features extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {}
	}


	render()
	{
		return(
			<div className="features normal-info-page">
				<h1>Features</h1>
				<hr/>
				<p>The OPM database currently includes all unique structures of transmembrane 
				protein complexes and selected monotopic, peripheral proteins and membrane-bound 
				peptides from PDB with their calculated membrane boundaries.  OPM explores 
				orientations of quaternary complexes formed by a number of interacting proteins, 
				rather than orientations of individual subunits or domains.  Different crystal 
				structures of the same protein, including mutants, conformational states, or 
				complexes with different ligands are indicated as related PDB enries. Some NMR 
				models, low-resolution structures and theoretical models are not included.</p>
				
				<p><b>Coordinate files</b> of the proteins with calculated membrane boundaries 
				are available for downloading separately for each protein or for a whole dataset.
				  The coordinate files differ from original PDB entries:</p>
			
				<ol>
					<li>The original PDB coordinates are transformed so that the calculated membrane normal coincides with the Z axis, the origin of coordinates corresponds to the middle of membrane.</li>
					<li>The calculated "IN" and "OUT" membrane boundary planes are marked as dummy atoms ("N" for IN and "O" for OUT sides) for TM and peripheral proteins, according to the topology definitions. Sign of Z coordinate is negative at the inner (IN) side and positive at the outer side.</li>
					<li>The number and names of subunits may differ from those in PDB becase many quaternary structures were taken from PQS database or generated with PISA to include all symmetric subunits in the complexes.</li>
					<li>Some missing side-chain atoms may be added, and side-chain conformers of flexible residues at the lipid-water interface may be adjusted. </li>
				</ol>
			</div>
		)
	}
}

export default Features;
