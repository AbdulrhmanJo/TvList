import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getInitialData } from './Actions/shared'
// getMovies()

class App extends Component {
  componentDidMount(){
    this.props.dispatch(getInitialData())
  }
  render(){
    console.log(this.props);
    
    return (
      <div className="App">
       hello world
      </div>
    )
  }
}

const mapStateToProps = ({movies}) => {
  return {
    movies
  }
}

export default connect(mapStateToProps)(App);
