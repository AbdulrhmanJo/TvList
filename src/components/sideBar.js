import React, { Component } from "react";
import { BiMovie } from "react-icons/bi";
import SidebarList from "./sidebarList";
import {
  AiOutlineHome,
  AiOutlineVideoCamera,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import Navbar from "./Navbar";
class Sidebar extends Component {
  render() {
    return (
      <nav className="sidebar">
        <div className="sidebar-wrapper">
          <div className="logo">
            <BiMovie className="logo-icon" />
          </div>
          <SidebarList
            items={["movies", "TV-shows"]}
            icons={[
              <AiOutlineHome size={20} className="sidebar-list_item--icon" />,
              <AiOutlineVideoCamera
                size={20}
                className="sidebar-list_item--icon"
              />,
              <AiOutlinePlayCircle
                size={20}
                className="sidebar-list_item--icon"
              />,
            ]}
            title="Discover"
          />
          <Navbar />
        </div>
      </nav>
    );
  }
}

export default Sidebar;
