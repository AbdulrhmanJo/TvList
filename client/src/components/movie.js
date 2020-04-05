import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
class Movie extends Component {
  render() {
    const { movie, type, match, place } = this.props;
    return (
      <Link
        to={`/${type}/${movie.id}`}
        className={
          place === "section"
            ? "movies-content_SecondarySection-movie section"
            : "movies-content_SecondarySection-movie"
        }
      >
        <div className="movies-content_SecondarySection-movie--box">
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={`${movie.title}`}
            className="movies-content_SecondarySection-movie--box-img"
          />
          <div className="movies-content_SecondarySection-movie--box-info">
            <p className="movies-content_SecondarySection-movie--box-info-title">
              {type === "movies" ? movie.title : movie.name}
            </p>
          </div>
        </div>
        {/* <p className="movies-content_SecondarySection-movie--title">{props.type === "/movies" ? movie.title : movie.name}</p> */}
      </Link>
    );
  }
}

export default withRouter(Movie);
