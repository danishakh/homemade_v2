import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import Navbarland from "../../components/Navbarland";

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
				
			</div>
		)
	}
}

export default Profile;