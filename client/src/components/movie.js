import React from "react";

const Movie = props => {
    const {movie} = props
  return (
    <div className="movies-content_SecondarySection-movie">
      <img
        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
        alt={`${movie.title}`}
        className="movies-content_SecondarySection-movie--img"
      />
    </div>
  );
};

export default Movie;
