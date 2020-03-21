import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { IoIosAdd } from "react-icons/io";

class NowPlaying extends Component {
  slide = (movie, genres) => {
    return (
      <div key={movie.id} className="movies-content_nowPlaying--movie">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt=""
          width="100%"
        />
        <div className="movies-content_nowPlaying--movie-info">
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
          <div style={{display: 'flex'}}>
            <button className="btn btn-primary">watch trailer</button>
            <button className="btn btn-secandry"><IoIosAdd size={40}/></button>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const { movies, genres } = this.props;
    console.log(this.props);
    const settings = {
      arrows: false,
      dots: false,
      infinite: true,
      autoplaySpeed: 9000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    return (
      <div className="movies-content_nowPlaying">
        <Slider {...settings}>
          {movies.results.map(movie => this.slide(movie, genres))}
        </Slider>
      </div>
    );
  }
}

export default NowPlaying;
