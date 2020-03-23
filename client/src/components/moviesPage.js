import React, { Component } from "react";
import { connect } from "react-redux";
import NowPlaying from "./nowPlaying";
import SecondarySection from "./SecondraySection";

class MoviesPage extends Component {
  render() {
    const { movies, genres } = this.props;

    return (
      <div className="movies-content">
        <NowPlaying movies={movies.nowPlaying} genres={genres} />
        <SecondarySection name="in theaters" movies={movies.nowPlaying} />
        <SecondarySection name="Trending" movies={movies.trending} />
        <SecondarySection name="Top rated" movies={movies.topRated} />
        <SecondarySection name="Most popular" movies={movies.popular} />
        {/* <SecondarySection name="Coming soon" movies={movies.upComing} /> */}
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
