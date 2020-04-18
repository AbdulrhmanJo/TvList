import React from "react";
import Slider from "react-slick";
import { getIcon } from "../utils/images";
import { Link, withRouter } from "react-router-dom";
import Arrow from "./arrow";

const slide = (genre, path) => {
  const Icon = getIcon(genre.name);
  let genrre;
  if (genre.name.indexOf("&") !== -1) {
    const arr = genre.name.split("&");
    genrre = arr[0].trim() + "-" + arr[1].trim();
  } else {
    genrre = genre.name.replace(" ", "-");
  }
  return (
    <Link
      to={`${path}/genre/${genrre.toLowerCase()}`}
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
    slidesToShow: 5,
    rows: Math.round(genres.length/5),
    // slidesToScroll: 6,
    prevArrow: <Arrow type="prev" />,
    nextArrow: <Arrow type="next" />,
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
