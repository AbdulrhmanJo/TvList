import React from "react";
import Slider from "react-slick";
import Movie from "./movie";
import { Link, withRouter } from "react-router-dom";
import Arrow from "./arrow";

const SecondarySection = (props) => {
  const { name, movies, match, seeAll, nom, hight } = props;
  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 700,
    slidesToShow: nom,
    slidesToScroll: 5,
    prevArrow: <Arrow type="prev" />,
    nextArrow: <Arrow type="next" />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
      {movies.results.length > 0 ? (
        <Slider {...settings}>
          {movies.results.map(
            (movie) =>
              movie.poster_path && (
                <Movie
                  key={movie.id}
                  movie={movie}
                  type={
                    match.url.indexOf("/movies") !== -1
                      ? "/movies"
                      : "/tv-shows"
                  }
                  hight={hight}
                />
              )
          )}
        </Slider>
      ) : (
        <p className="movie-mainSection--overview-text error">There is no recommendation based on this movie yet.</p>
      )}
    </div>
  );
};

export default withRouter(SecondarySection);
