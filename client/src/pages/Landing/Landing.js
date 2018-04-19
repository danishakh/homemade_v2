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
				
				<div className="row">
					<div className="landing-zone">
						<div className="col-sm-6">
							<div id="intro-card" className="card">
								<div className="card-body text-center">
									<h1>Welcome to HomeMade</h1>
									<p> Some description and info about the app here</p>
								</div>
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