import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useGetRooms = () => {
  const { authUser } = useContext(AuthContext);

  const {
    data: rooms,
    refetch: roomsRefetch,
    isLoading: roomsLoading,
  } = useQuery({
    queryKey: ["get-rooms", authUser],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-rooms?email=${authUser?.email}`
      ).then((res) => res.json()),
  });

  return { rooms, roomsRefetch, roomsLoading };
};

export default useGetRooms;
