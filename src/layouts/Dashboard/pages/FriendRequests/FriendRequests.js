import React from "react";
import useGetFriendRequests from "../../../../hooks/useGetFriendRequests";
import FriendRequestsCard from "./sections/FriendRequestsCard";

const FriendRequests = () => {
  const { friendRequests } = useGetFriendRequests();

  return (
    <div className="lg:px-10 px-2 py-2">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 mt-2">
        {friendRequests?.map((request) => (
          <FriendRequestsCard key={request} request={request} />
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;
