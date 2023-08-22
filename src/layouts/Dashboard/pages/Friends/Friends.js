import React from "react";
import useGetFriends from "../../../../hooks/useGetFriends";
import FriendsCard from "./sections/FriendsCard";
import Empty from "../../../../Empty/Empty";
import Loader from "../../../../Loader/Loader";

const Friends = () => {
  const { friends, friendsLoading } = useGetFriends();

  if (friendsLoading) {
    return <Loader />;
  } else {
    return (
      <div className="lg:px-10 px-2 py-2">
        {friends?.length === 0 ? (
          <Empty message={"You have no friends yet"} />
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 mt-2">
            {friends?.map((friend) => (
              <FriendsCard key={friend} friend={friend} />
            ))}
          </div>
        )}
      </div>
    );
  }
};

export default Friends;
