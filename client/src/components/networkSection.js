import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const slide = network => {
  return (
    <Link
      to={`tv-shows/${network.id}`}
      key={network.id}
      className="movies-content_networkSection-network"
    >
      <div className="movies-content_networkSection-network-box">
        <div className="movies-content_networkSection-network-box--img">
          <img src={`https://image.tmdb.org/t/p/w342${network.logos[0].file_path}`} alt={network.id} width="100%" />
        </div>
      </div>
    </Link>
  );
};
const NetworkSection = props => {
  const { name, networks } = props;
  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 4
  };
  return (
    <div className="movies-content_networkSection">
      <div className="movies-content_networkSection-header">
        <h1 className="movies-content_networkSection-header--name">{name}</h1>
      </div>
      <Slider {...settings}>{networks.map(network => slide(network))}</Slider>
    </div>
  );
};

export default NetworkSection;
