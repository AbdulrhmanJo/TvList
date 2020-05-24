import React from "react";
import Slider from "react-slick";
import Movie from "./movie";
import { Link, withRouter } from "react-router-dom";
import Arrow from "./arrow";

const SecondarySection = (props) => {
  const { name, movies, match, seeAll, nom } = props;
  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 700,
    slidesToShow: nom,
    slidesToScroll: 5,
    prevArrow: <Arrow type="prev" />,
    nextArrow: <Arrow type="next" />,
  };
  return (
    <div className="movies-content_SecondarySection">
      <div className="movies-content_SecondarySection-header">
        {nom === 5 ? (
          <p className="movie-mainSection--overview-header">{name}</p>
        ) : (
          <h1 className="movies-content_SecondarySection-header--name">
            {name}
          </h1>
        )}
        {seeAll && (
          <Link
            to={`${match.url}/discover/${name.replace(" ", "_")}`}
            className="btn btn-tertiary"
          >
            See all
          </Link>
        )}
      </div>
      <Slider {...settings}>
        {movies.results.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            type={match.url.indexOf("/movies") !== -1 ? "/movies" : "/tv-shows"}
          />
        ))}
      </Slider>
    </div>
  );
};

export default withRouter(SecondarySection);
