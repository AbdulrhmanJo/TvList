import React from "react";
import Slider from "react-slick";
import { Link, withRouter } from "react-router-dom";
import Arrow from "./arrow";

const slide = (person, path) => {
  // let genrre;
  //   if (genre.name.indexOf("&") !== -1) {
  //     const arr = genre.name.split("&");
  //     genrre = arr[0].trim() + "-" + arr[1].trim();
  //   } else {
  //     genrre = genre.name.replace(" ", "-");
  //   }
  console.log(person);

  return (
    <Link
      to={`/person/${person.id}`}
      key={person.id}
      className="movie-bottom_genreSection-person"
    >
      <div className="movie-bottom_genreSection-person-box">
        <div className="movie-bottom_genreSection-person-box--img">
          <img
            src={`https://image.tmdb.org/t/p/w342${person.profile_path}`}
            alt={person.name}
            width="100%"
          />
        </div>
        <div className="movie-bottom_genreSection-person-box--text">
          <p className="movie-bottom_genreSection-person-box--text-name">
            {person.name}
          </p>
          <p className="movie-bottom_genreSection-person-box--text-role">
            {person.character}
          </p>
        </div>
      </div>
    </Link>
  );
};

const CastSection = props => {
  const { name, cast } = props;
  console.log(cast);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    rows: 1,
    slidesToScroll: 6,
    prevArrow: <Arrow type="prev" />,
    nextArrow: <Arrow type="next" />
  };
  return (
    <div className="movie-bottom_genreSection">
      <div className="movie-bottom_genreSection-header">
        <h1 className="movie-bottom_genreSection-header--name">{name}</h1>
      </div>
      <Slider {...settings}>
        {[...cast.cast].map(person => slide(person, props.match.path))}
      </Slider>
    </div>
  );
};

export default withRouter(CastSection);
