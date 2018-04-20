import React, { Component } from 'react';
import API from "../../utils/API";
import "./Navbarland.css";
//import { Link } from "react-router-dom";
import Badge from "react-bootstrap/lib/Badge";



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
				//console.log(this.state.isLoggedIn);

			})
			.catch(err => console.log(err));
	}



	render() {

		return (
		  	<nav className="navbar navbar-expand-lg navbar-light bg-light">
			  	
			  	<form className="form-inline my-2 my-lg-0">
			      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
			      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
			   	</form>
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
			          			<a className="dropdown-item" href="/profile">My Profile</a>
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