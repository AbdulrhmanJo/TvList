import React from "react";
import Slider from "react-slick";
import { getIcon } from '../utils/images'

const slide = genre => {
    
  return (
    <div key={genre.id} className="movies-content_genreSection-genre">
      <div className="movies-content_genreSection-genre-box">
        <div className="movies-content_genreSection-genre-box--img">
          <img
            src={getIcon(genre.name)}
            alt="come"
            width="100%"
          />
        </div>
        <p className="movies-content_genreSection-genre-box--text">
          {genre.name}
        </p>
      </div>
    </div>
  );
};

const GenreSection = props => {
  const { name, genres } = props;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 6,
    rows: 3
  };
  return (
    <div className="movies-content_genreSection">
      <div className="movies-content_genreSection-header">
        <h1 className="movies-content_genreSection-header--name">{name}</h1>
      </div>
      <Slider {...settings}>{genres.genres.map(genre => slide(genre))}</Slider>
    </div>
  );
};

export default GenreSection;