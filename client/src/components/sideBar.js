import React, { Component } from "react";
import SidebarList from "./sidebarList";
import {
  AiFillVideoCamera,
  AiOutlineVideoCamera,
  AiFillPlayCircle,
  AiOutlinePlayCircle
} from "react-icons/ai";
class Sidebar extends Component {
  render() {
    return (
      <nav className="sidebar">
        <div className="logo">
          <h1>TV List</h1>
        </div>
        <SidebarList items={["home", "movies", "tv shows"]} />
      </nav>
    );
  }
}

export default Sidebar;
