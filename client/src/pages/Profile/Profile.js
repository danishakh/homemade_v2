import React, { Component } from "react";
import API from "../../utils/API";
import keys from "../../utils/keys";
import "./Profile.css";
import Navbarland from "../../components/Navbarland";
import ProfileCard from "../../components/ProfileCard";
import Dropzone from "react-dropzone";
//import ImageUploadZone from "../../components/ImageUploadZone";
import Modal from "react-modal";
import axios from "axios";
import superagent from "superagent"
import sha1 from "sha1";

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
		loggedUserDishes: null,
		isLoading: true,
		addressStr: "",
		showModal: false,
		name: "",
		email: "",
		street: "",
		city: "",
		state: "",
		zip: "",
		country: "",
		profileUpdated: false,
		dishName: "",
		dishDesc: "",
		dishImg: "",
		dishCat: "",
		dishSpice: "",
		dishPrice: 0,
		dishQty: 0,
		cloudImg: ""
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

	// loadUserDishes = () => {
	// 	API.getDishByUser()
	// 	.then(userDishes => {
	// 		console.log(userDishes);
	// 	})
	// }

	toggleModal = () => {
		this.setState({
			showModal: !this.state.showModal
		});
	}

	addDish = (dishObj) => {
		API.addDish(dishObj)
		.then(res => console.log("dish added"))
		.catch(err => console.log(err))
	};

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

  	handleDishSubmit = event => {
  		event.preventDefault();
  		
  		if (this.state.dishName && this.state.dishDesc && this.state.dishImg && 
  			this.state.dishPrice && this.state.dishQty && this.state.street && 
  			this.state.city) {
  			
  			this.addDish(
  			{
  				name: this.state.dishName,
  				description: this.state.description,
				imgURL: this.state.dishImg,
				category: this.state.dishCat,
				spiceLevel: this.state.dishSpice,
				quantity: this.state.dishQty,
				price: this.state.dishPrice,
				creator: this.state.loggedUser._id
  			})
  		}
  		else {
  			console.log("need all the details bro!");
  		}
  	}

  	uploadFile(files) {
		console.log('upload fired!');

		const image = files[0];
		const timestamp = Date.now()/1000;
		const paramStr = "timestamp="+timestamp+"&upload_preset="+keys.cloudinary.uploadPreset+keys.cloudinary.apiSecret;
		//encrypt our parameters
		const signature = sha1(paramStr);

		const params = {
			"api_key": keys.cloudinary.apiKey,
			"timestamp": timestamp,
			"upload_preset": keys.cloudinary.uploadPreset,
			"signature": signature
		}

		let uploadRequest = superagent.post(keys.cloudinary.uploadURL);
		uploadRequest.attach("file", image);

		Object.keys(params).forEach(key => {
			uploadRequest.field(key, params[key])
		});

		uploadRequest.end((err, resp) => {
			if (err) {
				console.log(err);
				return
			}

			
			const uploaded = resp.body.url;

			// let updatedImages = Object.assign([], this.state.images);
			// updatedImages.push(uploaded);
			
			console.log(resp.body.url);
			
			this.setState({
				cloudImg: uploaded
			})

			console.log("Upload Complete: ", resp.body);


			//props.callbackFromParent(res.body.secure_url);
		});


	}
  	// handleDropZone = dropzoneObj => {
  	// 	//console.log(dropzoneObj.secure_url);
  	// 	this.setState({
  	// 		dishImg: dropzoneObj
  	// 	});
  	// }

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
				onRequestClose={this.toggleModal}
				contentLabel="Test Modal"
				style={customModalStyle}
				shouldCloseOnOverlayClick={false}
				>
					<div className="container">
						
						<button onClick={this.toggleModal} type="button" className="btn cancel btn-outline-danger"><i className="fas fa-times"></i></button>



						<div className="row">
							<div className="image-dropzone">
								<Dropzone onDrop={this.uploadFile} />
							</div>						
						</div>



						<div className="row">
							<div className="col-lg-12 col-md-12 col-sm-12">
								<form>
									<div className="form-group">
										<label htmlFor="dish-name">Name</label>
									    <input onChange={this.handleInputChange} value={this.state.dishName} type="text" className="form-control" name="dishName" placeholder=""/>
									</div>
								  	<div className="form-group">
								    	<label htmlFor="profile-desc">Description</label>
								    	<textarea onChange={this.handleInputChange} value={this.state.dishDesc} type="text" className="form-control" name="dishDesc" placeholder=""/>
								 	</div>
									<div className="form-group">
									    <label htmlFor="dish-qty">Category</label>
									    <input onChange={this.handleInputChange} value={this.state.dishCat} type="text" className="form-control" name="dishCat"/>
									</div>
									<div className="form-group">
									    <label htmlFor="dish-qty">Spice Level</label>
									    <input onChange={this.handleInputChange} value={this.state.dishSpice} type="text" className="form-control" name="dishSpice"/>
									</div>
									<div className="form-group">
									    <label htmlFor="dish-qty">Quantity</label>
									    <input onChange={this.handleInputChange} value={this.state.dishQty} type="number" className="form-control" name="dishQty"/>
									</div>
									<div className="form-group">
									    <label htmlFor="dish-qty">Price</label>
									    <input onChange={this.handleInputChange} value={this.state.dishPrice} type="number" className="form-control" name="dishPrice"/>
									</div>
									<div className="form-group">
									    <label htmlFor="dish-qty">Image URL</label>
									    <input onChange={this.handleInputChange} value={this.state.dishImg} type="text" className="form-control" name="dishImg"/>
									</div>

									<button onClick={this.handleDishSubmit} type="submit" className="btn btn-outline-success btn-block">Add</button>
									<button onClick={this.toggleModal} type="button" className="btn btn-outline-danger btn-block">Cancel</button>
								</form>
							</div>

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
										{this.state.loggedUser.dishes.map(dish =>
											<li className="list-group-item">
												<h4>{dish.name} </h4>
												<p> {dish.description}</p>
												<p> {dish.price} </p>
											</li>
											)}
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