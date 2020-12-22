import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Sidebar from "./components/sideBar";
import Navbar from "./components/Navbar";
import MoviesPage from "./components/moviesPage.js";
import TVshows from "./components/tvshowsPage.js";
import SectionPage from "./components/sectionPage";
import MoviePage from "./components/moviePage";
import Search from "./components/Search";
import { handleInitialData } from "./Actions/shared";
import BeatLoader from "react-spinners/BeatLoader";
import Home from "./components/home";
import "./styles/App.scss";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { loading } = this.props;
    return (
      <Router>
        <div className="container">
          <Sidebar />
          <div className="content">
            {loading ? (
              <BeatLoader
                css={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
                loading={loading}
                size={45}
                color={"rgb(243, 45, 88)"}
              />
            ) : (
              <div className="routes">
                <Route exact path="/" component={Home} />
                <Route exact path="/search" component={Search} />

                <Route exact path="/movies" component={MoviesPage} />
                <Route exact path="/movies/:id" component={MoviePage} />
                <Route
                  exact
                  path="/movies/discover/:id"
                  component={SectionPage}
                />
                <Route
                  exact
                  path="/movies/genres/:id"
                  component={SectionPage}
                />
                <Route exact path="/tv-shows" component={TVshows} />
                <Route exact path="/tv-shows/:id" component={MoviePage} />
                <Route path="/tv-shows/discover/:id" component={SectionPage} />
                <Route path="/tv-shows/genres/:id" component={SectionPage} />
              </div>
            )}
          </div>
        </div>
      </Router>
    );
  }
}

export default connect((state) => {
  return {
    loading: state.tvshows.genre === undefined,
  };
})(App);
