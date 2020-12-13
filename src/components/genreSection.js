import React from "react";
import { getIcon } from "../utils/images";
import { Link, withRouter } from "react-router-dom";

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
  let { name, genres } = props;

  genres = genres.filter((genre) => genre.name !== "TV Movie");

  // const settings = {
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: props.num,
  //   rows: Math.ceil(genres.length / props.num),
  //   // slidesToScroll: 6,
  //   prevArrow: <Arrow type="prev" />,
  //   nextArrow: <Arrow type="next" />,
  //   responsive: [
  //     {
  //       breakpoint: 1300,
  //       settings: {
  //         slidesToShow: 5,
  //         rows: Math.ceil(genres.length / 5),
  //       },
  //     },
  //     {
  //       breakpoint: 800,
  //       settings: {
  //         slidesToShow: 4,
  //         rows: Math.ceil(genres.length / 4),
  //       },
  //     },
  //     {
  //       breakpoint: 700,
  //       settings: {
  //         slidesToShow: 3,
  //         rows: Math.ceil(genres.length / 3),
  //       },
  //     },
  //     {
  //       breakpoint: 550,
  //       settings: {
  //         slidesToShow: 2,
  //         rows: Math.ceil(genres.length / 2),
  //       },
  //     },
  //     // {
  //     //   breakpoint: 440,
  //     //   settings: {
  //     //     slidesToShow: 1,
  //     //     rows: Math.ceil(genres.length / 1),
  //     //   },
  //     // },
  //   ],
  // };
  return (
    <div className="movies-content_genreSection">
      <div className="movies-content_genreSection-header">
        <h1 className="movies-content_genreSection-header--name">{name}</h1>
      </div>
      <div className="genreWrapper">
        {genres.map((genre) => slide(genre, props.match.path))}
      </div>
    </div>
  );
};

export default withRouter(GenreSection);
