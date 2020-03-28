import React, { Component } from "react";
import { connect } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import NowPlaying from "./nowPlaying";
import SecondarySection from "./SecondraySection";
import GenreSection from "./genreSection";
class TVshows extends Component {
  render() {
    const { tvshows, genres, loading } = this.props;
    const genre = genres.genres.filter(
      genre =>
        genre.name !== "Talk" && genre.name !== "Soap" && genre.name !== "News"
    );
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
            <NowPlaying movies={tvshows.trending} genres={genres} type={"tv"} />
            <SecondarySection name="On TV" movies={tvshows.onTV} />
            <SecondarySection name="trending" movies={tvshows.trending} />
            <SecondarySection name="popular" movies={tvshows.popular} />
            <SecondarySection name="top rated" movies={tvshows.topRated} />
            <GenreSection name="genres" genres={genre} />Î
            {/* <SecondarySection name="Now Playing" movies={movies.nowPlaying} /> */}
            {/* <TrailerSection name="trailers" videos={videos} /> */}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.tvshows.genres === undefined,
    tvshows: state.tvshows,
    genres: state.tvshows.genres
  };
};

export default connect(mapStateToProps)(TVshows);
