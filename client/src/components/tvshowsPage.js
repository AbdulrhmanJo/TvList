import React, { Component } from "react";
import { connect } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import NowPlaying from "./nowPlaying";
import SecondarySection from "./SecondraySection";

class TVshows extends Component {
  render() {
    const { tvshows, genres, loading } = this.props;    
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
            <NowPlaying movies={tvshows.onTV} genres={genres} type={"tv"}/>
            {/* <SecondarySection name="popular" movies={tvshows.popular} /> */}
            {/* <SecondarySection name="Now Playing" movies={movies.nowPlaying} /> */}
            {/* <SecondarySection name="trending" movies={movies.trending} /> */}
            {/* <TrailerSection name="trailers" videos={videos} /> */}
            {/* <SecondarySection name="top rated" movies={movies.topRated} /> */}
            {/* <GenreSection name="genres" genres={genres} />Î */}
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
