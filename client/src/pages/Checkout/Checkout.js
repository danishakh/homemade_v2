import React, { Component } from "react";
import { Link } from "react-router-dom";
//import "./Checkout.css";
import "../../bootstrap-social.css";
import API from "../../utils/API.js";
import Navbarland from "../../components/Navbarland";



class Checkout extends Component {

	state = {
        loggedUser: {},
        shoppingCart: [],
        isLoading: true
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


		return (

			<div>
				<div>
                {this.state.shoppingCart.length > 0 ? (
                    <Navbarland  shoppingCartLength={this.state.shoppingCart.length}/>      
                ) : (
                    <Navbarland />
                )}
                
            	</div>	

            	<div className="">
            	</div>
				
			</div>
		)
	}
}

export default Checkout;