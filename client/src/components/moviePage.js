import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { getMovieDetails, getTvDetails } from "../utils/API";
import BeatLoader from "react-spinners/BeatLoader";
import { GoPrimitiveDot } from "react-icons/go";
import ReactPlayer from "react-player";
import CastSection from "./castSection";
import SecondarySection from "./SecondraySection";
class MoviePage extends Component {
  state = {
    data: {},
    loading: true,
    type: this.props.match.path.indexOf("movies") !== -1 ? "movies" : "tvshows",
  };
  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    if (this.state.type === "movies") {
      getMovieDetails(id).then((data) =>
        this.setState({ data: data, loading: false })
      );
    } else {
      getTvDetails(id).then((data) =>
        this.setState({ data: data, loading: false })
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({ loading: true });
      this.componentDidMount();
    }
  }

  getGenres = (arr) => {
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

  getTime = (min) => {
    const afterDiv = min / 60;
    const hour = Math.floor(afterDiv);
    const m = Math.round((afterDiv - hour) * 60);
    return `${hour}h ${m}m`;
  };

  getTrailer = (videos) => {
    return videos.results.filter((option) => option.type === "Trailer");
  };

  render() {
    const { data, loading, type } = this.state;
    const trailer = !loading && this.getTrailer(data[2]);
    console.log(data);

    return loading ? (
      <BeatLoader
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
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
            backgroundImage: `linear-gradient(
                    to top,
                    rgba(12, 11, 11, 1) 0%,
                    rgba(12, 11, 11, 0)
                  ),
                  repeating-linear-gradient(
                    to right,
                    rgba(12, 11, 11, 1) 0%,
                    rgba(12, 11, 11, 0)
                  ),url(https://image.tmdb.org/t/p/original${data[0].backdrop_path})`,
          }}
        >
          {/* <img
            src={`https://image.tmdb.org/t/p/original${data[0].backdrop_path}`}
            alt={type === "movies" ? data[0].title : data[0].name}
          />
          <div className="movie-bg--overlay"></div> */}
          <div className="movie-top">
            <div className="movie-top--rating">
              <p className="movie-top--rating-number">
                {data[0].vote_average}
                <span>/10</span>
              </p>
            </div>
            <div className="movie-top--title">
              <p className="movie-top--title-text">
                {type === "movies" ? data[0].title : data[0].name}
              </p>
            </div>
            <div className="movie-top--details">
              <p>
                {type === "movies"
                  ? this.getTime(data[0].runtime)
                  : data[0].number_of_seasons > 1
                  ? `${data[0].number_of_seasons} seasons`
                  : `${data[0].number_of_seasons} season`}
              </p>
              <div className="movie-top--details-genres">
                {data[0].genres.map((genre, index) =>
                  index === data[0].genres.length - 1 ? (
                    <Link
                      to={`/movies/genre/${genre.name
                        .replace(" ", "-")
                        .toLowerCase()}`}
                      className="movie-top--details-genres-genre"
                    >
                      {genre.name}
                    </Link>
                  ) : (
                    <div>
                      <Link
                        to={`/movies/genre/${genre.name
                          .replace(" ", "-")
                          .toLowerCase()}`}
                        className="movie-top--details-genres-genre"
                      >
                        {genre.name}
                      </Link>
                      <GoPrimitiveDot size={8} />
                    </div>
                  )
                )}
              </div>
              <p>
                {type === "movies"
                  ? data[0].release_date.slice(0, 4)
                  : data[0].first_air_date.slice(0, 4)}
              </p>
            </div>
            <div className="movie-top--overview">
              <p className="movie-top--overview-desc">{data[0].overview}</p>
            </div>
            {type === "tvshows" && (
              <div className="movie-top--networks">
                <p className="movie-top--networks-title">Available on</p>
                <div className="movie-top--networks-container">
                  {data[0].networks.map((network) => (
                    <Link
                      to={`/tv-shows/discover/${network.id}`}
                      className="movie-top--networks-container-logo"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                        alt={network.name}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="movie-top--action">
              <button className="btn btn-primary">add to list</button>
              <button className="btn btn-secandry btn-secandry-one">share</button>
            </div>
          </div>
        </div>

        {/* <div className="movie-header">
            <div className="movie-header--text">
              <p className="movie-header--text-title">
                {type === "movies" ? data[0].title : data[0].name}
              </p>
              <div className="movie-header--text-details">
                <p>
                  {type === "movies"
                    ? this.getTime(data[0].runtime)
                    : data[0].number_of_seasons > 1
                    ? `${data[0].number_of_seasons} seasons`
                    : `${data[0].number_of_seasons} season`}
                </p>
                <div className="movie-header--text-details--genres">
                  {data[0].genres.map((genre, index) =>
                    index === data[0].genres.length - 1 ? (
                      <Link
                        to={`/movies/genre/${genre.name
                          .replace(" ", "-")
                          .toLowerCase()}`}
                        className="movie-header--text-details--genres-genre"
                      >
                        {genre.name}
                      </Link>
                    ) : (
                      <div>
                        <Link
                          to={`/movies/genre/${genre.name
                            .replace(" ", "-")
                            .toLowerCase()}`}
                          className="movie-header--text-details--genres-genre"
                        >
                          {genre.name}
                        </Link>
                        <GoPrimitiveDot size={8} />
                      </div>
                    )
                  )}
                </div>
                <p>
                  {type === "movies"
                    ? data[0].release_date.slice(0, 4)
                    : data[0].first_air_date.slice(0, 4)}
                </p>
              </div>
            </div>

            <div className="movie-header--rating">
              <p className="movie-header--rating-number">
                {data[0].vote_average}
                <span
                  style={{
                    color: "white",
                    fontSize: "2.5rem",
                    marginLeft: ".5rem",
                  }}
                >
                  /10
                </span>
              </p>
              <p className="movie-header--rating-user">
                {`${data[0].vote_count} User Ratings`}
              </p>
            </div>
          </div> */}
        {/* <div className="movie-content">
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
              {type === "tvshows" && (
                <div className="movie-content--details-networks">
                  <p className="movie-content--details-networks-title">
                    Available on
                  </p>
                  <div className="movie-content--details-networks-container">
                    {data[0].networks.map((network) => (
                      <Link
                        to={`/tv-shows/discover/${network.id}`}
                        className="movie-content--details-networks-container-logo"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                          alt={network.name}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div className="movie-content--details-trailer">
                <p className="movie-content--details-trailer-title">Trailer</p>
                <div className="movies-content--details-trailer-video">
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
        </div>*/}
        <div className="movie-bottom">
          <CastSection cast={data[1]} name={"Cast"} />
          <SecondarySection name="More like this" movies={data[3]} />
        </div>
      </div>
    );
  }
}

export default withRouter(MoviePage);
