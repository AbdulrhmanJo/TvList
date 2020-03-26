import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Sidebar from "./components/sideBar";
import Navbar from "./components/Navbar";
import MoviesPage from "./components/moviesPage.js";
import "./styles/App.scss";
import sectionPage from "./components/sectionPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Sidebar />
          <div className="content">
            <Navbar />
            <div
              style={{
                backgroundColor: "#030303",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent:'center'
              }}
            >
              <div>
                <Route exact path="/" render={() => <p>home</p>} />
                <Route exact path="/movies" component={MoviesPage} />
                <Route exact path="/tvshows" render={() => <p>tv shows</p>} />
                <Route path="/movies/:id" component={sectionPage} />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
