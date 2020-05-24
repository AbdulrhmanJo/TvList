import React, { Component } from "react";
import { GoSearch } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { withRouter } from "react-router-dom";
import { search } from "../utils/API";

class Navbar extends Component {
  state = {
    query: "",
  };
  // onScroll = () => {
  //   if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
  //     document.querySelector(".navbar").classList.add("navbar-scroll");
  //     document
  //       .querySelector(".navbar-search")
  //       .classList.add("navbar-search--active");
  //   } else {
  //     document
  //       .querySelector(".navbar-search")
  //       .classList.remove("navbar-search--active");
  //     document.querySelector(".navbar").classList.remove("navbar-scroll");
  //   }
  // };
  // componentDidMount() {
  //   // window.addEventListener("scroll", this.onScroll);
  // }

  componentDidUpdate() {
    const { query } = this.state;
    const { history, location } = this.props;
    if (query.length > 0 && location.pathname !== "/search") {
      history.push("/search");
      search(query).then((data) => console.log(data));
    } else if (query.length === 0 && location.pathname === "/search") {
      history.goBack();
    }
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value });
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
            value={this.state.query}
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
