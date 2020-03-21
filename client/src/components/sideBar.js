import React, { Component } from "react";
import SidebarList from "./sidebarList";
import {
  AiOutlineHome,
  AiOutlineVideoCamera,
  AiOutlinePlayCircle
} from "react-icons/ai";
class Sidebar extends Component {
  render() {
    return (
      <nav className="sidebar">
        <div className="logo">
          <p>Something</p>
        </div>
        <SidebarList
          items={["home", "movies", "TV_shows"]}
          icons={[
            <AiOutlineHome
              size={20}
              className="sidebar-list_item--icon"
            />,
            <AiOutlineVideoCamera
              size={20}
              className="sidebar-list_item--icon"
            />,
            <AiOutlinePlayCircle
              size={20}
              className="sidebar-list_item--icon"
            />]}
          title="Discover"
        />
      </nav>
    );
  }
}

export default Sidebar;
