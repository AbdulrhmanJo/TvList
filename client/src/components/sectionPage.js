import React, { Component } from "react";
import Movie from "./movie";
import {
  getMoviesOfSection,
  getMoviesOfCategory,
  getTvOfSection,
  getTvOfCategory,
  getTvOfNetwork
} from "../utils/API";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import SyncLoader from "react-spinners/SyncLoader";

class SectionPage extends Component {
  state = {
    data: [],
    page: 1,
    hasMore: true,
    loading: true
  };
  loadData = () => {
    const { match } = this.props;
    const { page, data, totalPages } = this.state;
    const id =
      match.params.id
        .replace("-", " ")
        .charAt(0)
        .toUpperCase() + match.params.id.replace("-", " ").substring(1);

    const network = this.props.networks.filter(network => network.name === id);

    if (this.props.genre.length > 0) {
      if (match.path.indexOf("movies") !== -1) {
        getMoviesOfCategory(this.props.genre[0].id, this.state.page).then(res =>
          this.setState({
            data: data.concat(res[0].results),
            hasMore: totalPages - page > 0 ? true : false,
            page: page + 1
          })
        );
      } else {
        getTvOfCategory(this.props.genre[0].id, this.state.page).then(res =>
          this.setState({
            data: data.concat(res[0].results),
            hasMore: totalPages - page > 0 ? true : false,
            page: page + 1
          })
        );
      }
    } else if (network.length > 0) {
      getTvOfNetwork(network[0].id, this.state.page).then(res =>
        this.setState({
          data: data.concat(res[0].results),
          hasMore: totalPages - page > 0 ? true : false,
          page: page + 1
        })
      );
    } else {
      if (match.path.indexOf("movies") !== -1) {
        if (match.params.id !== "trending") {
          getMoviesOfSection(match.params.id, page).then(res =>
            this.setState({
              data: data.concat(res[0].results),
              hasMore: totalPages - page > 0 ? true : false,
              page: page + 1
            })
          );
        } else {
          this.setState({
            hasMore: false
          });
        }
      } else {
        if (match.params.id !== "trending") {
          getTvOfSection(match.params.id, page).then(res =>
            this.setState({
              data: data.concat(res[0].results),
              hasMore: totalPages - page > 0 ? true : false,
              page: page + 1
            })
          );
        } else {
          this.setState({
            hasMore: false
          });
        }
      }
    }
  };
  componentDidMount() {
    const { match } = this.props;
    window.scroll({
      top: 0,
      left: 0
    });

    const id = match.params.id;

    // const network = this.props.networks.filter(network => network.name === id);
    // console.log(network);

    if (this.props.genre.length > 0) {
      if (match.path.indexOf("movies") !== -1) {
        getMoviesOfCategory(this.props.genre[0].id, this.state.page).then(
          data =>
            this.setState({
              data: data[0].results,
              loading: false,
              totalPages: data[0].total_pages,
              page: this.state.page + 1
            })
        );
      } else {
        getTvOfCategory(this.props.genre[0].id, this.state.page).then(data =>
          this.setState({
            data: data[0].results,
            loading: false,
            totalPages: data[0].total_pages,
            page: this.state.page + 1
          })
        );
      }
    } else if (!isNaN(id)) {
      getTvOfNetwork(id, this.state.page).then(data =>
        this.setState({
          data: data[0].results,
          loading: false,
          totalPages: data[0].total_pages,
          page: this.state.page + 1
        })
      );
    } else {
      if (match.path.indexOf("movies") !== -1) {
        getMoviesOfSection(match.params.id, this.state.page).then(data =>
          this.setState({
            data: data[0].results,
            loading: false,
            totalPages: data[0].total_pages,
            page: this.state.page + 1
          })
        );
      } else {
        getTvOfSection(match.params.id, this.state.page).then(data =>
          this.setState({
            data: data[0].results,
            loading: false,
            totalPages: data[0].total_pages,
            page: this.state.page + 1
          })
        );
      }
    }
  }

  render() {
    const { match } = this.props;
    // console.log();

    return (
      <div className="section-page">
        {this.state.loading ? (
          <BeatLoader
            loading={this.state.loading}
            size={45}
            color={"rgb(243, 45, 88)"}
          />
        ) : (
          <div className="section-page-content">
            <p className="section-page-content_info">
              {match.params.id === "tv-movie"
                ? "TV Movie"
                : match.params.id.replace("-", " ")}
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
                    justifyContent: "center"
                  }}
                  size={15}
                  color={"rgb(243, 45, 88)"}
                />
              }
            >
              <div className="section-page-content_movies">
                {this.state.data.map(
                  movie =>
                    movie.poster_path && (
                      <Movie
                        key={movie.id}
                        movie={movie}
                        place="section"
                        type={
                          match.url.indexOf("movies") !== -1
                            ? "movies"
                            : "tv-shows"
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
  let token = "";
  if (id.indexOf("-") !== -1) {
    let words = id.split("-");
    words.forEach((word, index) => {
      if (match.path.indexOf("tv-shows") !== -1) {
        if (words.length === index + 1) {
          token += word.charAt(0).toUpperCase() + word.substring(1);
        } else {
          token += word.charAt(0).toUpperCase() + word.substring(1) + " & ";
        }
      } else {
        token +=
          word === "tv"
            ? word.toUpperCase() + " "
            : word.charAt(0).toUpperCase() + word.substring(1) + " ";
      }
    });
  } else {
    token += id.charAt(0).toUpperCase() + id.substring(1);
  }
  const genre =
    match.path.indexOf("movies") !== -1
      ? state.movies.genre.genres.filter(genre => token.trim() === genre.name)
      : state.tvshows.genre.genres.filter(genre => token.trim() === genre.name);

  return {
    genre,
    networks: state.tvshows.networks.map(network => network[0])
  };
};

export default connect(mapStateToProps)(SectionPage);
