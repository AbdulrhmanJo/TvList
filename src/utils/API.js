const API = "https://api.themoviedb.org/3"
const KEY = "0ccf6380a06c28412d00de81b5b1d24e"

//movies

//this function used to get all the data we need in movies main page
export function getMovieInitialData() {
  return Promise.all([
      fetch(`${API}/movie/top_rated?api_key=${KEY}`),
      fetch(`${API}/movie/popular?api_key=${KEY}`),
      fetch(`${API}/movie/now_playing?api_key=${KEY}`),
      fetch(`${API}/trending/movie/week?api_key=${KEY}`),
      fetch(`${API}/genre/movie/list?api_key=${KEY}`),
    ])
    .then(res =>
      Promise.all(res.map(r => r.json()))
      .then(data => (
        Promise.all([
          fetch(`${API}/movie/${data[3].results[0].id}/videos?api_key=${KEY}`),
          fetch(`${API}/movie/${data[3].results[1].id}/videos?api_key=${KEY}`),
          fetch(`${API}/movie/${data[3].results[2].id}/videos?api_key=${KEY}`),
          fetch(`${API}/movie/${data[3].results[3].id}/videos?api_key=${KEY}`),
          fetch(`${API}/movie/${data[3].results[4].id}/videos?api_key=${KEY}`),
          fetch(`${API}/movie/${data[3].results[5].id}/videos?api_key=${KEY}`)
        ])
        .then(tr =>
          Promise.all(tr.map(t => t.json()))
          .then(trailers => ({
            topRated: data[0],
            popular: data[1],
            nowPlaying: data[2],
            trending: data[3],
            genre: data[4],
            trailer: trailers
          })))
      )))
}
//this function used to get movies by section ex: trending
export function getMoviesOfSection(section, page) {
  section = section.toLowerCase();
  if (section === "trending") {
    return fetch(`${API}/${section}/movie/week?api_key=${KEY}`)
      .then(res => res.json());
  } else {
    return fetch(
      `${API}/movie/${section}?api_key=${KEY}&page=${page}`
    ).then(res => res.json());
  }
}
//this function used to get movies by genre ex: action
export function getMoviesOfCategory(catagory, page) {
  return fetch(
    `${API}/discover/movie?api_key=${KEY}&sort_by=popularity.desc&page=${page}&with_genres=${catagory}`
  ).then(res => res.json());
}
//this fuction used to get derails of specific movie
export function getMovieDetails(id) {
  return fetch(`${API}/movie/${id}?api_key=${KEY}&append_to_response=credits%2Csimilar%2Cvideos`)
    .then(res => res.json());
}

//tv shows

//this function used to get all the data we need in tv shows main page
export function getTvInitialData() {
  return Promise.all([
      fetch(`${API}/tv/popular?api_key=${KEY}`),
      fetch(`${API}/tv/top_rated?api_key=${KEY}`),
      fetch(`${API}/tv/on_the_air?api_key=${KEY}`),
      fetch(`${API}/trending/tv/week?api_key=${KEY}`),
      fetch(`${API}/genre/tv/list?api_key=${KEY}`),
    ])
    .then(res =>
      Promise.all(res.map(r => r.json()))
      .then(data =>
        Promise.all([
          fetch(`${API}/tv/${data[3].results[0].id}/videos?api_key=${KEY}`),
          fetch(`${API}/tv/${data[3].results[1].id}/videos?api_key=${KEY}`),
          fetch(`${API}/tv/${data[3].results[2].id}/videos?api_key=${KEY}`),
          fetch(`${API}/tv/${data[3].results[3].id}/videos?api_key=${KEY}`),
          fetch(`${API}/tv/${data[3].results[4].id}/videos?api_key=${KEY}`),
          fetch(`${API}/tv/${data[3].results[5].id}/videos?api_key=${KEY}`),
        ]).then(tra =>
          Promise.all(tra.map(t => t.json()))
          .then(trailers => Promise.all([
            getNetworks(213),
            getNetworks(49),
            getNetworks(2552),
            getNetworks(67),
            getNetworks(453),
            getNetworks(2739),
            getNetworks(1024),
            getNetworks(1709),
            getNetworks(1436),
            getNetworks(318)
          ]).then(networks => ({
            popular: data[0],
            topRated: data[1],
            onTV: data[2],
            trending: data[3],
            genre: data[4],
            trailer: trailers,
            networks: networks
          })))
        )))
}
//this function used to get all the tv shows in specific section like : on tv
export function getTvOfSection(section, page) {
  section = section.toLowerCase();
  if (section === "trending") {
    return fetch(`${API}/trending/tv/week?api_key=${KEY}`).then(data => data.json());
  } else {
    section = section === "on_tv" ? "on_the_air" : section;
    return fetch(`https://api.themoviedb.org/3/tv/${section}?api_key=${KEY}&page=${page}`)
      .then(res => res.json());
  }
}
//this function used to get all the tv shows in specific genre like : Action
export function getTvOfCategory(catagory, page) {
  return fetch(`${API}/discover/tv?api_key=${KEY}&sort_by=popularity.desc&page=${page}&with_genres=${catagory}`)
    .then(res => res.json());
}
//this function used to get all the tv shows in specific network like : netflix
export function getTvOfNetwork(netwrokId, page) {
  return fetch(
    `${API}/discover/tv?api_key=${KEY}&sort_by=popularity.desc&page=${page}&with_networks=${netwrokId}`
  ).then(res => res.json());
}
//this function used to get all the tv show details
export function getTvDetails(id) {
  return fetch(`${API}/tv/${id}?api_key=${KEY}&append_to_response=credits%2Csimilar%2Cvideos`)
    .then(data => data.json())
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

//search
export function search(query) {
  return fetch(`/search/${query}`).then(res => res.json())
}

// util
function getNetworks(id) {
  return Promise.all([
      fetch(`${API}/network/${id}?api_key=${KEY}`),
      fetch(`${API}/network/${id}/images?api_key=${KEY}`)
    ])
    .then(data => Promise.all(data.map(d => d.json())))
    .then(networks => networks);
}