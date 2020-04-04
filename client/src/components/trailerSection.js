import React from "react";
import Slider from "react-slick";
import ReactPlayer from "react-player";

const slide = trailer => {
  return (
    <div key={trailer[0].id} className="movies-content_trailerSection-trailer">
      <ReactPlayer
        className="movies-content_trailerSection-trailer--player"
        url={`https://www.youtube.com/watch?v=${trailer[0].key}`}
        light
        width="100%"
        controls
      />
    </div>
  );
};

const getTrailer = videos => {
  let trailer = [];
  videos.forEach(video => {
    trailer.push(video.results.filter(option => option.type === "Trailer"));
  });

  return trailer;
};

const TrailerSection = props => {
  const { name, videos } = props;
  console.log(videos);
  
  const trailers = getTrailer(videos);

  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1
  };
  return (
    <div className="movies-content_trailerSection">
      <div className="movies-content_trailerSection-header">
        <h1 className="movies-content_trailerSection-header--name">{name}</h1>
      </div>
      <Slider {...settings}>{trailers.map(trailer => slide(trailer))}</Slider>
    </div>
  );
};

export default TrailerSection;
