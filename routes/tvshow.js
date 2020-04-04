const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const key = "api_key=0ccf6380a06c28412d00de81b5b1d24e";

function getNetwork(id) {
  return fetch(`https://api.themoviedb.org/3/network/${id}/images?${key}`).then(res =>
    res.json()
  );
}

function trending(type, time) {
  return fetch(
    `https://api.themoviedb.org/3/trending/${type}/${time}?${key}`
  ).then(res => res.json());
}

function discover(type, page) {
  return fetch(
    `https://api.themoviedb.org/3/tv/${type}?${key}&page=${page}`
  ).then(res => res.json());
}

function genre() {
  return fetch(`https://api.themoviedb.org/3/genre/tv/list?${key}`).then(res =>
    res.json()
  );
}

function getTrailer(id) {
  return fetch(`https://api.themoviedb.org/3/tv/${id}/videos?${key}
    `).then(res => res.json());
}

function getTvByGenre(genre, page) {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?${key}&sort_by=popularity.desc&page=${page}&with_genres=${genre}`
  ).then(res => res.json());
}

router.get("/", (req, res) => {
  Promise.all([
    discover("popular", 1),
    discover("top_rated", 1),
    discover("on_the_air", 1),
    trending("tv", "day"),
    genre()
  ]).then(data => {
    Promise.all([
      getTrailer(data[2].results[0].id),
      getTrailer(data[2].results[1].id),
      getTrailer(data[2].results[2].id),
      getTrailer(data[2].results[3].id),
      getTrailer(data[2].results[4].id),
      getTrailer(data[2].results[5].id)
    ]).then(trailers =>
      Promise.all([
        getNetwork(213),
        getNetwork(49),
        getNetwork(2552),
        getNetwork(67),
        getNetwork(453),
        getNetwork(2739),
        getNetwork(1024),
        getNetwork(1709),
        getNetwork(1436),
        getNetwork(318),
      ]).then(networks =>
        res.send({
          popular: data[0],
          topRated: data[1],
          onTV: data[2],
          trending: data[3],
          genre: data[4],
          trailer: trailers,
          networks: networks
        })
      )
    );
  });
});

router.get("/:id/:page", (req, res) => {
  const page = req.params.page;
  const id = req.params.id;
  let section = "";
  switch (id) {
    case "on-tv":
      section = "on_the_air";
      break;
    case "trending":
      section = "trending";
      break;
    case "top-rated":
      section = "top_rated";
      break;
    case "popular":
      section = "popular";
      break;
    default:
      section = id;
      break;
  }
  if (section === "trending") {
    Promise.all([trending("tv", "week")]).then(data => res.send(data));
  } else if (!isNaN(id)) {
    Promise.all([getTvByGenre(section, page)]).then(data => res.send(data));
  } else {
    Promise.all([discover(section, page)]).then(data => res.send(data));
  }
});

module.exports = router;
