import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import Navbarland from "../../components/Navbarland";
import Panel from "react-bootstrap/lib/Panel";
import { Grid, Row, Col } from "react-bootstrap";
import "./Profile.css";

class Profile extends Component {

	state = {
		loggedUser: null,
		isLoading: true
	}

	componentDidMount() {
		this.loadCurrentUser();
	}

	loadCurrentUser = () => {
		API.getCurrentUser()
			.then(user => {
				this.setState({loggedUser: user.data, isLoading: false})

			})
			.catch(err => console.log(err));
	}

	render() {

		// if (!this.state.loggedUser) {
		// 	return null;
		// }
		if (this.state.isLoading) {
			//console.log('loading');
			return "loading page";
		}

		return (

			<div>
				<Navbarland />

				<div className="row some-space">

				</div>
				<Grid>
				  	<Row className="show-grid">
				    	<Col xs={12} md={8} lg={6}>
					    	<div >
								<h1> {this.state.loggedUser.name} </h1>
							</div>
				    	</Col>
				  	</Row>
				  	<Row className="show-grid">
				    	<Col xs={12} md={8} lg={6}>
					    	<div >
								<h4> Address:  {this.state.loggedUser.address.city} </h4>
							</div>
				    	</Col>
				  	</Row>
				  	<hr />
				</Grid>

			</div>
		)
	}
}

export default Profile;