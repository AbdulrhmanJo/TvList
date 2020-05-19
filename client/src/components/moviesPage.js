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
              movies={movies.trending}
              genres={genres}
              type={"movies"}
            />
            <div style={{ padding: "0.2rem 0rem" }}>
              <SecondarySection
                name="Now Playing"
                movies={movies.nowPlaying}
                seeAll={true}
                nom={6}

              />
              <SecondarySection
                name="trending"
                movies={movies.trending}
                seeAll={true}
                nom={6}

              />
              <TrailerSection name="trailers" videos={videos} />
              <SecondarySection
                name="popular"
                movies={movies.popular}
                seeAll={true}
                nom={6}

              />
              <SecondarySection
                name="top rated"
                movies={movies.topRated}
                seeAll={true}
                nom={6}

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
