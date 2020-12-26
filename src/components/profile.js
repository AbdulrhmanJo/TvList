import React from "react";

const Profile = (props) => {
  return (
    <div className="profile">
      <div className="profile-avatar">
        <div className="profile-avatar-content">AA</div>
      </div>
      <div className="profile-info">
        <div className="profile-info-name">Abdulrahman Aljohani</div>
        <div className="profile-info-handle">@abdulrahmanAljohani</div>
      </div>
      <div className="profile-stats">
        <div className="profile-stats-item">
          <p className="profile-stats-item-header">Lists</p>
          <p className="profile-stats-item-content">0</p>
        </div>
        <div className="profile-stats-item">
          <p className="profile-stats-item-header">Movies watched</p>
          <p className="profile-stats-item-content">0</p>
        </div>
        <div className="profile-stats-item">
          <p className="profile-stats-item-header">Shows watched</p>
          <p className="profile-stats-item-content">0</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
