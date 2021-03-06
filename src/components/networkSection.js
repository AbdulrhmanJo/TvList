import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Arrow from "./arrow";

const slide = (network) => {
  return (
    <Link
      to={`/tv-shows/discover/${network[0].name}_${network[0].id}`}
      className="movies-content_networkSection-network"
      key={network[0].id}
    >
      <div className="movies-content_networkSection-network-box">
        <div className="movies-content_networkSection-network-box--img">
          <img
            src={`https://image.tmdb.org/t/p/w342${network[1].logos[0].file_path}`}
            alt={network[0].name}
            width="100%"
          />
        </div>
      </div>
    </Link>
  );
};
const NetworkSection = (props) => {
  const { name, networks } = props;
  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <Arrow type="prev" />,
    nextArrow: <Arrow type="next" />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="movies-content_networkSection">
      <div className="movies-content_networkSection-header">
        <h1 className="movies-content_networkSection-header--name">{name}</h1>
      </div>
      <Slider {...settings}>{networks.map((network) => slide(network))}</Slider>
    </div>
  );
};

export default NetworkSection;
