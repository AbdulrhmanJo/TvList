import React from "react";
import Slider from "react-slick";

const slide = movie => {
  return (
    <div key={movie.id} className="movies-content_SecondarySection-movie">
      <img
        key={movie.id}
        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
        alt={`${movie.title}`}
        className="movies-content_SecondarySection-movie--img"
      />
    </div>
  );
};

const SecondarySection = props => {
  const { name, movies } = props;
  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 4
  };
  return (
    <div className="movies-content_SecondarySection">
      <div className="movies-content_SecondarySection-header">
        <h1 className="movies-content_SecondarySection-header--name">{name}</h1>
        <button className="btn btn-tertiary">See all</button>
      </div>
      <Slider {...settings}>{movies.results.map(movie => slide(movie))}</Slider>
    </div>
  );
};

export default SecondarySection;
