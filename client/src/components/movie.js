import React from "react";

const Movie = props => {
  const { movie } = props;
  return (
    <div className="movies-content_SecondarySection-movie">
      <img
        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
        alt={`${movie.title}`}
        className="movies-content_SecondarySection-movie--img"
      />
      {/* <p className="movies-content_SecondarySection-movie--title">{props.type === "/movies" ? movie.title : movie.name}</p> */}
    </div>
  );
};

export default Movie;
