import React from "react";
import Slider from "react-slick";
import { getIcon } from "../utils/images";
import { Link, withRouter } from "react-router-dom";
import Arrow from "./arrow";

const slide = (genre, path) => {
  const Icon = getIcon(genre.name);
  return (
    <Link
      to={`${path}/genres/${genre.name.split(" ").join("_")}`}
      key={genre.id}
      className="movies-content_genreSection-genre"
    >
      <div className="movies-content_genreSection-genre-box">
        <div className="movies-content_genreSection-genre-box--img">
          <img src={Icon} alt={genre.name} width="100%" />
        </div>
        <p className="movies-content_genreSection-genre-box--text">
          {genre.name}
        </p>
      </div>
    </Link>
  );
};

const GenreSection = (props) => {
  const { name, genres } = props;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    rows: Math.ceil(genres.length / 7),
    // slidesToScroll: 6,
    prevArrow: <Arrow type="prev" />,
    nextArrow: <Arrow type="next" />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 6,
          rows: Math.ceil(genres.length / 7),
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
          rows: Math.ceil(genres.length / 7),
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 4,
          rows: Math.ceil(genres.length / 7),
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          rows: Math.ceil(genres.length / 7),
        },
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow:2,
          rows: Math.ceil(genres.length / 2),
        },
      },
    ],
  };
  return (
    <div className="movies-content_genreSection">
      <div className="movies-content_genreSection-header">
        <h1 className="movies-content_genreSection-header--name">{name}</h1>
      </div>
      <Slider {...settings}>
        {genres.map((genre) => slide(genre, props.match.path))}
      </Slider>
    </div>
  );
};

export default withRouter(GenreSection);
