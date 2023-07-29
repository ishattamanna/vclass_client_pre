import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../../../contexts/SocketProvider";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import SenderChatBubble from "./SenderChatBubble";
import ReceiverChatbubble from "./ReceiverChatbubble";
import useGetMessages from "../../../../../hooks/useGetMessages";
import ScrollToBottom from "react-scroll-to-bottom";
import useGetRooms from "../../../../../hooks/useGetRooms";

const RoomContent = ({ sendMessageTodb, room, roomRefetch, fileContent }) => {
  const { socket } = useContext(SocketContext);
  const [receivedMsg, setReceivedMsg] = useState(null);
  const { authUser } = useContext(AuthContext);
  const [dbConfirmation, setDbConfirmation] = useState(null);

  //   const { messages = [] } = room;

  console.log(room);
  const { messages, messagesRefetch } = useGetMessages(room);
  const { roomsRefetch } = useGetRooms();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setReceivedMsg(data);
    });
  }, [socket]);

  useEffect(() => {
    if (receivedMsg && dbConfirmation) {
      // sendMessageTodb(receivedMsg);
      roomRefetch();
      messagesRefetch();
      roomsRefetch();
      setReceivedMsg(null);
    }
  }, [receivedMsg, dbConfirmation, messagesRefetch, roomRefetch, roomsRefetch]);

  useEffect(() => {
    socket.on("receive_db_confirmation", (data) => {
      setDbConfirmation(data);
    });
  }, [socket]);

  return (
    <ScrollToBottom className="h-[80vh] w-full">
      {messages?.map((message) =>
        message?.author === authUser?.email ? (
          <SenderChatBubble message={message} />
        ) : (
          <ReceiverChatbubble message={message} />
        )
      )}
    </ScrollToBottom>
  );
};

export default RoomContent;
