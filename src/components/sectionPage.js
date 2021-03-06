import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Movie from "./movie";
import {
  getMoviesOfSection,
  getMoviesOfCategory,
  getTvOfSection,
  getTvOfCategory,
  getTvOfNetwork,
} from "../utils/API";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import SyncLoader from "react-spinners/SyncLoader";
import Error from "./error";

class SectionPage extends Component {
  state = {
    data: [],
    page: 1,
    hasMore: true,
    loading: true,
  };
  loadData = () => {
    const { match } = this.props;
    const { page, data, totalPages } = this.state;
    // const id =
    //   match.params.id;
    //     .replace("-", " ")
    //     .charAt(0)
    //     .toUpperCase() + match.params.id.replace("-", " ").substring(1);

    // const network = this.props.networks.filter(network => network.name === id);

    if (this.props.genre.length > 0) {
      if (match.path.indexOf("movies") !== -1) {
        getMoviesOfCategory(this.props.genre[0].id, this.state.page).then(
          (res) =>
            this.setState({
              data: data.concat(res.results),
              hasMore: totalPages - page > 0 ? true : false,
              page: page + 1,
            })
        );
      } else {
        getTvOfCategory(this.props.genre[0].id, this.state.page).then((res) =>
          this.setState({
            data: data.concat(res.results),
            hasMore: totalPages - page > 0 ? true : false,
            page: page + 1,
          })
        );
      }
    } else if (!isNaN(this.props.dest[1])) {
      getTvOfNetwork(this.props.dest[1], this.state.page).then((res) =>
        this.setState({
          data: data.concat(res.results),
          hasMore: totalPages - page > 0 ? true : false,
          page: page + 1,
        })
      );
    } else {
      if (match.path.indexOf("movies") !== -1) {
        if (match.params.id.toLowerCase() !== "trending") {
          getMoviesOfSection(match.params.id, page).then((res) =>
            this.setState({
              data: data.concat(res.results),
              hasMore: totalPages - page > 0 ? true : false,
              page: page + 1,
            })
          );
        } else {
          this.setState({
            hasMore: false,
          });
        }
      } else {
        if (match.params.id.toLowerCase() !== "trending") {
          getTvOfSection(match.params.id, page).then((res) =>
            this.setState({
              data: data.concat(res.results),
              hasMore: totalPages - page > 0 ? true : false,
              page: page + 1,
            })
          );
        } else {
          this.setState({
            hasMore: false,
          });
        }
      }
    }
  };
  componentDidMount() {
    const { match } = this.props;
    window.scroll({
      top: 0,
      left: 0,
    });

    // const id = match.params.id;

    // const network = this.props.networks.filter(network => network.name === id);
    // console.log(network);

    if (this.props.genre.length > 0) {
      if (match.path.indexOf("movies") !== -1) {
        getMoviesOfCategory(this.props.genre[0].id, this.state.page).then(
          (data) => {
            if (data["results"]) {
              this.setState({
                data: data.results,
                loading: false,
                totalPages: data.total_pages,
                page: this.state.page + 1,
              });
            } else {
              this.setState({
                loading: false,
              });
            }
          }
        );
      } else {
        getTvOfCategory(this.props.genre[0].id, this.state.page).then(
          (data) => {
            if (data["results"]) {
              this.setState({
                data: data.results,
                loading: false,
                totalPages: data.total_pages,
                page: this.state.page + 1,
              });
            } else {
              this.setState({
                loading: false,
              });
            }
          }
        );
      }
    } else if (!isNaN(this.props.dest[1])) {
      getTvOfNetwork(this.props.dest[1], this.state.page).then((data) => {
        if (data["results"]) {
          this.setState({
            data: data.results,
            loading: false,
            totalPages: data.total_pages,
            page: this.state.page + 1,
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      });
    } else {
      if (match.path.indexOf("movies") !== -1) {
        getMoviesOfSection(match.params.id, this.state.page).then((data) => {
          if (data["results"]) {
            this.setState({
              data: data.results,
              loading: false,
              totalPages: data.total_pages,
              page: this.state.page + 1,
            });
          } else {
            this.setState({
              loading: false,
            });
          }
        });
      } else {
        getTvOfSection(match.params.id, this.state.page).then((data) => {
          if (data["results"]) {
            this.setState({
              data: data.results,
              loading: false,
              totalPages: data.total_pages,
              page: this.state.page + 1,
            });
          } else {
            this.setState({
              loading: false,
            });
          }
        });
      }
    }
  }

  render() {
    let { data } = this.state;
    if (!this.state.loading && data.length <= 0) return <Error />;
    const { match } = this.props;
    const name = match.params.id
      .split("_")
      .filter((part) => isNaN(part) === true);
    return (
      <div className="section-page">
        {this.state.loading ? (
          <BeatLoader
            css={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            loading={this.state.loading}
            size={45}
            color={"rgb(243, 45, 88)"}
          />
        ) : (
          <div className="section-page-content">
            <p className="section-page-content_info">
              {match.params.id === "tv-movie" ? "TV Movie" : name.join(" ")}
            </p>
            <InfiniteScroll
              dataLength={this.state.data.length}
              next={this.loadData}
              hasMore={this.state.hasMore}
              loader={
                <SyncLoader
                  css={{
                    padding: "2rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  size={15}
                  color={"rgb(243, 45, 88)"}
                />
              }
            >
              <div className="section-page-content_movies">
                {this.state.data.map(
                  (movie) =>
                    movie.poster_path && (
                      <Movie
                        key={movie.id}
                        movie={movie}
                        place="section"
                        type={
                          match.url.indexOf("movies") !== -1
                            ? "/movies"
                            : "/tv-shows"
                        }
                      />
                    )
                )}
              </div>
            </InfiniteScroll>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const id = match.params.id;
  let token = id.split("_").join(" ");
  const genre =
    match.path.indexOf("movies") !== -1
      ? state.movies.genre.genres.filter((genre) => token.trim() === genre.name)
      : state.tvshows.genre.genres.filter(
          (genre) => token.trim() === genre.name
        );

  return {
    genre,
    networks: state.tvshows.networks.map((network) => network[0]),
    dest: match.params.id.split("_"),
  };
};

export default withRouter(connect(mapStateToProps)(SectionPage));
