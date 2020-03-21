import React, { Component } from "react";
import { connect } from "react-redux";
import NowPlaying from "./nowPlaying";

class MoviesPage extends Component {
  render() {
    const { movies, genres } = this.props;
    return (
      <div className="movies-content">
        <NowPlaying movies={movies.nowPlaying} genres={genres} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies,
    genres: state.movies.genre
  };
};

export default connect(mapStateToProps)(MoviesPage);
