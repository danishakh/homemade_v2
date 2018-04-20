import React, { Component } from 'react';
import Navbarland from "../../components/Navbarland";
import DishCard from "../../components/DishCard";
import API from "../../utils/API.js";

class Main extends Component {

	state = {
        dishes: [],
        loggedUser: {},
        shoppingCart: []
	}

    componentDidMount() {
        this.loadDishes();
        this.loadCurrentUser();
    }

    loadDishes = () => {
        API.getDishes()
            .then(res =>
                this.setState({ dishes: res.data })
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
                objToAdd.orderQty = 3;
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

            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                {this.state.shoppingCart.length > 0 ? (
                    <Navbarland  shoppingCartLength={this.state.shoppingCart.length}/>      
                ) : (
                    <Navbarland />
                )}
                <div className="row">
                    <div className="col-lg-6">
                        <h1>Browse Dishes</h1>
                    </div>    
                </div>

                <div className="row justify-content-center">
                    
                        {this.state.dishes.map(dish => (
                            <DishCard 
                                id={dish._id}
                                key={dish._id}
                                name={dish.name}
                                description={dish.description}
                                imageURL={dish.imageURL[0]}
                                price={dish.price}
                                quantity={dish.quantity}
                                addToCart={this.updateShoppingCart}
                            />
                        ))}
                    
                </div>   
                
            </div>

        );
    }
    
}

export default Main;