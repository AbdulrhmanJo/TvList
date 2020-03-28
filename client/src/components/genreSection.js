import React from "react";
import Slider from "react-slick";
import { getIcon } from "../utils/images";
import { Link } from "react-router-dom";

const slide = genre => {
  return (
    <Link
      to={`/movies/${genre.name.replace(" ", "-").toLowerCase()}`}
      key={genre.id}
      className="movies-content_genreSection-genre"
    >
      <div className="movies-content_genreSection-genre-box">
        <div className="movies-content_genreSection-genre-box--img">
          <img src={getIcon(genre.name)} alt="come" width="100%" />
        </div>
        <p className="movies-content_genreSection-genre-box--text">
          {genre.name}
        </p>
      </div>
    </Link>
  );
};

const GenreSection = props => {
  const { name, genres } = props;
  console.log(genres);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    rows: Math.ceil(genres.length / 7)
  };
  return (
    <div className="movies-content_genreSection">
      <div className="movies-content_genreSection-header">
        <h1 className="movies-content_genreSection-header--name">{name}</h1>
      </div>
      <Slider {...settings}>{genres.map(genre => slide(genre))}</Slider>
    </div>
  );
};

export default GenreSection;
