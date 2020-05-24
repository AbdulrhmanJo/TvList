import React, { Component } from "react";
import Movie from "./movie";
import { withRouter } from "react-router-dom";
class MoreLikeThis extends Component {
  render() {
    const { data, match } = this.props;
    return (
      <div className="mlt">
        {data.map((item) => (
          <Movie
            key={item.id}
            movie={item}
            place="section"
            type={match.url.indexOf("movies") !== -1 ? "/movies" : "/tv-shows"}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(MoreLikeThis);
