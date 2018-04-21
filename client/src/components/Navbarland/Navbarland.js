import React, { Component } from 'react';
import API from "../../utils/API";
import "./Navbarland.css";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/lib/Badge";
import Navbar from "react-bootstrap/lib/Navbar";
import NavbarHeader from "react-bootstrap/lib/NavbarHeader";
import NavbarBrand from "react-bootstrap/lib/NavbarBrand";
import NavbarToggle from "react-bootstrap/lib/NavbarToggle";
import NavbarCollapse from "react-bootstrap/lib/NavbarCollapse";
//import NavbarForm from "react-bootstrap/lib/NavbarForm";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";


class Navbarland extends Component {

	state = {
		user: {},
		isLoggedIn: false,
	}

	componentDidMount() {
		this.loadCurrentUser();
	}

	loadCurrentUser = () => {
		API.getCurrentUser()
			.then(user => {
				this.setState({user: user.data, isLoggedIn:true});
				//console.log('here');
				//console.log(this.state.user);

			})
			.catch(err => console.log(err));
	}



	render() {

		return (
		  	<nav className="navbar navbar-expand-lg navbar-light bg-light">
			  	
			  	
			   	<a className="navbar-brand" href="/main">HomeMade</a>
			  	<div className="collapse navbar-collapse" id="navbarSupportedContent">
			    	<ul className="navbar-nav ml-auto">
			      		<li className="nav-item">
			       	 		<a className="nav-link" href="#"><i className="fas fa-shopping-cart fa-2x"><Badge>{this.props.shoppingCartLength}</Badge></i></a>
			      		</li>
			      		<li className="nav-item dropdown">
			        		<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			          			<i className="fas fa-user fa-2x"></i>
			        		</a>
			        		<div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
			          			<Link to={`/profile/${this.state.user._id}`} className="dropdown-item">My Profile</Link>
			          			<a className="dropdown-item" href="#">Order History</a>
			          			<div className="dropdown-divider"></div>
			          			<a className="dropdown-item" href="/auth/logout">Logout</a>
			        		</div>
			      		</li>
			      	</ul>  
			  	</div>
			</nav>

		
		)

	}


}

export default Navbarland;