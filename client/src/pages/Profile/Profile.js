import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import Navbarland from "../../components/Navbarland";
import Panel from "react-bootstrap/lib/Panel";
import { Grid, Row, Col } from "react-bootstrap";
import "./Profile.css";

class Profile extends Component {

	state = {
		loggedUser: {}
	}

	componentDidMount() {
		this.loadCurrentUser();
	}

	loadCurrentUser = () => {
		API.getCurrentUser()
			.then(user => {
				this.setState({loggedUser: user.data})
			})
			.catch(err => console.log(err));
	}

	render() {
		//const { classes } = props;

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
				  	<hr />
				</Grid>

			</div>
		)
	}
}

export default Profile;