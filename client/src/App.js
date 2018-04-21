import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import Checkout from "./pages/Checkout";
import API from "./utils/API";



class App extends Component {

  constructor() {
    super();

    this.state = {
      loggedUser: {},
      shoppingCart: []
    }

    this.handleCart = this.handleCart.bind(this);
  }
  

  componentDidMount() {
    this.loadCurrentUser();
    console.log('loaded');
  }

  loadCurrentUser = () => {
    API.getCurrentUser()
      .then(user => {
        this.setState({loggedUser: user.data})
        //console.log(user.data);
      })
      .catch(err => console.log(err));
  }

  handleCart = (cart) => {
    console.log('here');
    console.log(cart);
    this.setState({
      shoppingCart: cart
    })
  }

  render() {
    
    // if (!this.state.loggedUser) {
    //   return "loading page";
    // }

    return (
        <Router>
          <div>
            <Route exact path="/" component={Landing} />
            <Route path="/profile/" component={Profile} />
            <Route exact path="/main" component={Main} callBack={this.handleCart}/>
            <Route exact path="/checkout" component={Checkout} />
          </div>
        </Router>
    );
  }
}

export default App;
