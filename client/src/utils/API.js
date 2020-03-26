export function getMovieInitialData() {
  return fetch("/movies").then(res => res.json());
}

export function getMoviesOfSection(section) {
  return fetch(`/movies/${section}`).then(res => res.json());
}
