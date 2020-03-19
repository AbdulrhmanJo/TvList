const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const key = "api_key=0ccf6380a06c28412d00de81b5b1d24e"

/* images: {
    base_url: 'http://image.tmdb.org/t/p/',
    secure_base_url: 'https://image.tmdb.org/t/p/',
    backdrop_sizes: [ 'w300', 'w780', 'w1280', 'original' ],
    logo_sizes: [ 'w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original' ],
    poster_sizes: [ 'w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original' ],
    profile_sizes: [ 'w45', 'w185', 'h632', 'original' ],
    still_sizes: [ 'w92', 'w185', 'w300', 'original' ]
  },*/

function discover(type){
    return fetch(`https://api.themoviedb.org/3/movie/${type}?${key}`)
    .then(res => res.json())
}

function genre(){
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?${key}`)
    .then(res => res.json())
}

router.get('/', (req, res) => {
    Promise.all([
        discover('top_rated'),
        discover('popular'),
        discover('now_playing'),
        discover('latest'),
        discover('upcoming'),
        genre(),
    ])
    .then(data => res.send({
        topRated: data[0],
        popular: data[1],
        nowPlaying: data[2],
        latest: data[3],
        upComing: data[4],
        genre: data[5]
    }))
})


module.exports = router;