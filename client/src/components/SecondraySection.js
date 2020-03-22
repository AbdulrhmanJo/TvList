import React from "react";
import Slider from "react-slick";

const slide = movie => {
  return (
    <div className="movies-content_SecondarySection-movie">
      <img
        key={movie.id}
        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
        alt={`${movie.title}`}
        className="movies-content_SecondarySection-movie--img"
      />
      {/* <p className="movies-content_SecondarySection-movie--title">{movie.title}</p> */}
    </div>
  );
};

const SecondarySection = props => {
  const { name, movies } = props;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2
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
