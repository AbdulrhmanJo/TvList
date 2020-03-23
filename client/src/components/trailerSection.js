import React from "react";
import Slider from "react-slick";
import ReactPlayer from "react-player";

const slide = trailer => {
  return (
    <div className="movies-content_trailerSection-trailer">
      <ReactPlayer
        className="movies-content_trailerSection-trailer--player"
        url={trailer}
        light
        width="100%"
      />
    </div>
  );
};

const TrailerSection = props => {
  const { name } = props;
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
      <Slider {...settings}>
        {[
          "https://www.youtube.com/watch?v=F95Fk255I4M",
          "https://www.youtube.com/watch?v=rlR4PJn8b8I",
          "https://www.youtube.com/watch?v=WJTd1iSch94"
        ].map(trailer => slide(trailer))}
      </Slider>
    </div>
  );
};

export default TrailerSection;
