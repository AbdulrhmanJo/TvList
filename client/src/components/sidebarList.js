import React from "react";
import { NavLink } from "react-router-dom";

const SidebarList = props => {
  const items = props.items;
  return (
    <ul className="sidebar-list">
      {items.map(item => (
        <li key={item}>
          <NavLink
            to={item === "home" ? "/" : `/${item.replace(" ", "-")}`}
            className="sidebar-list_item"
            activeClassName="sidebar-list_item--active"
          >
            {item}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default SidebarList;
