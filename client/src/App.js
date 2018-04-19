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
        <Router>
          <div>
            <Route exact path="/" component={Landing} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/main" component={Main} />
          </div>
        </Router>
    );
  }
}

export default App;
