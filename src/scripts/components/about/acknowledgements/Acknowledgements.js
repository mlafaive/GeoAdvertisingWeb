// import React from 'react';
import React, { Component } from 'react'
import './Acknowledgements.scss';
import ScrollableAnchor from 'react-scrollable-anchor'

class Acknowledgements extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {}
	}


	render()
	{
		return(
			<div className="acknowledgements normal-info-page">
			<h1>Acknowledgements</h1>
			<hr/>
			<p>OPM was developed using the following databases and servers:</p>
			<ul>
				<li><a href="http://www.rcsb.org/pdb/" target="_blank" class="external">PDB</a>, Protein Data Bank</li>
				<li><a href="http://scop.mrc-lmb.cam.ac.uk/scop/" target="_blank" class="external">SCOP</a>, Structural Classification Of Proteins</li>
				<li><a href="http://pqs.ebi.ac.uk/" target="_blank" class="external">PQS</a>, Protein Quaternary Structure server </li>
				<li><a href="http://www.ebi.ac.uk/msd-srv/ssm/" target="_blank" class="external">SSM</a>, Secondary Structure Matching server</li>
				<li><a href="http://www.pir.uniprot.org/" target="_blank" class="external">UniProt</a>, Universal Protein resource</li>
				<li><a href="http://pfam.wustl.edu/" target="_blank" class="external">Pfam</a>, Protein Families database</li>
				<li><a href="http://blanco.biomol.uci.edu/mptopo/" target="_blank" class="external">MPtopo</a>, Membrane Protein Topology database</li>
				<li><a href="http://bioinfo.si.hirosaki-u.ac.jp/~TMPDB/" target="_blank" class="external">TMPDB</a>, collection of TM proteins in PDB</li>
				<li><a href="http://pdbtm.enzim.hu/" target="_blank" class="external">PDBTM</a>, collection of TM proteins in PDB</li>
				<li><a href="http://www.tcdb.org/" target="_blank" class="external">TCDB</a>, Transport Classification Database</li>
			</ul>
			<p>We are grateful to Dr. Henry I. Mosberg for scientific and administrative support, 
			Drs. Aleksey Murzin and Kim Henrick for discussion of protein evolution and quaternary 
			structure, Drs. Eugene Krissinel and Gabor Tusnady for helpful explanations of SSM and 
			PDB_TM, and Drs. Simon Hubbard, Vladimir Maiorov, and Simon Sherman for provided software.</p>
			</div>
		);
	}
}

export default Acknowledgements;
