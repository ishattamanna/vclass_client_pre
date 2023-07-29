import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useGetFriendRequests = () => {
  const { authUser } = useContext(AuthContext);

  const {
    data: friendRequests,
    refetch: friendRequestsRefetch,
    isLoading: friendRequestsLoading,
  } = useQuery({
    queryKey: ["get-friend-requests", authUser],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-friend-requests?email=${authUser?.email}`
      ).then((res) => res.json()),
  });

  return { friendRequests, friendRequestsRefetch, friendRequestsLoading };
};

export default useGetFriendRequests;
