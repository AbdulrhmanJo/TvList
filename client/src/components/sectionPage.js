import React, { Component } from "react";
import { connect } from "react-redux";
import Movie from "./movie";
import { getMoviesOfSection } from "../utils/API";
import InfiniteScroll from "react-infinite-scroll-component";
import BeatLoader from "react-spinners/BeatLoader";

class SectionPage extends Component {
  state = {
    movies: [],
    page: 1,
    loading: true
  };
  loadMovies = () => {
    this.setState({ page: this.state.page + 1 });
    getMoviesOfSection(this.props.match.params.id, this.state.page).then(res =>
      this.setState({ movies: this.state.movies.concat(res[0].results) })
    );
  };
  componentDidMount() {
    window.scroll({
      top: 0,
      left: 0
    });
    getMoviesOfSection(this.props.match.params.id, this.state.page).then(data =>
      this.setState({
        movies: data[0].results,
        loading: false
      })
    );
  }

  render() {
    const { match } = this.props;

    return (
      <div className="section-page">
        {this.state.loading ? (
          <BeatLoader
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%"
            }}
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
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
              <div className="section-page_movies">
                {this.state.movies.map(movie => (
                  <Movie movie={movie} />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        )}
      </div>
    );
  }
}

// const mapStateToProps = ({ movies }, { match }) => {
//   const id = match.params.id;
//   return {
//     // movies: movies[section],
//     loading: movies.sectionMovies === undefined,
//     id,
//     sectionMovies: movies.sectionMovies
//   };
// };

export default connect()(SectionPage);
