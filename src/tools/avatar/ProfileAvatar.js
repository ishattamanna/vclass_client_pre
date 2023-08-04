import React from "react";

const ProfileAvatar = ({ src }) => {
  return (
    <div class="avatar">
      <div class="w-10 h-10 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
        <img src={src} alt="" />
      </div>
    </div>
  );
};

export default ProfileAvatar;
