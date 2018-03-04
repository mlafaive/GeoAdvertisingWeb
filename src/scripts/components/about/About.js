// import React from 'react';
import React, { Component } from 'react'
import './About.scss';

import Introduction from './introduction/Introduction.js';
import Features from './features/Features.js';
import MethodsDefinition from './methods_definition/MethodsDefinition.js';
import Precision from './precision/Precision.js';
import Classification from './classification/Classification.js';
import ComparisonExperimental from './comparison_experimental/ComparisonExperimental.js';
import ComparisonOther from './comparison_other/ComparisonOther.js';
import Topology from './topology/Topology.js';
import Acknowledgements from './acknowledgements/Acknowledgements.js';


class About extends React.Component
{
	constructor(props)
	{
		super(props);
		const { hash } = window.location;
		var new_name = hash.replace('#', '');
		if (new_name == "") {
			new_name = "introduction"
		}
		this.state = {
			current_component : new_name
		}
	}

	scrollToLocation(){

	  const { hash } = window.location;
	  if (hash !== '') {
	    let retries = 0;
	    const new_name = hash.replace('#', '');
	    const scroll = () => {
	    	console.log("attempt to show to " + new_name);
	     //  retries += 0;
	     //  if (retries > 50) return;
	     //  const element = document.getElementById(id);
	     //  if (element) {
	     //    setTimeout(() => element.scrollIntoView(), 0);
	     //  } else {
	     //    setTimeout(scroll, 100);
	     //  }


	    };
	    scroll();
	  }
	}

	changeComponent(componentName) {
	  this.setState({"current_component": componentName})
	}
	renderComponent(){

		switch(this.state.current_component) {
		    case "introduction":
		        return(<Introduction/>)
		        break;
		    case "features":
		        return(<Features/>)
		        break;
		    case "methods_definition":
		        return(<MethodsDefinition/>)
		        break;
		    case "precision":
		        return(<Precision/>)
		        break;
		    case "classification":
		        return(<Classification/>)
		        break;
		    case "comparison_experimental":
		        return(<ComparisonExperimental/>)
		        break;
		    case "comparison_other":
		        return(<ComparisonOther/>)
		        break;
		    case "topology":
		        return(<Topology/>)
		        break;
		    case "acknowledgements":
		        return(<Acknowledgements/>)
		        break;
		    default:
		        return(<Introduction/>)
		        break;
		    return(<Introduction/>)
		}
		
	}

	// () => this.displayAlert(item.email)
	render()
	{
		return(
			<div className="about">
				<div className="nav-panel">
					<a href="#introduction" onClick={() => this.changeComponent("introduction")}>Introduction</a>
					<hr/>
					<a href="#features" onClick={() => this.changeComponent("features")}>Features</a>
					<hr/>
					<a href="#methods_definition" onClick={() => this.changeComponent("methods_definition")}>Method Definition</a>
					<hr/>
					<a href="#precision" onClick={() => this.changeComponent("precision")}>Precision</a>
					<hr/>
					<a href="#classification" onClick={() => this.changeComponent("classification")}>Classification</a>
					<hr/>
					<a href="#comparison_experimental" onClick={() => this.changeComponent("comparison_experimental")}>Experimental Comparisons</a>
					<hr/>
					<a href="#comparison_other" onClick={() => this.changeComponent("comparison_other")}>Other Comparisons</a>
					<hr/>
					<a href="#topology" onClick={() => this.changeComponent("topology")}>Topology</a>
					<hr/>
					<a href="#acknowledgements" onClick={() => this.changeComponent("acknowledgements")}>Acknowledgements</a>
				</div>
				{this.renderComponent()}
			</div>
		)
	}
}

export default About;
