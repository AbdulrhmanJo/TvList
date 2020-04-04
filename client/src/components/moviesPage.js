import React, { Component } from "react";
import { connect } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import NowPlaying from "./nowPlaying";
import SecondarySection from "./SecondraySection";
import GenreSection from "./genreSection";
import TrailerSection from "./trailerSection";

class MoviesPage extends Component {
  render() {
    const { movies, genres, videos, loading } = this.props;
    return (
      <div className="movies-content">
        {loading ? (
          <BeatLoader
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%"
            }}
            loading={loading}
            size={45}
            color={"rgb(243, 45, 88)"}
          />
        ) : (
          <div>
            <NowPlaying movies={movies.nowPlaying} genres={genres} type={"movies"}/>
            <SecondarySection name="Now Playing" movies={movies.nowPlaying} />
            <SecondarySection name="trending" movies={movies.trending} />
            <TrailerSection name="trailers" videos={videos} />
            <SecondarySection name="popular" movies={movies.popular} />
            <SecondarySection name="top rated" movies={movies.topRated} />
            <GenreSection name="Browse by genre" genres={genres.genres} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.movies.genre === undefined,
    movies: state.movies,
    genres: state.movies.genre,
    videos: state.movies.trailer
  };
};

export default connect(mapStateToProps)(MoviesPage);
