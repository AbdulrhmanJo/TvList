import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getInitialData } from "./Actions/shared";
import BeatLoader from "react-spinners/BeatLoader";
import Sidebar from "./components/sideBar";
import Navbar from "./components/Navbar";
import MoviesPage from "./components/moviesPage.js";
import "./styles/App.scss";

class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.props.dispatch(getInitialData());
  }

  componentWillReceiveProps() {
    this.setState({
      loading: false
    });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Sidebar />
          <div className="content">
            <Navbar />
            <div
              style={{
                backgroundColor: "black",
                flex: 1
              }}
            >
              {this.state.loading ? (
                <BeatLoader
                  css={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%"
                  }}
                  loading={this.state.loading}
                  size={45}
                  color={"rgb(243, 45, 88)"}
                />
              ) : (
                <div>
                  <Route exact path="/" render={() => <p>home</p>} />
                  <Route path="/movies" component={MoviesPage} />
                  <Route path="/tvshows" render={() => <p>tv shows</p>} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ movies }) => {
  return {
    movies
  };
};

export default connect(mapStateToProps)(App);
