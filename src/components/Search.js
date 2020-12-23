import React, { Component } from "react";
import SearchImg from "../icons/searchImg.svg";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { searchAll } from "../utils/API";
import Movie from "./movie";
class Search extends Component {
  _isMounted = false;

  state = {
    loading: true,
    found: false,
    movies: [],
    tv: [],
  };

  componentDidMount() {
    this._isMounted = true;
    if (this.props.search.length > 0) {
      searchAll(this.props.search).then((result) => {
        if (this._isMounted)
          this.setState({
            found: result.results.length > 0 ? true : false,
            loading: false,
            movies: result.results.filter(
              (item) => item.media_type === "movie"
            ),
            tv: result.results.filter((item) => item.media_type === "tv"),
          });
      });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    const { search } = this.props;
    if (previousProps !== this.props) {
      if (search.length > 0) {
        this.setState({ loading: true });
        searchAll(this.props.search).then((result) => {
          if (this._isMounted)
            this.setState({
              found: result.results && result.results.length > 0 ? true : false,
              loading: false,
              movies: result.results.filter(
                (item) => item.media_type === "movie"
              ),
              tv: result.results.filter((item) => item.media_type === "tv"),
            });
        });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const isEmpty = this.props.search.length === 0;
    const { loading, found } = this.state;
    const { search } = this.props;

    return (
      <div className="search-container">
        {isEmpty ? (
          <div className="search-container--welcome">
            <div className="search-container--img">
              <img src={SearchImg} alt="search-image" />
            </div>
            <p className="search-container--welcome-header">Search Something</p>
            <p className="search-container--welcome-text">
              Find your favorite movies, tv shows and acotrs, or you can go
              <button
                className="search-container--welcome-btn"
                onClick={() => this.props.history.goBack()}
              >
                Back
              </button>
            </p>
          </div>
        ) : loading ? (
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
        ) : found ? (
          <div className="search-container--data">
            {this.state.movies.length > 0 && (
              <div className="search-container--data-section">
                <p className="search-container--data-section-header">Movies</p>
                {this.state.movies.map(
                  (movie, index) =>
                    movie.poster_path &&
                    index < 12 && (
                      <Movie key={movie.id} movie={movie} type={"/movies"} />
                    )
                )}
              </div>
            )}
            {this.state.tv.length > 0 && (
              <div className="search-container--data-section">
                <p className="search-container--data-section-header">
                  TV Shows
                </p>
                {this.state.tv.map(
                  (movie, index) =>
                    movie.poster_path &&
                    index < 12 && (
                      <Movie key={movie.id} movie={movie} type={"/tv-shows"} />
                    )
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="search-container--welcome">
            <AiOutlineCloseCircle size={70} color="gray" />
            <p className="search-container--welcome-header">{`No results found for "${search}"`}</p>
            <p className="search-container--welcome-text">
              Please make sure your words are spelled correctly or use less or
              different keywords, or you can go
              <button
                className="search-container--welcome-btn"
                onClick={() => this.props.history.goBack()}
              >
                Back
              </button>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(
  connect(({ search }) => {
    return { search };
  })(Search)
);
