//movies
export function getMovieInitialData() {
  return fetch("/movies").then(res => res.json());
}

export function getMoviesOfSection(section, page) {
  return fetch(`/movies/discover/${section}/${page}`).then(res => res.json());
}

export function getMoviesOfCategory(catagory, page) {
  return fetch(`/movies/discover/${catagory}/${page}`).then(res => res.json());
}
export function getMovieDetails(id) {
  return fetch(`/movies/${id}`).then(res => res.json());
}

//tv shows
export function getTvInitialData() {
  return fetch("/tv-shows").then(res => res.json());
}

export function getTvOfSection(section, page) {
  return fetch(`/tv-shows/${section}/${page}`).then(res => res.json());
}

export function getTvOfCategory(catagory, page) {
  return fetch(`/tv-shows/${catagory}/${page}`).then(res => res.json());
}

export function getTvOfNetwork(netwrokId, page) {
  return fetch(`/tv-shows/${netwrokId}s/${page}`).then(res => res.json());
}

export function getTvDetails(id) {
  return fetch(`/tv-shows/${id}`).then(res => res.json());
}

//initial data
export function getInitialData() {
  return Promise.all([getMovieInitialData(), getTvInitialData()]).then(
    ([movies, tvShows]) => ({
      movies,
      tvShows
    })
  );
}
