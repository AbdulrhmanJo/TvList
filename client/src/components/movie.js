import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
class Movie extends Component {
  render() {
    const { movie, type, match, place } = this.props;
    console.log(type);

    return (
      <div>
        <Link
          to={`/${type}/${movie.id}`}
          className={
            place === "section"
              ? "movies-content_SecondarySection-movie section"
              : "movies-content_SecondarySection-movie"
          }
        >
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={`${movie.title}`}
            className="movies-content_SecondarySection-movie--img"
          />
          {/* <p className="movies-content_SecondarySection-movie--title">{props.type === "/movies" ? movie.title : movie.name}</p> */}
        </Link>

        {/* <Route exact path="/movies/:id" redner={sectionPage} /> */}
      </div>
    );
  }
}

export default withRouter(Movie);
