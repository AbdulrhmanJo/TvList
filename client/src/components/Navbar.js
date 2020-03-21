import React, { Component } from "react";
import { GoSearch } from "react-icons/go";


class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar-search">
          <GoSearch size={16} className="navbar-search--icon"/>
          <p className="navbar-search--input">Search...</p>
        </div>
      </div>
    );
  }
}

export default Navbar;
