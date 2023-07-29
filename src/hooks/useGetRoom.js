import { useQuery } from "@tanstack/react-query";

const useGetRoom = (roomId) => {
  const {
    data: room,
    isLoading: roomLoading,
    refetch: roomRefetch,
  } = useQuery({
    queryKey: ["get-room", roomId],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-room?roomId=${roomId}`
      ).then((res) => res.json()),
  });

  return { room, roomLoading, roomRefetch };
};

export default useGetRoom;
