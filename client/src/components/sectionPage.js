import React, { Component } from "react";
import Movie from "./movie";
import { getMoviesOfSection } from "../utils/API";
import InfiniteScroll from "react-infinite-scroll-component";
import BeatLoader from "react-spinners/BeatLoader";
import SyncLoader from "react-spinners/SyncLoader";

class SectionPage extends Component {
  state = {
    movies: [],
    page: 1,
    hasMore: true,
    loading: true
  };
  loadMovies = () => {
    const { match } = this.props;
    const { page, movies, hasMore } = this.state;

    if (match.params.id !== "trending") {
      this.setState({ page: page + 1 });

      getMoviesOfSection(match.params.id, page).then(res =>
        this.setState({
          movies: this.state.movies.concat(res[0].results),
          hasMore: this.state.totalPages - this.state.page > 0 ? true : false
        })
      );
    } else {
      this.setState({
        hasMore: false
      });
    }
  };
  componentDidMount() {
    window.scroll({
      top: 0,
      left: 0
    });
    getMoviesOfSection(this.props.match.params.id, this.state.page).then(data =>
      this.setState({
        movies: data[0].results,
        loading: false,
        totalPages: data[0].total_pages
      })
    );
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
          <div>
            <p className="section-page_info">
              {match.params.id.replace("-", " ")}
            </p>
            <InfiniteScroll
              dataLength={this.state.movies.length}
              next={this.loadMovies}
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
              <div className="section-page_movies">
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

export default SectionPage;
