import React from "react";
import Slider from "react-slick";
import { Link, withRouter } from "react-router-dom";
import Arrow from "./arrow";
import { FiUser } from "react-icons/fi";

const slide = (person, path) => {
  return (
    <Link
      to={`/person/${person.id}`}
      key={person.id}
      className="movie-bottom_genreSection-person"
    >
      <div className="movie-bottom_genreSection-person-box">
        <div className="movie-bottom_genreSection-person-box--img">
          {person.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w342${person.profile_path}`}
              alt={person.name}
              width="100%"
            />
          ) : (
            <FiUser size={65} color="#f32d58" />
          )}
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

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: cast.cast.length > 6 ? 6 : cast.cast.length,
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
