import React, { Component } from "react";
import Slider from "react-slick";
import { IoIosAdd } from "react-icons/io";

class NowPlaying extends Component {
  slide = (movie, genres) => {
    return (
      <div key={movie.id} className="movies-content_nowPlaying--movie">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={`${movie.title}`}
          width="100%"
          className="movies-content_nowPlaying--movie-img"
        />
        <div className="movies-content_nowPlaying--movie-info">
          <p className="movies-content_nowPlaying--movie-info__section">
            Now playing
          </p>
          <h1 className="movies-content_nowPlaying--movie-info__title">
            {movie.title}
          </h1>
          <div className="movies-content_nowPlaying--movie-info__rating">
            <span>{movie.vote_average}/10</span>
            <span>
              {genres.genres.map(
                genre => movie.genre_ids[0] === genre.id && genre.name
              )}
            </span>
            <span>{movie.release_date.slice(0, 4)}</span>
          </div>
          <p className="movies-content_nowPlaying--movie-info__overview">
            {movie.overview}
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
  render() {
    const { movies, genres } = this.props;
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
            return index < 10 && this.slide(movie, genres);
          })}
        </Slider>
      </div>
    );
  }
}

export default NowPlaying;
