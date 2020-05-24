import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const Slide = (props) => {
  const { person } = props;
  return (
    <Link
      to={`/person/${person.id}`}
      className="movie-bottom_genreSection-person"
    >
      <div className="movie-bottom_genreSection-person-box">
        <div className="movie-bottom_genreSection-person-box--img">
          {person.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w342${person.profile_path}`}
              alt={person.name}
              width="100%"
            />
          ) : (
            <FiUser size={45} color="#f32d58" />
          )}
        </div>
        <div className="movie-bottom_genreSection-person-box--text">
          <p className="movie-bottom_genreSection-person-box--text-name">
            {person.name}
          </p>
          <p className="movie-bottom_genreSection-person-box--text-role">
            {person.job}
          </p>
        </div>
      </div>
    </Link>
  );
};

class CrewSection extends Component {
  state = {
    numberOfcards: 11,
    hasMore: false,
    reveal: false,
  };

  componentDidMount() {
    if (this.state.numberOfcards < this.props.crew.length) {
      this.setState({
        hasMore: true,
      });
    }
  }

  reveal = () => {
    this.setState({
      numberOfcards: this.props.crew.length,
      reveal: true,
      hasMore: false,
    });
  };
  unreveal = () => {
    this.setState({
      numberOfcards: 11,
      reveal: false,
      hasMore: true,
    });
  };
  render() {
    const { name, crew } = this.props;
    const { numberOfcards } = this.state;
    // const settings = {
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: cast.cast.length > 6 ? 6 : cast.cast.length,
    //   rows: 1,
    //   slidesToScroll: 6,
    //   prevArrow: <Arrow type="prev" />,
    //   nextArrow: <Arrow type="next" />
    // };
    return (
      <div className="movie-bottom_genreSection">
        <div className="movie-bottom_genreSection-header">
          <h1 className="movie-bottom_genreSection-header--name">
            {`${name}`} <span>{`${crew.length}`}</span>{" "}
          </h1>
        </div>
        <div className="movie-bottom_genreSection-cast">
          {[...crew].map((person, index) => {
            if (crew.length <= numberOfcards) {
              return <Slide person={person} key={person.credit_id} />;
            } else if (index < numberOfcards) {
              return <Slide person={person} key={person.credit_id} />;
            }
          })}
          {this.state.hasMore ? (
            <button
              className="movie-bottom_genreSection-cast-btn"
              onClick={this.reveal}
            >
              see all
            </button>
          ) : (
            <button
              className="movie-bottom_genreSection-cast-btn"
              onClick={this.unreveal}
            >
              see less
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(CrewSection);
