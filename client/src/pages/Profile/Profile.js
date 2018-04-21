import React, { Component } from "react";
import API from "../../utils/API";
import "./Profile.css";
import Navbarland from "../../components/Navbarland";
import ProfileCard from "../../components/ProfileCard";
import ImageUploadZone from "../../components/ImageUploadZone";
import Modal from "react-modal";
import axios from "axios";

const customModalStyle = {
	content : {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		transform: "translate(-50%, -50%)",
		width: "50%",
		height: "70%",
		padding: "2rem",
		border: "1px solid",
		borderRadius: "15px"
	}
}

class Profile extends Component {

	state = {
		loggedUser: null,
		isLoading: true,
		addressStr: "",
		dishQty: null,
		showModal: false,
		name: "",
		email: "",
		street: "",
		city: "",
		state: "",
		zip: "",
		country: "",
		profileUpdated: false
	}

	

	componentDidMount() {
		this.loadCurrentUser();
	}

	loadCurrentUser = () => {
		API.getCurrentUser()
			.then(user => {

				let address;
				let num_dishes = user.data.dishes.length;

				if (user.data.address) {
					address = user.data.address.street + ", " + user.data.address.city
					+ " " + user.data.address.state + " " + user.data.address.zip + " " 
					+ user.data.address.country;

					this.setState({
						loggedUser: user.data, 
						addressStr: address, 
						dishQty: num_dishes, 
						isLoading: false,
						name: user.data.name,
						email: user.data.email,
						street: user.data.address.street,
						city: user.data.address.city,
						state: user.data.address.state,
						zip: user.data.address.zip,
						country: user.data.address.country
					})
				}
				else {
					this.setState({
						loggedUser: user.data,  
						dishQty: num_dishes, 
						isLoading: false,
						name: user.data.name,
						email: user.data.email,
						street: user.data.address.street,
						city: user.data.address.city,
						state: user.data.address.state,
						zip: user.data.address.zip,
						country: user.data.address.country
					})
				}
				

				//console.log(user.data);

			})
			.catch(err => console.log(err));
	}

	toggleModal = () => {
		this.setState({
			showModal: !this.state.showModal
		});
	}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
		  [name]: value
		});
	};

	handleFormSubmit = event => {
	    event.preventDefault();
	    if (this.state.name && this.state.email) {

	      API.updateUser(this.state.loggedUser._id, 
	      	{
		      	name: this.state.name,
		  		email: this.state.email,
		  		address: {
		  			street: this.state.street,
					city: this.state.city,
					state: this.state.state,
					zip: this.state.zip,
					country: this.state.country
		  		}
	  		})
	      	.then(res => {
	      		this.setState({
	      			profileUpdated: true
	      		})
	      		this.loadCurrentUser();
	      		window.location.pathname="/profile/"+this.state.loggedUser._id;
	      	})
	      	.catch(err => console.log(err));
	    }
  	};

	render() {

		// if (!this.state.loggedUser) {
		// 	return null;
		// }
		if (this.state.isLoading) {
			//console.log('loading...');
			return "loading page";
		}

		return (

			<div>
				<Navbarland />


				<Modal
				isOpen={this.state.showModal}
				onAfterOpen={this.afterModalOpen}
				onRequestClose={this.toggleModal}
				contentLabel="Test Modal"
				style={customModalStyle}
				shouldCloseOnOverlayClick={true}
				>
					<div className="container">

						<div className="row">
							<ImageUploadZone />
						</div>
						<div className="row fluid">
							
							<form>
								<div className="form-group">
									<label htmlFor="dish-name">Name</label>
								    <input type="text" className="form-control" id="dish-name" placeholder=""/>
								</div>
							  	<div className="form-group">
							    	<label htmlFor="profile-desc">Email</label>
							    	<input type="email" className="form-control" id="profile-desc" placeholder=""/>
							 	</div>
								<div className="form-group">
								    <label htmlFor="dish-qty">Qty</label>
								    <input type="text" className="form-control" id="dish-qty" placeholder="1234 Main St"/>
								</div>
							</form>
						</div>

					</div>
					

					

				</Modal>

				<div className="row some-space">
				</div>
				
				<ProfileCard 
				name={this.state.loggedUser.name}
				hp={this.state.loggedUser.points}
				email={this.state.loggedUser.email}
				address={this.state.addressStr}
				dishesUploaded={this.state.dishQty}
				img={this.state.loggedUser.imgURL}
				/>

				<div className="container ">
					<div className="row row-x">
						
							<div className="col-lg-6 col-md-6 col-sm-6">
								<div className="container edit-profile-div">
									<h3> Edit Profile </h3>


									<form id="edit-profile-form">
									  
									  <div className="form-group">
									    <label htmlFor="profile-name">Name</label>
									    <input onChange={this.handleInputChange} value={this.state.name} type="text" className="form-control" name="name" placeholder=""/>
									  </div>
									  <div className="form-group">
									    <label htmlFor="profile-email">Email</label>
									    <input onChange={this.handleInputChange} value={this.state.email} type="email" className="form-control" name="email" placeholder=""/>
									  </div>
									  <div className="form-group">
									    <label htmlFor="street">Street</label>
									    <input onChange={this.handleInputChange} value={this.state.street} type="text" className="form-control" name="street" placeholder="1234 Main St"/>
									  </div>
									  <div className="form-row">
									    <div className="form-group col-md-6">
									      <label htmlFor="profile-city">City</label>
									      <input onChange={this.handleInputChange} value={this.state.city} type="text" className="form-control" name="city"/>
									    </div>
									    <div className="form-group col-md-4">
									      <label htmlFor="profile-state">State</label>
									      <input onChange={this.handleInputChange} value={this.state.state} type="text" className="form-control" name="state"/>
									    </div>
									    <div className="form-group col-md-2">
									      <label htmlFor="profile-zip">Zip</label>
									      <input onChange={this.handleInputChange} value={this.state.zip} type="text" className="form-control" name="zip"/>
									    </div>
									  </div>
									  <div className="form-group">
									    <label htmlFor="country">Country</label>
									    <input onChange={this.handleInputChange} value={this.state.country} type="text" className="form-control" name="country"/>
									  </div>
									  
									  
									  <button onClick={this.handleFormSubmit} type="submit" className="btn btn-outline-success btn-block">Save</button>
									</form>
								</div>	
							</div>	



							<div className="col-lg-6 col-md-6 col-sm-6">
								<div className="container dish-upload-div">
									<h3> My Dishes
										<button onClick={this.toggleModal} type="button" className="btn btn-outline-success btn-sm btn-add-dish"><i className="fas fa-plus fa-2x"></i></button>
									</h3> 
									<br/>
										<ul className="list-group list-group-flush pre-scrollable">
											<li className="list-group-item">
												<h5> Chicken Tikka </h5>
												<p> some long ass description about the dish here maybe? </p>
												<p> price: </p>
											</li>
											<li className="list-group-item">
												<h5> Chicken Tikka </h5>
												<p> some long ass description about the dish here maybe? </p>
												<p> price: </p>
											</li>
											<li className="list-group-item">
												<h5> Chicken Tikka </h5>
												<p> some long ass description about the dish here maybe? </p>
												<p> price:</p>
											</li>
											<li className="list-group-item">
												<h5> Chicken Tikka </h5>
												<p> some long ass description about the dish here maybe? </p>
												<p> price: </p>
											</li>
											<li className="list-group-item">
												<h5> Chicken Tikka </h5>
												<p> some long ass description about the dish here maybe? </p>
												<p> price: </p>
											</li>
											<li className="list-group-item">
												<h5> Chicken Tikka </h5>
												<p> some long ass description about the dish here maybe? </p>
												<p> price: </p>
											</li>
											<li className="list-group-item">
												<h5> Chicken Tikka </h5>
												<p> some long ass description about the dish here maybe? </p>
												<p> price: </p>
											</li>
											<li className="list-group-item">
												<h5> Chicken Tikka </h5>
												<p> some long ass description about the dish here maybe? </p>
												<p> price: </p>
											</li>
											<li className="list-group-item">
												<h5> Chicken Tikka </h5>
												<p> some long ass description about the dish here maybe? </p>
												<p> price: </p>
											</li>
										</ul>
								</div>
							</div>
										
					</div>
					
				</div>

			</div>
		)
	}
}


export default Profile;