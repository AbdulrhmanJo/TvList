import React, { Component } from "react";
import { GoSearch } from "react-icons/go";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { search } from "../Actions/search";
class Navbar extends Component {
  state = {
    query: "",
    firstClick: true,
  };

  componentDidUpdate() {
    const { firstClick } = this.state;
    const { location } = this.props;
    if (location.pathname !== "/search" && !firstClick) {
      this.setState({ firstClick: true });
    }
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value }, () =>
      this.props.dispatch(search(this.state.query))
    );
  };

  handleClick = () => {
    const { history } = this.props;
    const { firstClick } = this.state;
    if (firstClick) {
      history.push("/search");
      this.setState({ firstClick: false });
    }
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
            onClick={this.handleClick}
          />
        </div>
        {/* <div className="navbar-account">
          <IoMdNotificationsOutline
            size={27}
            className="navbar-account--notification"
          />
          <div className="navbar-account--person">
            <p>A</p>
          </div>
        </div> */}
      </div>
    );
  }
}

export default withRouter(
  connect(({ search }) => {
    return {
      isEmpty: search !== null && search.length === 0,
    };
  })(Navbar)
);
