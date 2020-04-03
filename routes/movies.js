const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const key = "api_key=0ccf6380a06c28412d00de81b5b1d24e";

/* images: {
    base_url: 'http://image.tmdb.org/t/p/',
    secure_base_url: 'https://image.tmdb.org/t/p/',
    backdrop_sizes: [ 'w300', 'w780', 'w1280', 'original' ],
    logo_sizes: [ 'w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original' ],
    poster_sizes: [ 'w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original' ],
    profile_sizes: [ 'w45', 'w185', 'h632', 'original' ],
    still_sizes: [ 'w92', 'w185', 'w300', 'original' ]
  },*/

function discover(type, page) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${type}?${key}&page=${page}`
  ).then(res => res.json());
}

function genre() {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?${key}`
  ).then(res => res.json());
}

function trending(type, time) {
  return fetch(
    `https://api.themoviedb.org/3/trending/${type}/${time}?${key}`
  ).then(res => res.json());
}

function getTrailer(id) {
  return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?${key}
    `).then(res => res.json());
}

function getMovieByGenre(genre, page) {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?${key}&sort_by=popularity.desc&page=${page}&with_genres=${genre}`
  ).then(res => res.json());
}

router.get("/", (req, res) => {
  Promise.all([
    discover("top_rated", 1),
    discover("popular", 1),
    discover("now_playing", 1),
    discover("upcoming", 1),
    trending("movie", "day"),
    genre()
  ]).then(data => {
    Promise.all([
      getTrailer(data[4].results[0].id),
      getTrailer(data[4].results[1].id),
      getTrailer(data[4].results[2].id),
      getTrailer(data[4].results[3].id),
      getTrailer(data[4].results[4].id),
      getTrailer(data[4].results[5].id)
    ]).then(trailers =>
      res.send({
        topRated: data[0],
        popular: data[1],
        nowPlaying: data[2],
        upComing: data[3],
        trending: data[4],
        genre: data[5],
        trailer: trailers
      })
    );
  });
});

// router.get("/:id", (req, res) => {
//   const id = req.params.id;
//   let section = "";
//   switch (id) {
//     case "in-theaters":
//       section = "now_playing";
//       break;
//     case "trending":
//       section = "trending";
//       break;
//     case "top-rated":
//       section = "top_rated";
//       break;
//     case "most-popular":
//       section = "popular";
//       break;
//   }
//   if (section === "trending") {
//     Promise.all([trending("movie", "week")]).then(data => res.send(data));
//   } else {
//     Promise.all([discover(section, 1)]).then(data => res.send(data));
//   }
// });

router.get("/:id/:page", (req, res) => {
  const page = req.params.page;
  const id = req.params.id;
  let section = "";
  switch (id) {
    case "now-playing":
      section = "now_playing";
      break;
    case "trending":
      section = "trending";
      break;
    case "top-rated":
      section = "top_rated";
      break;
    case "most-popular":
      section = "popular";
      break;
    default:
      section = id;
      break;
  }
  if (section === "trending") {
    Promise.all([trending("movie", "week")]).then(data => res.send(data));
  } else if (!isNaN(id)) {
    Promise.all([getMovieByGenre(section, page)]).then(data => res.send(data));
  } else {
    Promise.all([discover(section, page)]).then(data => res.send(data));
  }
});

module.exports = router;
