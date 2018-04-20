import React, { Component } from "react";
import "./DishCard.css";

const DishCard = props => (
            <div className="card" id={props.id}>
			  	<img className="card-img-top" src={ props.imageURL } alt={ props.name } />
			  
			  <div className="card-body">
			    <h4 className="card-title">{ props.name }</h4>
			    <p className="card-text">{ props.description }</p>
			    <p className="card-text">${ props.price }</p>
			    <button onClick={()=>props.addToCart(props.id)} className="btn btn-primary">Add to Cart</button>
			  </div>
			</div>
);

export default DishCard;