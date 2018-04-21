import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import "../../bootstrap-social.css";



class Landing extends Component {

	state = {
		loggedUser: {}
	}

	render() {


		return (

			<div>
				
				
						<div className="landing-zone">
							<div className="container">
								<div className="row">
									
									<div id="intro-card" className="card-header">
										<div className="col-lg-10 col-md-10 col-sm-10">
										<h1 className="app-title">HomeMade</h1>
										<h4 className="app-desc">Do you enjoy experimenting on new dishes and getting back reviews? <br/><br/>
										Homemade allows you to easily upload your creations for others to see and pick up from you!</h4>
									</div><br/>
									 	<a href="/auth/google" className="btn btn-danger">
									    	<i className="fab fa-google-plus-g fa-2x"> Sign in with Google</i>
									 	</a>

									</div>
								    
							    </div>
						    </div>
						</div>

					
			</div>
		)
	}
}

export default Landing;