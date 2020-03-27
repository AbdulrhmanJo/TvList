export function getMovieInitialData() {
  return fetch("/movies").then(res => res.json());
}

export function getMoviesOfSection(section, page) {
  return fetch(`/movies/${section}/${page}`).then(res => res.json());
}

export function getMoviesOfCategory(catagory, page) {
  return fetch(`/movies/${catagory}/${page}`).then(res => res.json());
}
