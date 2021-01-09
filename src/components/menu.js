import React, { useEffect } from "react";
import { CgSearch } from "react-icons/cg";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { addShow, deleteShow } from "../Actions/list";
const Menu = ({ lists, open, showData, dispatch, closeMenu }) => {
  const arrLists = Object.entries(lists);
  const [inputVal, setInputVal] = React.useState("");
  const [tempLists, setTempLists] = React.useState(arrLists);
  const { id } = useParams();

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

  const addShowToList = (listId, showData) => {
    dispatch(addShow({ ...showData, status: "unwatched" }, listId));
    closeMenu();
  };

  const removeShow = (listId, showId) => {
    dispatch(deleteShow(showId, listId));
    closeMenu();
  };

  const inList = (id, content) => {
    if (content.length > 0) {
      let found = false;
      content.map((show) => {
        if (show.id == id) {
          console.log("hi");
          found = true;
        }
      });
      return found;
    }
    console.log("outside");
    return false;
  };

  useEffect(() => {
    setTempLists(Object.entries(lists));
  }, [lists]);

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
        <p className="menu-lists-title">All lists</p>
        {tempLists.length > 0 ? (
          tempLists.map((list, index) => (
            <div key={index} className="menu-lists-list">
              <p className="menu-lists-list--title">{list[1].name}</p>
              {inList(id, list[1].content) ? (
                <button
                  className="menu-lists-list--btn"
                  onClick={(e) => removeShow(list[0], showData.id)}
                >
                  remove
                </button>
              ) : (
                <button
                  className="menu-lists-list--btn"
                  onClick={(e) => addShowToList(list[0], showData)}
                >
                  add
                </button>
              )}
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
