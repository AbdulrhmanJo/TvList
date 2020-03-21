import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

class NowPlaying extends Component {
  slide = movie => {
    return (
      <div className="movies-content_nowPlaying--movie">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt=""
          width="100%"
        />
        <div className="movies-content_nowPlaying--movie-info">
          <h1 className="movies-content_nowPlaying--movie-info__title">
            {movie.title}
          </h1>
          <div></div>
          <p className="movies-content_nowPlaying--movie-info__overview">
            {movie.overview}
          </p>
        </div>
        {/* <div className="movies-content_nowPlaying--movie-desc">
        </div> */}
      </div>
    );
  };
  render() {
    const { results } = this.props.movies;
    console.log(results);
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
        <Slider {...settings}>{results.map(movie => this.slide(movie))}</Slider>
      </div>
    );
  }
}

export default NowPlaying;
