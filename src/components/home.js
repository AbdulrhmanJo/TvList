import React from "react";
import Profile from "./profile";
import Lists from "./List";
import { connect } from "react-redux";
const Home = (props) => {
  return (
    <div className="home">
      <Profile />
      <Lists lists={props.lists} />
    </div>
  );
};

const mapStateToProps = ({ lists }) => {
  return { lists };
};

export default connect(mapStateToProps)(Home);
