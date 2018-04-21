import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import API from "./utils/API";



class App extends Component {

  state = {
    loggedUser: {}
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

  render() {
    
    // if (!this.state.loggedUser) {
    //   return "loading page";
    // }

    return (
        <Router>
          <div>
            <Route exact path="/" component={Landing} />
            <Route path="/profile/" component={Profile} />
            <Route exact path="/main" component={Main} />
          </div>
        </Router>
    );
  }
}

export default App;
