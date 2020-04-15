import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { connect } from "react-redux";

class Movie extends Component {
  render() {
    const { movie, type, place } = this.props;

    return (
      <div
        className={
          place === "section"
            ? "movies-content_SecondarySection-movie section"
            : "movies-content_SecondarySection-movie"
        }
      >
        <Link to={`/${type}/${movie.id}`}>
          <div className="movies-content_SecondarySection-movie--box">
            <img
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={`${movie.title}`}
              className="movies-content_SecondarySection-movie--box-img"
            />
            <div className="movies-content_SecondarySection-movie--box-info">
              <div className="movies-content_SecondarySection-movie--box-info--text">
                <p className="movies-content_SecondarySection-movie--box-info--text-title">
                  {type === "movies" ? movie.title : movie.name}
                </p>
                <div className="movies-content_SecondarySection-movie--box-info--text-rating">
                  <span>{movie.vote_average}/10</span>
                </div>
              </div>
            </div>
          </div>
          {/* <p className="movies-content_SecondarySection-movie--title">{props.type === "/movies" ? movie.title : movie.name}</p> */}
        </Link>
        <div className="movies-content_SecondarySection-movie--action">
          <button className="btn btn-secandry pad-small">
            <IoIosAdd size={25} />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { movie, type }) => {
  let genre = [];
  if (type === "movies") {
    genre = state.movies.genre.genres.filter(
      genre => genre.id === movie.genre_ids[0]
    );
  } else {
    genre = state.tvshows.genre.genres.filter(
      genre => genre.id === movie.genre_ids[0]
    );
  }

  return {
    genre
  };
};

export default connect(mapStateToProps)(Movie);
