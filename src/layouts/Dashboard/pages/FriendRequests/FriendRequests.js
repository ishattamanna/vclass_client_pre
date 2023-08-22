import React from "react";
import useGetFriendRequests from "../../../../hooks/useGetFriendRequests";
import FriendRequestsCard from "./sections/FriendRequestsCard";
import Empty from "../../../../Empty/Empty";
import Loader from "../../../../Loader/Loader";

const FriendRequests = () => {
  const { friendRequests, friendRequestsLoading } = useGetFriendRequests();

  if (friendRequestsLoading) {
    return <Loader />;
  } else {
    return (
      <div className="lg:px-10 px-2 py-2">
        {friendRequests?.length === 0 ? (
          <Empty message={"You have no friend request"} />
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 mt-2">
            {friendRequests?.map((request) => (
              <FriendRequestsCard key={request} request={request} />
            ))}
          </div>
        )}
      </div>
    );
  }
};

export default FriendRequests;
