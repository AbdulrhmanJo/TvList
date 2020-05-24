import React from "react";
import Slider from "react-slick";
import ReactPlayer from "react-player";
import Arrow from "./arrow";

const slide = (trailer) => {
  return (
    <div key={trailer.id} className="movies-content_trailerSection-trailer">
      <ReactPlayer
        className="movies-content_trailerSection-trailer--player"
        url={`https://www.youtube.com/watch?v=${trailer.key}`}
        light
        width="100%"
        // height="25rem"
        controls
        playing
      />
    </div>
  );
};

const getTrailer = (videos) => {
  let trailer = [];
  videos.forEach((video) => {
    trailer.push(video.results.filter((option) => option.type === "Trailer"));
  });

  return trailer;
};

const TrailerSection = (props) => {
  const { name, videos, type } = props;
  const trailers = type === "all" ? videos.results : getTrailer(videos);
  
  const settings = {
    lazyLoad: true,
    infinite: trailers.length > 2,
    speed: 700,
    slidesToShow: 2,
    rows: 1,
    slidesToScroll: 1,
    prevArrow: <Arrow type="prev" />,
    nextArrow: <Arrow type="next" />,
  };
  return (
    <div className="movies-content_trailerSection">
      <div className="movies-content_trailerSection-header">
        <h1 className="movies-content_trailerSection-header--name">{name}</h1>
      </div>
      <Slider {...settings}>
        {type === "all"
          ? trailers.map((trailer) => slide(trailer))
          : trailers.map((trailer) => trailer.length > 0 && slide(trailer[0]))}
      </Slider>
    </div>
  );
};

export default TrailerSection;
