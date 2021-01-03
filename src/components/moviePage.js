import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { getMovieDetails, getTvDetails } from "../utils/API";
import BeatLoader from "react-spinners/BeatLoader";
import ReactPlayer from "react-player";
import CastSection from "./castSection";
import SecondarySection from "./SecondraySection";
import Seasons from "./seasons";
import { AiTwotoneStar } from "react-icons/ai";
import { AiOutlineFileImage } from "react-icons/ai";
import Error from "./error";
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

    // if (this.state.data[2].results.length < 2) {
    //   const item = document.querySelector(".slick-track");
    //   console.log(item);
    // }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({ loading: true });
      this.componentDidMount();
    }
  }

  getLang = (arr) => {
    let langs = "";
    arr.forEach((lang, index) => {
      if (index === 2 || index === arr.length - 1) {
        langs += lang.name;
      } else {
        langs += lang.name + ", ";
      }
    });
    return langs;
  };

  getLangTV = (arr) => {
    let langs = "";
    arr.forEach((lang, index) => {
      if (index === 2 || index === arr.length - 1) {
        langs += lang;
      } else {
        langs += lang + ", ";
      }
    });
    return langs;
  };

  getCreators = (arr) => {
    let creators = "";
    arr.forEach((creater, index) => {
      if (index === 2 || index === arr.length - 1) {
        creators += creater.name;
      } else {
        creators += creater.name + ", ";
      }
    });
    return creators;
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
    let { data, loading, type } = this.state;
    !loading && console.log(data);
    if (!loading && data.details.success === false) return <Error />;
    const seasons =
      !loading &&
      type === "tvshows" &&
      data.seasons.filter((season) => season.season_number > 0);
    data = data.details;
    const trailer = !loading && this.getTrailer(data.videos);
    return loading ? (
      <BeatLoader
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        loading={loading}
        size={45}
        color={"rgb(243, 45, 88)"}
      />
    ) : (
      <div className="movie">
        <div className="movie-mainSection--header">
          <div className="movie-mainSection--header-title">
            {type === "movies" ? data.title : data.name}
            <p className="movie-mainSection--header-tagline">{data.tagline}</p>
          </div>
          <div className="movie-mainSection--header-rating">
            <div className="movie-mainSection--header-rating--primary">
              <span>
                <AiTwotoneStar size={26} color="#f32d58" />
              </span>
              <p>{data.vote_average}</p>/10
            </div>
            <div className="movie-mainSection--header-rating--secondry">{`${data.vote_count} User Rating this`}</div>
          </div>
        </div>
        <div className="movie-content">
          <div className="movie-mainSection">
            {trailer.length > 0 ? (
              <div className="movie-mainSection--trailer">
                <ReactPlayer
                  className="movie-mainSection--trailer-player"
                  url={`https://www.youtube.com/watch?v=${trailer[0].key}`}
                  light={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                  width="100%"
                  height="100%"
                  playing
                />
              </div>
            ) : (
              <div className="movie-mainSection--img">
                {data.backdrop_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                    alt={data.name}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <AiOutlineFileImage size={100} />
                    <p style={{ fontSize: "1.6rem" }}>No Image</p>
                  </div>
                )}
              </div>
            )}
            <div className="movie-mainSection--overview">
              <p className="movie-mainSection--overview-header">Overview</p>
              <p className="movie-mainSection--overview-text">
                {data.overview.length > 0
                  ? data.overview
                  : "There is no overview yet.  "}
              </p>
            </div>
            {type === "tvshows" && <Seasons data={seasons} />}
            <div className="movie-mainSection--cast">
              <CastSection name="cast" cast={data.credits.cast} />
            </div>
            <div className="movie-mainSection--recomendition">
              {data.similar.results.length >= 5 ? (
                <SecondarySection
                  seeAll={false}
                  name="more like this"
                  movies={data.similar}
                  nom={5}
                  hight="small"
                />
              ) : data.recommendations.results.length >= 5 ? (
                <SecondarySection
                  seeAll={false}
                  name="you may also like this"
                  movies={data.recommendations}
                  hight="small"
                  nom={5}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="movie-secondarySection">
            <div className="movie-secondarySection-content">
              <div className="movie-secondarySection--genres">
                <p className="movie-mainSection--overview-header">Genres</p>
                <div className="movie-secondarySection--genres-list">
                  {data.genres.map((genre) => (
                    <Link
                      key={genre.id}
                      to={
                        type === "movies"
                          ? `/movies/genres/${genre.name.replace(" ", "_")}`
                          : `/tv-shows/genres/${genre.name.replace(" ", "_")}`
                      }
                      className="movie-secondarySection--genres-list--genre"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>

              {type === "tvshows" && (
                <div className="movie-secondarySection--networks">
                  <p className="movie-secondarySection--networks-title">
                    Available on
                  </p>
                  <div className="movie-secondarySection--networks-list">
                    {data.networks.map(
                      (network, index) =>
                        index < 3 && (
                          <Link
                            key={network.id}
                            to={`/tv-shows/discover/${network.name}_${network.id}`}
                            className="movie-secondarySection--networks-list--logo"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                              alt={network.name}
                            />
                          </Link>
                        )
                    )}
                  </div>
                </div>
              )}
              <div className="movie-secondarySection--info">
                <p className="movie-secondarySection--info-header">
                  Information
                </p>
                {type === "tvshows" && (
                  <div>
                    <p className="movie-secondarySection--info-subheader">
                      number of seasons
                    </p>
                    <p className="movie-secondarySection--info-text">
                      {data.number_of_seasons}
                    </p>
                  </div>
                )}
                <p className="movie-secondarySection--info-subheader">
                  {type === "movies" ? "Runtime" : "Episode Runtime"}
                </p>
                <p className="movie-secondarySection--info-text">
                  {type === "movies"
                    ? this.getTime(data.runtime)
                    : this.getTime(data.episode_run_time[0])}
                </p>
                <p className="movie-secondarySection--info-subheader">
                  Release Year
                </p>

                <p className="movie-secondarySection--info-text">
                  {type === "movies"
                    ? data.release_date.slice(0, 4)
                    : data.first_air_date.slice(0, 4)}
                </p>
                <p className="movie-secondarySection--info-subheader">
                  Languages
                </p>
                <p className="movie-secondarySection--info-text">
                  {type === "movies"
                    ? this.getLang(data.spoken_languages)
                    : this.getLangTV(data.languages)}
                </p>
                {type === "tvshows" && data.created_by.length > 0 && (
                  <div>
                    <p className="movie-secondarySection--info-subheader">
                      Created by
                    </p>
                    <p className="movie-secondarySection--info-text">
                      {this.getCreators(data.created_by)}
                    </p>
                  </div>
                )}
                <div className="movie-secondarySection--info-btn">
                  <button className="btn btn-primary">Add to list</button>
                  <button className="btn btn-secandry">Share</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MoviePage);
