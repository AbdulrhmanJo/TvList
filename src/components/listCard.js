import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsPencil } from "react-icons/bs";
import { AiOutlineFileImage } from "react-icons/ai";
import Modal from "./modal";
import { Link } from "react-router-dom";

const ListCard = ({ list, showName }) => {
  const listData = list[1];
  const [isModalOpen, openModel] = React.useState(false);
  const handleClose = () => {
    openModel(false);
  };

  return (
    <div className="list">
      <Modal
        open={isModalOpen}
        modalLabel="Edit List Details"
        handleClose={handleClose}
        buttonLabel="save"
        data={{ name: listData.name, desc: listData.desc, id: list[0] }}
      />
      <Link to={`/lists/${list[0]}`}>
        <div className="list-card">
          <div className="list-card--cover">
            {listData.content.length >= 4 ? (
              listData.content.map((item, index) => {
                if (index < 4) {
                  return (
                    <img
                      src={`https://image.tmdb.org/t/p/w342${item.poster}`}
                      alt={item.title}
                      key={index}
                    />
                  );
                }
              })
            ) : listData.content.length === 0 ? (
              <div className="list-card--cover-noImg">
                <AiOutlineFileImage />
              </div>
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w342${
                  listData.content[listData.content.length - 1].poster
                }`}
                alt={listData.content[listData.content.length - 1].title}
              />
            )}
          </div>
          {/* <div className="list-card--overlay"></div> */}
        </div>
      </Link>

      {/* <div className="list-card--overlay-wrapper">
        <button
          onClick={() => openModel(true)}
          className="list-card--overlay-wrapper-pencil"
        >
          <BsPencil />
        </button>
      </div> */}
      {showName ? <p className="list-name">{listData.name}</p> : ""}
    </div>
  );
};

export default ListCard;
