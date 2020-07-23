import React, { Component } from "react";
import Slider from "react-slick";
import Arrow from "./arrow";
import { AiTwotoneStar } from "react-icons/ai";
import SyncLoader from "react-spinners/SyncLoader";
import { AiOutlineFileImage } from "react-icons/ai";

function imagesLoaded(parentNode) {
  const imgElements = [...parentNode.querySelectorAll("img")];
  for (let i = 0; i < imgElements.length; i += 1) {
    const img = imgElements[i];
    if (!img.complete) {
      return false;
    }
  }
  return true;
}

class Slide extends Component {
  componentDidMount() {
    if (!this.props.episode.still_path) {
      this.props.handleImageChange(false);
    }
  }
  render() {
    const { episode } = this.props;

    return (
      <div className="episode">
        <div className="episode-content">
          <div className="episode-box--img">
            <div>
              {episode.still_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w342${episode.still_path}`}
                  alt={episode.name}
                  width="100%"
                  onLoad={this.props.handleImageChange}
                  onError={this.props.handleImageChange}
                />
              ) : (
                <div>
                  <AiOutlineFileImage size={40} />
                </div>
              )}
            </div>
          </div>

          <div className="episode-content--overlay">
            <div className="episode-content--overlay-rate">
              <AiTwotoneStar size={13} />
              <p>{Math.round(episode.vote_average * 10) / 10}</p>
            </div>
            <p>{episode.air_date}</p>
          </div>
        </div>

        <div className="episode-title">
          {`Ep${episode.episode_number}: ${episode.name}`}
        </div>
      </div>
    );
  }
}

class Seasons extends Component {
  state = {
    season_number: 1,
    loading: true,
  };

  renderSpinner() {
    if (!this.state.loading) {
      return null;
    }
    return (
      <div className="loader">
        <SyncLoader
          loading={this.state.loading}
          size={25}
          color={"rgb(243, 45, 88)"}
        />
      </div>
    );
  }

  handleImageChange = (isTrue) => {
    this.setState({
      loading: isTrue ? !imagesLoaded(this.episodesElement) : isTrue,
    });
  };

  render() {
    const settings = {
      speed: 700,
      rows: 2,
      slidesPerRow: 3,
      prevArrow: <Arrow type="prev" />,
      nextArrow: <Arrow type="next" />,
    };
    const { data } = this.props;
    const { season_number, loading } = this.state;
    return (
      <div className="seasons">
        <div className="seasons-header">
          <p className="seasons-header--text">Season</p>
          <div className="seasons-header--pagination">
            {data.map((season, index) => (
              <button
                key={season.id}
                className={
                  season_number === index + 1
                    ? "seasons-header--pagination-num active"
                    : "seasons-header--pagination-num"
                }
                onClick={() =>
                  this.setState({ season_number: index + 1, loading: true })
                }
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div
          className="seasons-section"
          ref={(element) => {
            this.episodesElement = element;
          }}
        >
          {this.renderSpinner()}
          <Slider {...settings}>
            {data[season_number - 1].episodes.map((episode) => (
              <div key={data[season_number - 1].id}>
                <Slide
                  episode={episode}
                  handleImageChange={this.handleImageChange}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}

export default Seasons;
