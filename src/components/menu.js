import React, { useEffect } from "react";
import { CgSearch } from "react-icons/cg";
import { connect } from "react-redux";
const Menu = ({ lists, open }) => {
  const arrLists = Object.entries(lists);
  const [inputVal, setInputVal] = React.useState("");
  const [tempLists, setTempLists] = React.useState(arrLists);
  const filterLists = (e) => {
    const value = e.target.value;
    setInputVal(value);
    if (value) {
      const filterdLists = Object.entries(lists).filter((list) =>
        list[1].name.includes(value)
      );
      setTempLists(filterdLists);
    } else {
      setTempLists(arrLists);
    }
  };

  //   useEffect(() => {
  //     setTempLists(lists);
  //   }, [lists]);

  if (!open) {
    return null;
  }

  return (
    <div className="menu">
      <div className="menu-search">
        <input
          value={inputVal}
          type="text"
          placeholder="Search..."
          className="menu-search--input"
          onChange={filterLists}
        />
        <CgSearch className="menu-search--icon" />
      </div>
      <div className="menu-lists">
        <p className="menu-lists-title">Lists</p>
        {tempLists.length > 0 ? (
          tempLists.map((list, index) => (
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
