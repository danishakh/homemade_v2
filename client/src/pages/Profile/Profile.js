import React, { Component } from "react";
import API from "../../utils/API";
import "./Profile.css";
import Navbarland from "../../components/Navbarland";
import ProfileCard from "../../components/ProfileCard";
//import DishModal from "../../components/DishModal";
import Modal from "react-modal";


class Profile extends Component {

	state = {
		loggedUser: null,
		isLoading: true,
		showModal: false
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

	toggleModal = () => {
		this.setState({
			showModal: !this.state.showModal
		});
	}

	render() {

		// if (!this.state.loggedUser) {
		// 	return null;
		// }
		if (this.state.isLoading) {
			console.log('loading...');
			//return "loading page";
		}

		return (

			<div>
				<Navbarland />

				<Modal
				isOpen={this.state.showModal}
				onRequestClose={this.toggleModal}
				>

				</Modal>

				<div className="row some-space">
				</div>
				<ProfileCard />

				<div className="container ">
					<div className="row row-x">
						
							<div className="col-lg-6 col-md-6 col-sm-6">
								<div className="container edit-profile-div">
									<h3> Edit Profile </h3>


									<form id="edit-profile-form">
									  
									  <div className="form-group">
									    <label htmlFor="profile-name">Name</label>
									    <input type="text" className="form-control" id="profile-name" placeholder=""/>
									  </div>
									  <div className="form-group">
									    <label htmlFor="profile-email">Email</label>
									    <input type="email" className="form-control" id="profile-email" placeholder=""/>
									  </div>
									  <div className="form-group">
									    <label htmlFor="inputAddress">Address</label>
									    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
									  </div>
									  <div className="form-row">
									    <div className="form-group col-md-6">
									      <label htmlFor="inputCity">City</label>
									      <input type="text" className="form-control" id="inputCity"/>
									    </div>
									    <div className="form-group col-md-4">
									      <label htmlFor="inputState">State</label>
									      <select id="inputState" className="form-control">
									        <option selected>Choose...</option>
									        <option>...</option>
									      </select>
									    </div>
									    <div className="form-group col-md-2">
									      <label htmlFor="inputZip">Zip</label>
									      <input type="text" className="form-control" id="inputZip"/>
									    </div>
									  </div>
									  <div className="form-group">
									    <div className="form-check">
									      <input className="form-check-input" type="checkbox" id="gridCheck"/>
									      <label className="form-check-label" htmlFor="gridCheck">
									        Check me out
									      </label>
									    </div>
									  </div>
									  <button type="submit" className="btn btn-outline-success btn-block">Save</button>
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