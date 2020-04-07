import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getMovieDetails } from "../utils/API";
import Slider from "react-slick";

class MoviePage extends Component {
  state = {
    data: {},
    loading: true
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    getMovieDetails(id).then(data =>
      this.setState({ data: data, loading: false })
    );
  }
  render() {
    const { data, loading } = this.state;
    return loading ? (
      <h1>loading...</h1>
    ) : (
      <div className="movie">
        <div className="movie-bg">
          <img
            src={`https://image.tmdb.org/t/p/original${data[0].backdrop_path}`}
            alt={data[0].title}
            className="movie-bg--img"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(MoviePage);
