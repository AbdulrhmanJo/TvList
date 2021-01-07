import React from "react";
import { CgSearch } from "react-icons/cg";
import { connect } from "react-redux";
const Menu = ({ lists, open }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="menu">
      <div className="menu-search">
        <input
          type="text"
          placeholder="Search..."
          className="menu-search--input"
        />
        <CgSearch className="menu-search--icon" />
      </div>
      <div className="menu-lists">
        <p className="menu-lists-title">Lists</p>
        {Object.entries(lists).length > 0 ? (
          Object.entries(lists).map((list, index) => (
            <div key={index} className="menu-lists-list">
              <p className="menu-lists-list--title">{list[1].name}</p>
              <button className="menu-lists-list--btn">Add</button>
            </div>
          ))
        ) : (
          <p className="menu-lists--status">No list found</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ lists }) => {
  return { lists };
};

export default connect(mapStateToProps)(Menu);
