export function getMovieInitialData() {
  return fetch("/movies").then(res => res.json());
}

export function getMoviesOfSection(section, page) {
    console.log(page);
    
  return fetch(`/movies/${section}/${page}`, {
  }).then(res => res.json());
}
