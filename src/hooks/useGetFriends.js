import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useGetFriends = () => {
  const { authUser } = useContext(AuthContext);

  const {
    data: friends,
    refetch: friendsRefetch,
    isLoading: friendsLoading,
  } = useQuery({
    queryKey: ["get-friends", authUser],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-friends?email=${authUser?.email}`
      ).then((res) => res.json()),
  });

  return { friends, friendsRefetch, friendsLoading };
};

export default useGetFriends;
