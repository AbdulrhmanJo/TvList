import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const slide = (person) => {
  return (
    <Link to={`/person/${person.id}`} key={person.id} className="cast-person">
      <div className="cast-person--box">
        <div className="cast-person--box-img">
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
        <div className="cast-person--box-text">
          <p className="cast-person--box-text--name">{person.name}</p>
          <p className="cast-person--box-text--role">{person.character}</p>
        </div>
      </div>
    </Link>
  );
};

class CastSection extends Component {
  state = {
    numberOfcards: 11,
    hasMore: false,
    reveal: false,
  };

  componentDidMount() {
    if (this.state.numberOfcards < this.props.cast.length) {
      this.setState({ hasMore: true });
    }
  }

  reveal = () => {
    this.setState({
      numberOfcards: this.props.cast.length,
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
    const { name, cast } = this.props;
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
      <div className="cast">
        <div className="cast-header">
          <p className="cast-header--text">{`${name}`}</p>
        </div>
        <div className="cast-section">
          {[...cast].map((person, index) => {
            if (cast.length <= numberOfcards) {
              return slide(person);
            } else if (index < numberOfcards) {
              return slide(person);
            }
          })}
          {cast.length > 11 &&
            (this.state.hasMore ? (
              <button className="cast-btn" onClick={this.reveal}>
                see all
              </button>
            ) : (
              <button className="cast-btn" onClick={this.unreveal}>
                see less
              </button>
            ))}
        </div>
      </div>
    );
  }
}

export default withRouter(CastSection);
