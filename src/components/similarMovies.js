import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Movie from "./movie";
class SimilarMovies extends Component {
  render() {
    const { data, match } = this.props;
    console.log(data);
    
    return (
      <div className="section-page">
        <div className="section-page-content">
          <div className="section-page-content_movies">
            {data.map(
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
        </div>
      </div>
    );
  }
}

export default withRouter(SimilarMovies);
