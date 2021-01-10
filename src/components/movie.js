import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { connect } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Img } from "react-image";
import Menu from "./menu";

const Photo = ({ imgSrc }) => (
  <Img
    src={imgSrc}
    className="movies-content_SecondarySection-movie--box-img"
    loader={
      <ClipLoader
        css={{
          margin: "auto",
        }}
        loading={true}
        size={25}
        color={"rgb(243, 45, 88)"}
      />
    }
  />
);
class Movie extends Component {
  state = {
    mount: false,
  };

  componentDidMount() {
    this.setState({ mount: true });
  }

  render() {
    if (!this.state.mount) return null;
    const { movie, type, place, hight } = this.props;
    return (
      <div
        className={
          place === "section"
            ? "movies-content_SecondarySection-movie section"
            : "movies-content_SecondarySection-movie"
        }
      >
        <Link to={`${type}/${movie.id}`} style={{ textDecoration: "none" }}>
          <div
            className={
              hight === "small"
                ? "movies-content_SecondarySection-movie--box small"
                : "movies-content_SecondarySection-movie--box"
            }
          >
            <Photo
              imgSrc={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            />
            <div className="movies-content_SecondarySection-movie--box-info"></div>
          </div>
          <p className="movies-content_SecondarySection-movie--title">
            {this.props.type === "/movies" ? movie.title : movie.name}
          </p>
          <div className="movies-content_SecondarySection-movie--box-info--text-rating">
            <span>{movie.vote_average}/10</span>
          </div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state, { movie, type }) => {
  let genre = [];
  if (type === "movies") {
    genre = state.movies.genre.genres.filter(
      (genre) => genre.id === movie.genre_ids[0]
    );
  } else {
    genre = state.tvshows.genre.genres.filter(
      (genre) => genre.id === movie.genre_ids[0]
    );
  }

  return {
    genre,
  };
};

export default connect(mapStateToProps)(Movie);
