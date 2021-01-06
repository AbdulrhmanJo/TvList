import React from "react";
import { CgClose } from "react-icons/cg";
import { connect } from "react-redux";
import { createList } from "../Actions/list";
import { updateList } from "../Actions/list";

const Modal = ({
  modalLabel,
  open,
  handleClose,
  buttonLabel,
  data,
  dispatch,
}) => {
  const [name, setName] = React.useState(() => (data ? data.name : ""));
  const [desc, setDesc] = React.useState(() => (data ? data.desc : ""));

  const handleCreateList = () => {
    dispatch(createList({ name, desc, content: [] }));
    handleClose();
    setName("");
    setDesc("");
  };
  const handleUpdateList = () => {
    dispatch(updateList({ name, desc, listId: data.id }));
    handleClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-card">
        <div className="modal-card--header">
          <p className="modal-card--header-label">{modalLabel}</p>
          <button className="modal-card--header-close" onClick={handleClose}>
            <CgClose />
          </button>
        </div>
        <div className="modal-card--content">
          <div className="modal-card--content-nameWrapper">
            <p className="modal-card--content-nameWrapper-name">Name</p>
            <input
              value={name}
              placeholder="My watchlist"
              type="text"
              className="modal-card--content-nameWrapper-input"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="modal-card--content-descWrapper">
            <p className="modal-card--content-descWrapper-desc">Description</p>
            <textarea
              placeholder="Give your list a catchy  description."
              className="modal-card--content-descWrapper-textarea"
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="modal-card--content-btn">
            <button
              disabled={!name}
              onClick={data ? handleUpdateList : handleCreateList}
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect()(Modal);
