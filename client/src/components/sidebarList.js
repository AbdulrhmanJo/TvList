import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const SidebarList = props => {
  const { items, icons, title } = props;
  return (
    <ul className="sidebar-list">
      <p className="sidebar-list_title">{title}</p>
      {items.map((item, index) => (
        <li key={item}>
          <NavLink
            exact to={item === "home" ? "/" : `/${item.replace("_", "").toLowerCase()}`}
            className="sidebar-list_item"
            activeClassName="sidebar-list_item--active"
          >
            {icons[index]}
            <span className="sidebar-list_item--text">{item.replace("_", " ")}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default withRouter(SidebarList);
