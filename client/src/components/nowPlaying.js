import React, { Component } from "react";
import Slider from "react-slick";
import { IoIosAdd } from "react-icons/io";

const Slide = props => {
  return (
    <div className="movies-content_nowPlaying--movie">
      <img
        src={`https://image.tmdb.org/t/p/original${props.backdrop_path}`}
        alt={`${props.title}`}
        width="100%"
        className="movies-content_nowPlaying--movie-img"
      />
      <div className="movies-content_nowPlaying--movie-info">
        <p className="movies-content_nowPlaying--movie-info__section">
          {props.sectionName}
        </p>
        <h1 className="movies-content_nowPlaying--movie-info__title">
          {props.title}
        </h1>
        <div className="movies-content_nowPlaying--movie-info__rating">
          <span>{props.rating}/10</span>
          <span>{props.genre.name}</span>

          {/* <span>{movie.release_date.slice(0, 4)}</span> */}
        </div>
        <p className="movies-content_nowPlaying--movie-info__overview">
          {props.overview}
        </p>
        <div style={{ display: "flex" }}>
          <button className="btn btn-primary">watch trailer</button>
          <button className="btn btn-secandry">
            <IoIosAdd size={35} />
          </button>
        </div>
      </div>
    </div>
  );
};
class NowPlaying extends Component {
  getGenre = (genres, movieGenre) => {
    let result = [];
    movieGenre.forEach(mgenre => {
      genres.genres.forEach(genre => {
        if (mgenre === genre.id) {
          result.push(genre);
        }
      });
    });
    return result[0];
  };
  render() {
    const { movies, genres, type } = this.props;
    const settings = {
      fade: true,
      lazyLoad: true,
      arrows: false,
      dots: false,
      infinite: true,
      autoplaySpeed: 15000,
      slidesToShow: 1,
      autoplay: true
    };
    return (
      <div className="movies-content_nowPlaying">
        <Slider {...settings}>
          {movies.results.map((movie, index) => {
            return (
              index < 15 && (
                <Slide
                  sectionName={type === "movies" ? "Now playing" : "Trending"}
                  backdrop_path={movie.backdrop_path}
                  key={movie.id}
                  title={type === "movies" ? movie.title : movie.name}
                  genre={this.getGenre(genres, movie.genre_ids)}
                  overview={movie.overview}
                  rating={movie.vote_average}
                />
              )
            );
          })}
        </Slider>
      </div>
    );
  }
}

export default NowPlaying;
