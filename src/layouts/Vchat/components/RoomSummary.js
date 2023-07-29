import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import useGetDBUser from "../../../hooks/useGetDBUser";
import { Link } from "react-router-dom";
import useGetMessages from "../../../hooks/useGetMessages";

const RoomSummary = ({ room, summaryToggle }) => {
  const { authUser } = useContext(AuthContext);
  const { messages = [] } = useGetMessages(room?._id);
  const [roomName, setRoomName] = useState("");
  const { dbUser } = useGetDBUser(roomName);

  useEffect(() => {
    if (room?.roomType !== "group" && room?.roomType !== "class") {
      setRoomName(room?.members?.find((member) => member !== authUser?.email));
    }
  }, [authUser, room]);

  return (
    <Link
      onClick={() => summaryToggle.current.click()}
      to={`/vchat/chat-room/${room?._id}`}
      className={`flex items-center px-4 py-3 transition duration-300 border-b cursor-pointer ${
        room?.roomType === "group" || room?.roomType === "class"
          ? ""
          : room?.messages?.length > 0
          ? ""
          : "hidden"
      }`}
    >
      <div className="avatar">
        <div className="w-12 rounded-full">
          <img
            src={
              room?.roomType === "group"
                ? room?.roomPhoto
                : room?.roomType === "class"
                ? room?.roomPhoto
                : dbUser?.profilePic
            }
            alt=""
          />
        </div>
      </div>
      <div className="w-full">
        <div className="-mb-1 flex justify-between items-center">
          <h3 className="ml-3 font-semibold">
            {room?.roomType === "group"
              ? room?.roomName
              : room?.roomType === "class"
              ? room?.roomName
              : dbUser?.userName}
          </h3>
          {messages && (
            <p className="ml-3 mt-0.5 text-sm">
              {messages?.[messages?.length - 1]?.time}
            </p>
          )}
        </div>
        <p className="ml-3 mt-0.5 text-sm text-start">
          {messages?.[messages?.length - 1]?.messageContent?.length > 10
            ? messages?.[messages?.length - 1]?.messageContent?.slice(0, 10)
            : messages?.[messages?.length - 1]?.messageContent}
        </p>
      </div>
    </Link>
  );
};

export default RoomSummary;
