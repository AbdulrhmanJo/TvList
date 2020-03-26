import React, { Component } from "react";
import { connect } from "react-redux";
import Movie from "./movie";
import { getMoviesOfSection } from "../utils/API";
import BeatLoader from "react-spinners/BeatLoader";

class SectionPage extends Component {
  state = {
    data: [],
    page: 1,
    total_pages: null,
    scrolling: false,
    loading: true
  };
  loadMovies = () => {
    getMoviesOfSection("in-theaters").then(data =>
      this.setState({
        data: data[0].results,
        total_pages: data[0].total_pages,
        loading: false
      })
    );
  };
  componentDidMount() {
    window.scroll({
      top: 0,
      left: 0
    });
    this.loadMovies();
  }

  render() {
    // const { sectionMovies, id, loading } = this.props;

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
            <p className="section-page_info">in theaters</p>
            <div className="section-page_movies">
              {this.state.data.map(movie => (
                <Movie movie={movie} />
              ))}
            </div>
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
