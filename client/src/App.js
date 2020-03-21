import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getInitialData } from "./Actions/shared";
import Sidebar from "./components/sideBar";
import Navbar from "./components/Navbar";

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
                backgroundColor: "#f2f2f2",
                flex: 1
              }}
            >
              <Route exact path="/" render={() => <p>home</p>} />
              <Route path="/movies" render={() => <p>movies</p>} />
              <Route path="/tvshows" render={() => <p>tv shows</p>} />
              {/* {this.state.loading ? <h1>loading...</h1> : <h1>done</h1>} */}
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
