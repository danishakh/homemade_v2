import React, { Component } from 'react';
import API from "../../utils/API";
import "./ProfileCard.css";
//import { Link } from "react-router-dom";
import Badge from "react-bootstrap/lib/Badge";


const ProfileCard = props => (

	  	<div className="container">
			<div className="row">
				<div className="col-sm-10 col-md-8 col-lg-8">
					<div className="card-header">
						<img src={props.img} className="rounded-circle" style={{float:'left'}} />
						<h4> {props.name} <small style={{float:'right'}}>{props.hp} HP </small></h4>
						<small> Email: {props.email} </small><br/>
						<small> Address: {props.address} </small><br/>
						<p> Dishes Uploaded: {props.dishesUploaded} </p>
					</div>
				</div>
			</div>
			<hr/>
		</div>

)



export default ProfileCard;