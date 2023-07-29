import React from "react";
import useGetFriends from "../../../../hooks/useGetFriends";
import FriendsCard from "./sections/FriendsCard";

const Friends = () => {
  const { friends } = useGetFriends();

  return (
    <div className="lg:px-10 px-2 py-2">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 mt-2">
        {friends?.map((friend) => (
          <FriendsCard key={friend} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default Friends;
