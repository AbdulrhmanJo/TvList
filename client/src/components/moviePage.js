import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { getMovieDetails, getTvDetails } from "../utils/API";
import BeatLoader from "react-spinners/BeatLoader";
import { GoPrimitiveDot } from "react-icons/go";
import ReactPlayer from "react-player";
import TrailerSection from "./trailerSection";
import CastSection from "./castSection";
// import CrewSection from "./crewSection";
import SecondarySection from "./SecondraySection";
import { AiTwotoneStar } from "react-icons/ai";
import MoreLikeThis from "./moreLikeThis";
import SimilarMovies from "./similarMovies";
import Details from "./Details";

const Wrapper = (props) => {
  return <div>hello Component</div>;
};
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
        <div className="movie-mainSection--header">
          <div className="movie-mainSection--header-title">
            {type === "movies" ? data[0].title : data[0].name}
            <p className="movie-mainSection--header-tagline">
              {data[0].tagline}
            </p>
          </div>
          <div className="movie-mainSection--header-rating">
            <div className="movie-mainSection--header-rating--primary">
              <span>
                <AiTwotoneStar size={26} color="#f32d58" />
              </span>
              <p>{data[0].vote_average}</p>/10
            </div>
            <div className="movie-mainSection--header-rating--secondry">{`${data[0].vote_count} User Rating this`}</div>
          </div>
        </div>
        <div className="movie-content">
          <div className="movie-mainSection">
            <div className="movie-mainSection--trailer">
              <ReactPlayer
                className="movie-mainSection--trailer-player"
                url={`https://www.youtube.com/watch?v=${trailer[0].key}`}
                light={`https://image.tmdb.org/t/p/original${data[0].backdrop_path}`}
                width="100%"
                height="100%"
                playing
              />
            </div>
            <div className="movie-mainSection--overview">
              <p className="movie-mainSection--overview-header">Overview</p>
              <p className="movie-mainSection--overview-text">
                {data[0].overview}
              </p>
            </div>
            <div className="movie-mainSection--cast">
              <CastSection name="cast" cast={data[1].cast} />
            </div>
            <div className="movie-mainSection--recomendition">
              <SecondarySection
                seeAll={false}
                name="more like this"
                movies={data[3]}
                nom={5}
              />
            </div>
          </div>
          <div className="movie-secondarySection">
            <div className="movie-secondarySection-content">
              <div className="movie-secondarySection--genres">
                <p className="movie-mainSection--overview-header">Genres</p>
                <div className="movie-secondarySection--genres-list">
                  {data[0].genres.map((genre) => (
                    <Link
                      to={
                        type === "movies"
                          ? `/movies/genres/${genre.name
                              .replace(" ", "-")
                              .toLowerCase()}`
                          : `/tv-shows/genres/${genre.name
                              .replace(" ", "-")
                              .toLowerCase()}`
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
                    {data[0].networks.map(
                      (network, index) =>
                        index < 3 && (
                          <Link
                            to={`/tv-shows/discover/${network.id}`}
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
                      {data[0].number_of_seasons}
                    </p>
                  </div>
                )}
                <p className="movie-secondarySection--info-subheader">
                  {type === "movies" ? "Runtime" : "Episode Runtime"}
                </p>
                <p className="movie-secondarySection--info-text">
                  {type === "movies"
                    ? this.getTime(data[0].runtime)
                    : this.getTime(data[0].episode_run_time[0])}
                </p>
                <p className="movie-secondarySection--info-subheader">
                  Release Year
                </p>

                <p className="movie-secondarySection--info-text">
                  {type === "movies"
                    ? data[0].release_date.slice(0, 4)
                    : data[0].first_air_date.slice(0, 4)}
                </p>
                <p className="movie-secondarySection--info-subheader">
                  Languages
                </p>
                <p className="movie-secondarySection--info-text">
                  {type === "movies"
                    ? this.getLang(data[0].spoken_languages)
                    : this.getLangTV(data[0].languages)}
                </p>
                {type === "tvshows" && data[0].created_by.length > 0 && (
                  <div>
                    <p className="movie-secondarySection--info-subheader">
                      Created by
                    </p>
                    <p className="movie-secondarySection--info-text">
                      {this.getCreators(data[0].created_by)}
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
