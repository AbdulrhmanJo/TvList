import React, { Component } from "react";
import { GoSearch } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Redirect, withRouter } from "react-router-dom";

class Navbar extends Component {
  state = {
    input: "",
    flag: true,
  };
  onScroll = () => {
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
      document.querySelector(".navbar").classList.add("navbar-scroll");
      document
        .querySelector(".navbar-search")
        .classList.add("navbar-search--active");
    } else {
      document
        .querySelector(".navbar-search")
        .classList.remove("navbar-search--active");
      document.querySelector(".navbar").classList.remove("navbar-scroll");
    }
  };
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value });
    // if (this.state.flag) {
    //   this.props.history.push("/search");
    //   this.setState({ flag: false });
    // } else if (this.state.input.length === 0) {
    //   this.props.history.goBack();
    //   this.setState({ flag: true });
    // }
  };

  render() {
    return (
      <div className="navbar">
        <div className="navbar-search">
          <GoSearch size={16} className="navbar-search--icon" />
          <input
            className="navbar-search--input"
            placeholder="search..."
            onChange={this.handleChange}
            value={this.state.input}
          />
        </div>
        <div className="navbar-account">
          <IoMdNotificationsOutline
            size={27}
            className="navbar-account--notification"
          />
          <div className="navbar-account--person">
            <p>A</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
