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
                <Route
                  exact
                  path="/search"
                  render={() => (
                    <div className="fix">
                      <Navbar />
                      <Search />
                    </div>
                  )}
                />

                <Route
                  exact
                  path="/movies"
                  render={() => (
                    <>
                      <Navbar />
                      <MoviesPage />
                    </>
                  )}
                />
                <Route
                  exact
                  path="/movies/:id"
                  render={() => (
                    <div className="fix">
                      <Navbar />
                      <MoviePage />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/movies/discover/:id"
                  render={() => (
                    <div className="fix">
                      <Navbar />
                      <SectionPage />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/movies/genres/:id"
                  render={() => (
                    <div className="fix">
                      <Navbar />
                      <SectionPage />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/tv-shows"
                  render={() => (
                    <>
                      <Navbar />
                      <TVshows />
                    </>
                  )}
                />
                <Route
                  exact
                  path="/tv-shows/:id"
                  render={() => (
                    <div className="fix">
                      <Navbar />
                      <MoviePage />
                    </div>
                  )}
                />
                <Route
                  path="/tv-shows/discover/:id"
                  render={() => (
                    <div className="fix">
                      <Navbar />
                      <SectionPage />
                    </div>
                  )}
                />
                <Route
                  path="/tv-shows/genres/:id"
                  render={() => (
                    <div className="fix">
                      <Navbar />
                      <SectionPage />
                    </div>
                  )}
                />
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
