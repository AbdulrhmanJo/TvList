import React from "react";

const Abdulrahman = () => {
  return (
    <div
      className="signature_wrapper"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "15rem",
        marginTop: "7rem",
      }}
    >
      <div className="signature">
        <img src="./mylogo.png" href="logo" className="signature_logo" />
        <h1 className="signature_text">
          This project is built by{" "}
          <a href="https://github.com/AbdulrhmanJo">AbdulrahmanJo</a>
        </h1>
      </div>
      <TMDB />
    </div>
  );
};

const TMDB = () => <img src="./tmdb.svg" style={{ width: "9rem" }} />;

export default Abdulrahman;
