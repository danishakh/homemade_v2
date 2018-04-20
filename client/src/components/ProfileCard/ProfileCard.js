import React, { Component } from 'react';
import API from "../../utils/API";
//import "./ProfileCard.css";
//import { Link } from "react-router-dom";
import Badge from "react-bootstrap/lib/Badge";


class ProfileCard extends Component {

	state = {
		
	}

	// componentDidMount() {
	// 	this.loadCurrentUser();
	// }

	// loadCurrentUser = () => {
	// 	API.getCurrentUser()
	// 		.then(user => {
	// 			this.setState({user: user.data, isLoggedIn:true});
	// 			//console.log(this.state.isLoggedIn);

	// 		})
	// 		.catch(err => console.log(err));
	// }



	render() {

		return (
		  	<div className="container">
				<div className="row">
					<div className="col-sm-10 col-md-8 col-lg-8">
						<div className="card-header">
							<h4> Danish Akhtar <small>Points: 10hp </small></h4>
							<small> Email: danishakh@mail.com </small><br/>
							<small> Address: 3600 kariya drive, mississauga ontario</small><br/>
							<p> Dishes Uploaded: 0 </p>
						</div>
					</div>
				</div>
				<hr/>
			</div>
		)

	}


}

export default ProfileCard;