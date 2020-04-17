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
            <NowPlaying
              movies={movies.nowPlaying}
              genres={genres}
              type={"movies"}
            />
            <div style={{ padding: "2.5rem 7rem" }}>
              <SecondarySection
                name="Now Playing"
                movies={movies.nowPlaying}
                seeAll={true}
              />
              <SecondarySection
                name="trending"
                movies={movies.trending}
                seeAll={true}
              />
              <TrailerSection name="trailers" videos={videos} />
              <SecondarySection
                name="popular"
                movies={movies.popular}
                seeAll={true}
              />
              <SecondarySection
                name="top rated"
                movies={movies.topRated}
                seeAll={true}
              />
              <GenreSection name="Browse by genre" genres={genres.genres} />
            </div>
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
