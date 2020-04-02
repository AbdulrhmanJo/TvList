//movies
export function getMovieInitialData() {
  return fetch("/movies").then(res => res.json());
}

export function getMoviesOfSection(section, page) {
  return fetch(`/movies/${section}/${page}`).then(res => res.json());
}

export function getMoviesOfCategory(catagory, page) {
  return fetch(`/movies/${catagory}/${page}`).then(res => res.json());
}

//tv shows
export function getTvInitialData() {
  return fetch("/tv-shows").then(res => res.json());
}

export function getTvOfSection(section, page) {
  return fetch(`/tv-shows/${section}/${page}`).then(res => res.json());
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
