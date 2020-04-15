import React, { Component } from "react";
import { connect } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import NowPlaying from "./nowPlaying";
import SecondarySection from "./SecondraySection";
import GenreSection from "./genreSection";
import TrailerSection from "./trailerSection";
import NetworkSection from "./networkSection";
class TVshows extends Component {
  render() {
    const { tvshows, genres, loading, videos, networks } = this.props;
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
            <NowPlaying movies={tvshows.onTV} genres={genres} type={"tv"} />
            <div style={{ padding: "2.5rem 7rem" }}>
              <SecondarySection name="On TV" movies={tvshows.onTV} />
              <NetworkSection
                name="Browse by service"
                networks={tvshows.networks}
              />
              <SecondarySection name="Trending" movies={tvshows.trending} />
              <TrailerSection name="Trailers" videos={videos} />
              <SecondarySection name="Popular" movies={tvshows.popular} />
              <SecondarySection name="Top rated" movies={tvshows.topRated} />
              <GenreSection name="Browse by genre" genres={genre} />Î
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.tvshows.networks === undefined,
    tvshows: state.tvshows,
    genres: state.tvshows.genre,
    videos: state.tvshows.trailer,
    networks: state.tvshows.networks
  };
};

export default connect(mapStateToProps)(TVshows);
