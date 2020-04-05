import React from "react";
import Slider from "react-slick";
import Movie from "./movie";
import { Link, withRouter } from "react-router-dom";

const SecondarySection = props => {
  const { name, movies, match } = props;
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
          to={`${match.url}/discover/${name.replace(" ", "-").toLowerCase()}`}
          className="btn btn-tertiary"
        >
          See all
        </Link>
      </div>
      <Slider {...settings}>
        {movies.results.map(movie => (
          <Movie
            key={movie.id}
            movie={movie}
            type={match.url === "/movies" ? "movies" : "tv-shows"}
          />
        ))}
      </Slider>
    </div>
  );
};

export default withRouter(SecondarySection);
