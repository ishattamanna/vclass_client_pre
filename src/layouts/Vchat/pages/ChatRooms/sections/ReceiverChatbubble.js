import React from "react";
import useGetDBUser from "../../../../../hooks/useGetDBUser";
import BasicButton from "../../../../../tools/buttons/BasicButton";
import BasicIconButton from "../../../../../tools/buttons/BasicIconButton";

const ReceiverChatbubble = ({ message }) => {
  const {
    author,
    date,
    messageContent = "",
    room,
    time,
    fileName = "",
    fileLink = "",
    fileIcon = "",
  } = message;

  const { dbUser } = useGetDBUser(author);

  return (
    <div className="chat chat-start ml-2">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={dbUser?.profilePic} alt="" />
        </div>
      </div>
      <div className="chat-header">
        {dbUser?.userName}
        <time className="text-xs opacity-50">{time}</time>
      </div>
      {messageContent ? (
        <BasicButton className="chat-bubble break-all font-bold">
          {messageContent}
        </BasicButton>
      ) : (
        <a
          href={fileLink}
          target="_blank"
          className="btn btn-primary"
          rel="noreferrer"
        >
          <img className="w-10 h-10" src={fileIcon} alt="" />
          {fileName.length > 10 ? fileName.slice(0, 10) : fileName}
        </a>
      )}
      <div className="chat-footer opacity-50">Delivered</div>
    </div>
  );
};

export default ReceiverChatbubble;
