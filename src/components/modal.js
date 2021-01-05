import React from "react";
import { CgClose } from "react-icons/cg";
const Modal = (props) => {
  return (
    <div className="modal">
      <div className="modal-card">
        <div className="modal-card--header">
          <p className="modal-card--header-label">{props.modalLabel}</p>
          <button className="modal-card--header-close">
            <CgClose />
          </button>
        </div>
        <div className="modal-card--content">
          <div className="modal-card--content-nameWrapper">
            <p className="modal-card--content-nameWrapper-name">Name</p>
            <input
              placeholder="My watchlist"
              type="text"
              className="modal-card--content-nameWrapper-input"
            />
          </div>
          <div className="modal-card--content-descWrapper">
            <p className="modal-card--content-descWrapper-desc">Description</p>
            <textarea
              placeholder="Give your list a catchy  description."
              className="modal-card--content-descWrapper-textarea"
              rows={4}
            />
          </div>
          <div className="modal-card--content-btn">
            <button>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
