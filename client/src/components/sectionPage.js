import React, { Component } from "react";
import Movie from "./movie";
import { getMoviesOfSection, getMoviesOfCategory } from "../utils/API";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import SyncLoader from "react-spinners/SyncLoader";

class SectionPage extends Component {
  state = {
    movies: [],
    page: 1,
    hasMore: true,
    loading: true
  };
  loadData = () => {
    const { match } = this.props;
    const { page, movies, totalPages } = this.state;
    if (this.props.genre) {
      getMoviesOfCategory(this.props.genre[0].id, this.state.page).then(res =>
        this.setState({
          movies: movies.concat(res[0].results),
          hasMore: totalPages - page > 0 ? true : false,
          page: page + 1
        })
      );
    } else {
      if (match.params.id !== "trending") {
        getMoviesOfSection(match.params.id, page).then(res =>
          this.setState({
            movies: movies.concat(res[0].results),
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
  };
  componentDidMount() {
    window.scroll({
      top: 0,
      left: 0
    });

    if (this.props.genre) {
      getMoviesOfCategory(this.props.genre[0].id, this.state.page).then(data =>
        this.setState({
          movies: data[0].results,
          loading: false,
          totalPages: data[0].total_pages,
          page: this.state.page + 1
        })
      );
    } else {
      getMoviesOfSection(this.props.match.params.id, this.state.page).then(
        data =>
          this.setState({
            movies: data[0].results,
            loading: false,
            totalPages: data[0].total_pages,
            page: this.state.page + 1
          })
      );
    }
  }

  render() {
    const { match } = this.props;

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
              dataLength={this.state.movies.length}
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
                {this.state.movies.map(
                  movie =>
                    movie.poster_path && <Movie key={movie.id} movie={movie} />
                )}
              </div>
            </InfiniteScroll>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ movies }, { match }) => {
  const id = match.params.id;
  let token = "";
  if (id.indexOf("-") !== -1) {
    let words = id.split("-");
    words.forEach(word => {
      token +=
        word === "tv"
          ? word.toUpperCase() + " "
          : word.charAt(0).toUpperCase() + word.substring(1) + " ";
    });
  } else {
    token += id.charAt(0).toUpperCase() + id.substring(1);
  }

  const { genres } = movies.genre;
  const genre = genres.filter(genre => token.trim() === genre.name);

  return {
    genre
  };
};

export default connect(mapStateToProps)(SectionPage);
