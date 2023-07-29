import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetMessages = (roomId) => {
  console.log(roomId);
  const {
    data: messages,
    refetch: messagesRefetch,
    isLoading: messagesLoading,
  } = useQuery({
    queryKey: ["get-messages", roomId],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-messages?roomId=${roomId}`
      ).then((res) => res.json()),
  });

  return { messages, messagesRefetch, messagesLoading };
};

export default useGetMessages;
