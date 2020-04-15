import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getMovieDetails } from "../utils/API";
import BeatLoader from "react-spinners/BeatLoader";
import { GoPrimitiveDot } from "react-icons/go";
import ReactPlayer from "react-player";
import CastSection from "./castSection";
import SecondarySection from "./SecondraySection";
class MoviePage extends Component {
  state = {
    data: {},
    loading: true
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    getMovieDetails(id).then(data =>
      this.setState({ data: data, loading: false })
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({ loading: true });
      this.componentDidMount();
    }
  }

  getGenres = arr => {
    let genres = "";
    arr.forEach((genre, index) => {
      if (index === 2 || index === arr.length - 1) {
        genres += genre.name;
      } else {
        genres += genre.name + " . ";
      }
    });
    return genres;
  };

  getTime = min => {
    const afterDiv = min / 60;
    const hour = Math.floor(afterDiv);
    const m = Math.round((afterDiv - hour) * 60);
    return `${hour}h ${m}m`;
  };

  getTrailer = videos => {
    return videos.results.filter(option => option.type === "Trailer");
  };

  render() {
    const { data, loading } = this.state;
    const trailer = !loading && this.getTrailer(data[3]);
    console.log(data);

    return loading ? (
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
      <div className="movie">
        <div
          className="movie-bg"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.75),black),url(https://image.tmdb.org/t/p/original${data[0].backdrop_path})`
          }}
        >
          <div className="movie-header">
            <div className="movie-header--text">
              <p className="movie-header--text-title">{data[0].title}</p>
              <div className="movie-header--text-details">
                <p>{this.getTime(data[0].runtime)}</p>
                <div className="movie-header--text-details--genres">
                  {data[0].genres.map((genre, index) =>
                    index === data[0].genres.length - 1 ? (
                      <span className="movie-header--text-details--genres-genre">
                        {genre.name}
                      </span>
                    ) : (
                      <div>
                        <span className="movie-header--text-details--genres-genre">
                          {genre.name}
                        </span>
                        <GoPrimitiveDot size={8} />
                      </div>
                    )
                  )}
                </div>
                <p>{data[0].release_date.slice(0, 4)}</p>
              </div>
            </div>

            <div className="movie-header--rating">
              <p className="movie-header--rating-number">
                {data[0].vote_average}
                <span
                  style={{
                    color: "white",
                    fontSize: "2.5rem",
                    marginLeft: ".5rem"
                  }}
                >
                  /10
                </span>
              </p>
              <p className="movie-header--rating-user">
                {`${data[0].vote_count} User Ratings`}
              </p>
            </div>
          </div>
          <div className="movie-content">
            <div className="movie-content-left">
              <div className="movie-content-left--poster">
                <img
                  src={`https://image.tmdb.org/t/p/original${data[0].poster_path}`}
                  alt={data[0].title}
                  className="movie-content-left--poster"
                />
              </div>
              <button className="btn btn-movie">Add to Watchlist</button>
            </div>
            <div className="movie-content--details">
              <div className="movie-content--details-desc">
                <p className="movie-content--details-desc-title">Overview</p>
                <p className="movie-content--details-desc-overview">
                  {data[0].overview}
                </p>
              </div>
              <div className="movie-content--details-trailer">
                <p className="movie-content--details-trailer-title">Trailer</p>
                <div
                  key={trailer[0].id}
                  className="movies-content--details-trailer-video"
                >
                  <ReactPlayer
                    className="movies-content--details-trailer-video--player"
                    url={`https://www.youtube.com/watch?v=${trailer[0].key}`}
                    width="100%"
                    controls
                    light
                    playing
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="movie-bottom">
          <CastSection cast={data[1]} name={"Cast"} />
          <SecondarySection name="More like this" movies={data[4]} />
        </div>
      </div>
    );
  }
}

export default withRouter(MoviePage);
