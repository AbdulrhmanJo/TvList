import React, { Component } from "react";
import { connect } from "react-redux";
import NowPlaying from "./nowPlaying";
import SecondarySection from "./SecondraySection";
import GenreSection from "./genreSection";
import TrailerSection from "./trailerSection";

class MoviesPage extends Component {
  render() {
    const { movies, genres, videos } = this.props;
    return (
      <div className="movies-content">
        <NowPlaying movies={movies.nowPlaying} genres={genres} />
        <SecondarySection name="in theaters" movies={movies.nowPlaying} />
        <SecondarySection name="Trending" movies={movies.trending} />
        <TrailerSection name="Trailers" videos={videos} />
        <SecondarySection name="Top rated" movies={movies.topRated} />
        <SecondarySection name="Most popular" movies={movies.popular} />
        <GenreSection name="genres" genres={genres} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies,
    genres: state.movies.genre,
    videos: state.movies.trailer
  };
};

export default connect(mapStateToProps)(MoviesPage);
