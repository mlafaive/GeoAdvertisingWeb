import React from 'react';

import ImgWrapper from '../img_wrapper/ImgWrapper.js';

import Config from '../../Config.js';

import './Contact.scss';

class Contact extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
	}


	render()
	{
		return(
			<div className="contact">
				<div className="page-header">
					Contact Us
				</div>
				<div className="body-header">
					For OPM data related questions
				</div>
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-6 centered contact-sect">
							<ImgWrapper 
								src={Config.pics.adrei}
								className="contact-img"
							/>
							<p className="contact-info centered">
								<a href="http://mosberglab.phar.umich.edu/people/AndreiLLomize.php">
									Andrei L. Lomize
								</a>
								, PhD
							</p>
							<p className="contact-info centered">
								Research Scientist
							</p>
							<p className="contact-info centered">
								Room 4056
							</p>
							<p className="contact-info centered">
								College of Pharmacy
							</p>
							<p className="contact-info centered">
								University of Michigan
							</p>
							<p className="contact-info centered">
								Ann Arbor, MI 48109, USA
							</p>
							<p className="contact-info centered">
								734-615-7194 (Office)
							</p>
							<p className="contact-info centered">
								almz at umich.edu
							</p>
						</div>
						<div className="col-sm-6 centered contact-sect">
							<ImgWrapper 
								src={Config.pics.irina}
								className="contact-img"
							/>
							<p className="contact-info centered">
								<a href="http://mosberglab.phar.umich.edu/people/IrinaDPogozheva.php">
									Irina D. Pogozheva
								</a>
								, PhD
							</p>
							<p className="contact-info centered">
								Associate Research Scientist
							</p>
							<p className="contact-info centered">
								Room 3548 C.C. Little
							</p>
							<p className="contact-info centered">
								College of Pharmacy
							</p>
							<p className="contact-info centered">
								University of Michigan
							</p>
							<p className="contact-info centered">
								Ann Arbor, MI 48109, USA
							</p>
							<p className="contact-info centered">
								734-647-5825 (Office)
							</p>
							<p className="contact-info centered">
								irinap at umich.edu
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Contact;
