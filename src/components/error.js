import React from "react";
import { useHistory } from "react-router-dom";
import NotFound from "../icons/not_found.svg";
const Error = () => {
  const history = useHistory();
  return (
    <div className="notFound">
      <div className="notFound_content">
        <h1>Oops!</h1>
        <p>We can't seem to find the page you're looking for.</p>
        <button onClick={() => history.goBack()}>Go Back</button>
      </div>
      <div className="notFound_pic">
        <div className="notFound_pic-wrapper">
          <img src={NotFound} />
        </div>
      </div>
    </div>
  );
};

export default Error;
