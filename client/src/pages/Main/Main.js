import React, { Component } from 'react';
import Navbarland from "../../components/Navbarland";
import DishCard from "../../components/DishCard";
import API from "../../utils/API.js";
import "./Main.css";
import Modal from "react-modal";

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

class Main extends Component {

	state = {
        dishes: [],
        loggedUser: {},
        shoppingCart: [],
        isLoading: true,
        showModal: false,

	}

    componentDidMount() {
        this.loadDishes();
        this.loadCurrentUser();
    }

    loadDishes = () => {
        API.getDishes()
            .then(res =>
                this.setState({ dishes: res.data, isLoading: false })
            )
            .catch(err => console.log(err));
    };

    loadCurrentUser = () => {
        API.getCurrentUser()
            .then(user => {
                this.setState({loggedUser: user.data})
            })
            .catch(err => console.log(err));
    }
	
	handleInputChange = event => {
		const { name, value } = event.target;
	    this.setState({
	      [name]: value
	    });
	}

    updateShoppingCart = (id) => {
        //console.log(id);
        let objToAdd = {}
        API.getDish(id)
            .then(res => {
                objToAdd = res.data;
                objToAdd.orderQty = 0;
                objToAdd.orderQty++;
                if (this.state.shoppingCart.length === 0) {
                    this.setState({
                        shoppingCart: [objToAdd]
                    })

                }
                else {
                    this.setState({
                        shoppingCart: [...this.state.shoppingCart, objToAdd]
                    })
                }

                console.log(this.state);
                this.props.callBack(this.state.shoppingCart);

            })
            .catch(err => console.log(err));
    }

    render() {
        
        if (this.state.isLoading) {
            //console.log('loading...');
            return "loading page";
        }

        return (
            <div>
                {this.state.shoppingCart.length > 0 ? (
                    <Navbarland  shoppingCartLength={this.state.shoppingCart.length}/>      
                ) : (
                    <Navbarland />
                )}
                <div className="container card-wrapper">

                    <div className="row justify-content-center">
                        
                            {this.state.dishes.map(dish => (
                                <DishCard 
                                    id={dish._id}
                                    key={dish._id}
                                    name={dish.name}
                                    description={dish.description}
                                    imageURL={dish.imgURL}
                                    price={dish.price}
                                    quantity={dish.quantity}
                                    addToCart={this.updateShoppingCart}
                                />
                            ))}
                        
                    </div> 
                </div>  

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
                
            </div>

        );
    }
    
}

export default Main;