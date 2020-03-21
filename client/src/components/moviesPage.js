import React, { Component } from "react";
import { connect } from "react-redux";
import NowPlaying from "./nowPlaying"

class MoviesPage extends Component {
  render() {
      const { movies } = this.props      
    return (
        <div className="movies-content">
            <NowPlaying movies={movies.nowPlaying}/>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}

export default connect(mapStateToProps)(MoviesPage);
