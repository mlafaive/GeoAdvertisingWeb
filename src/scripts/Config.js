import React from 'react';

import { Link } from 'react-router-dom';

import PDBLink from './components/table/pdb_link/PDBLink.js';

// if I wanted to configure the anchor tags
// import { configureAnchors } from 'react-scrollable-anchor'
// configureAnchors({offset: -60, scrollDuration: 200})


const Config = {
	columns: {
		default: [
			{
				Header: () => <div className="header-cell" title="Family">
								<div>Family</div>
							</div>,
				id: "family_name_cache",
				Cell: row => <div className="cell" title={row.family_name_cache}>
								<div>
									<Link to={"/families/" + row.family_id}>{row.family_name_cache}</Link>
								</div>
							</div>
			},
			{
				Header: () => <div className="header-cell" title="Protein Name">
								<div>Protein Name</div>
							</div>,
				id: "name",
				Cell: row => <div className="cell">
								<div>
									<PDBLink 
										id={row.id} 
										name={row.name} 
										pdb={row.pdbid}
										cell={row.name}
										onImgChange={row.onImgChange}
									/>	
								</div>
							</div>

			},
			{
				Header: () => <div className="header-cell" title="PDB ID">
								<div>PDB ID</div>
							</div>,
				width: 40,
				id: "pdbid",
				Cell: row => <div className="cell">
								<div>
									<PDBLink 
										id={row.id} 
										name={row.name} 
										pdb={row.pdbid}
										cell={row.pdbid}
										onImgChange={row.onImgChange}
									/>
								</div>
							</div>
			},
			{
				Header: () => <div className="header-cell" title="Species">
								<div>Species</div>
							</div>,
				id: 'species_name_cache',
				Cell: row => <div className="cell" title={row.species_name_cache}>
								<div>
									<Link to={"/species/" + row.species_id}>
										<i>{row.species_name_cache}</i>
									</Link>
								</div>
							</div>
			},
			{
				Header: () => <div className="header-cell" title="Localization">
								<div>Localization</div>
							</div>,
				accessor: '',
				id: 'membrane_name_cache',
				Cell: row => <div className="cell" title={row.membrane_name_cache}>
								<div>
									<Link to={"/localizations/" + row.membrane_id}>
										{row.membrane_name_cache}
									</Link>
								</div>
							</div>
			},
			{
				Header: () => <div className="header-cell" title="Number of Subunits">
								<div>Num. Subunits</div>
							</div>,
				width: 65,
				id: 'subunit_segments',
				Cell: row => <div className="cell">
								<div>{row.subunit_segments}</div>
							</div>
			},
			{
				Header: () => <div className="header-cell" title="Number TM. Secondary Structures">
								<div>Num. TM. Sec. Structs.</div>
							</div>,
				width: 75,
				id: 'secondary_representations_count',
				Cell: row => <div className="cell">
								<div>{row.secondary_representations_count}</div>
							</div>
			},
			{
				Header: () => <div className="header-cell" title="Hydrophobic Thickness or Depth (Å)">
								<div>Hydrophobic Thickness or Depth (Å)</div>
							</div>,
				width: 90,
				id: 'thickness',
				Cell: row => <div className="cell">
								<div>
									{
										row.hasOwnProperty("thickness") && row.thickness !== null &&
										row.hasOwnProperty("thicknesserror") && row.thicknesserror !== null ? 
										(row.thickness + " ± " + row.thicknesserror) : 
										"---"
									}
								</div>
							</div>
			},
			{
				Header: () => <div className="header-cell" title="Tilt Angle (°)">
								<div>Tilt Angle (°)</div>
							</div>,
				width: 60,
				id: 'tilt',
				Cell: row => <div className="cell">
								<div>
									{
										row.hasOwnProperty("tilt") && row.tilt !== null &&
										row.hasOwnProperty("tilterror") && row.tilterror !== null ? 
										(row.tilt + " ± " + row.tilterror) : 
										"---"
									}
								</div>
							</div>
			},
			{
				Header: () => <div className="header-cell" title="ΔG (transfer) (kcal/mol)">
								<div>
									<span>ΔG<sub>transfer</sub><br/>(kcal/mol)</span>
								</div>
							</div>,
				width: 70,
				id: 'gibbs',
				Cell: row => <div className="cell">
								<div>
									{
										row.gibbs !== null ?
										(row.gibbs) : 
										"---"
									}
								</div>
							</div>
			},
		],
	},
	classifications: [
		"types",
		"classes",
		"superfamilies",
		"families",
		"species",
		"localizations",
		"proteins"
	],
	classification: {
		types: {
			api: {
				route: "/types",
				accessor: {
					object: "type",
					count: "types_count",
				},
			},
			child: "classes",
		},
		classes: {
			api: {
				route: "/classtypes",
				accessor: {
					object: "classtype",
					count: "classtypes_count",
				},
			},
			parents: [
				"types"
			],
			child: "superfamilies",
		},
		superfamilies: {
			api: {
				route: "/superfamilies",
				accessor: {
					object: "superfamily",
					count: "superfamilies_count",
				},
			},
			parents: [
				"classes",
			],
			child: "families",
			tcdb: (tcdb_id) => {
				return "http://www.tcdb.org/search/result.php?tc=" + tcdb_id
			},
			pfam: (pfam_id) => {
				if (pfam_id[0] === 'C' && pfam_id[1] === 'L') { 
					return "http://pfam.xfam.org/clan/" + pfam_id;
				}
				else {
					return "http://pfam.xfam.org/family/" + pfam_id;
				}

			}
		},
		families: {
			api: {
				route: "/families",
				accessor: {
					object: "family",
					count: "families_count",
				},
			},
			parents: [
				"superfamilies",
			],
			child: "proteins",
			tcdb: (tcdb_id) => {
				return "http://www.tcdb.org/search/result.php?tc=" + tcdb_id
			},
			pfam: (pfam_id) => {
				if (pfam_id[0] === 'C' && pfam_id[1] === 'L') { 
					return "http://pfam.xfam.org/clan/" + pfam_id;
				}
				else {
					return "http://pfam.xfam.org/family/" + pfam_id;
				}

			},
			pdb: (pfam_id) => {
				return "http://www.ebi.ac.uk/thornton-srv/databases/cgi-bin/pdbsum/GetPfamStr.pl?pfam_id=" + pfam_id;
			}
		},
		species: {
			api: {
				route: "/species",
				accessor: {
					object: "species",
					count: "species_count",
				},
			},
			parents: [],
			child: "proteins",
		},
		localizations: { // aka membranes
			api: {
				route: "/membranes",
				accessor: {
					object: "membrane",
					count: "membranes_count",
				},
			},
			parents: [],
			child: "proteins",
		},
		proteins: {
			api: {
				route: "/primary_structures",
				accessor: {
					object: "primary_structure",
					count: "primary_structures_count",
				},
			},
			parents: [
				"families",
				"localizations",
				"species",
			],
			pdbsum: (pdb_id) => {
				return "http://www.ebi.ac.uk/thornton-srv/databases/cgi-bin/pdbsum/GetPage.pl?pdbcode=" + pdb_id;
			},
			pdb: (pdb_id) => {
				return "https://www.rcsb.org/structure/" + pdb_id;
			},
			scop: (pdb_id) => {
				return "http://scop.mrc-lmb.cam.ac.uk/scop/pdb.cgi?disp=scop&id=" + pdb_id;
			},
			msd: (pdb_id) => {
				return "http://www.ebi.ac.uk/pdbe-srv/view/entry/" + pdb_id +"/summary.html";
			},
			oca: (pdb_id) => {
				return "http://bip.weizmann.ac.il/oca-bin/ocashort?id=" + pdb_id;
			},
			mmdb: (pdb_id) => {
				return "http://www.ncbi.nlm.nih.gov/Structure/mmdb/mmdbsrv.cgi?uid=" + pdb_id;
			},

		},
	},
	baseUrl: "https://lomize-group-opm.herokuapp.com",
	pdb_image: (pdb_id) => {
		return "https://storage.googleapis.com/opm-assets/images/pdb/" + pdb_id + ".png"
	},
	pdb_file: (pdb_id) => {
		return "https://storage.googleapis.com/opm-assets/pdb/" + pdb_id + ".pdb"
	},
	no_image: '/images/pdb_fallback.png',
	loading_image: '/images/loading.gif',
	loading_image_small: '/images/loading_small.gif',
	pics: {
		adrei: "https://storage.googleapis.com/opm-assets/images/portraits/andrei_lomize.jpg",
		irina: "https://storage.googleapis.com/opm-assets/images/portraits/irina_pogozheva.jpg"
	},
	topology: "https://storage.googleapis.com/opm-assets/images/bio_assets/topology.gif",
}

export default Config;

