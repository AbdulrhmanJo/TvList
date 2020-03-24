import React from "react";

const Movie = props => {
    const {movie} = props
  return (
    <div key={movie.id} className="movies-content_SecondarySection-movie">
      <img
        key={movie.id}
        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
        alt={`${movie.title}`}
        className="movies-content_SecondarySection-movie--img"
      />
    </div>
  );
};

export default Movie;
