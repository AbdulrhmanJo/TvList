import React from "react";
import Slider from "react-slick";
import Movie from "./movie";
import { Link } from "react-router-dom";

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
        <Link
          to={`/movies/${name.replace(" ", "-").toLowerCase()}`}
          className="btn btn-tertiary"
        >
          See all
        </Link>
      </div>
      <Slider {...settings}>
        {movies.results.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </Slider>
    </div>
  );
};

export default SecondarySection;
