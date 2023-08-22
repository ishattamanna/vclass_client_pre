import React from "react";
import EmojiPicker from "emoji-picker-react";
import RoomFooter from "./RoomFooter";

const EmojiModal = ({
  msgContent,
  setMsgContent,
  handleSendMsg,
  setFileContent,
  handleSendLike,
  fileContent,
}) => {
  return (
    <div>
      <input type="checkbox" id="emojiModal" className="modal-toggle" />
      <div className="modal modal-bottom lg:modal-middle">
        <div className="modal-box p-0">
          <RoomFooter
            msgContent={msgContent}
            setMsgContent={setMsgContent}
            handleSendMsg={handleSendMsg}
            setFileContent={setFileContent}
            handleSendLike={handleSendLike}
            fileContent={fileContent}
          />
          <EmojiPicker
            width={"100%"}
            height={"330px"}
            onEmojiClick={(event, emojiObject) => {
              console.log("emoji clicked", event.emoji);
              setMsgContent(msgContent + event.emoji);
            }}
          />
        </div>
        <label className="modal-backdrop" htmlFor="emojiModal">
          Close
        </label>
      </div>
    </div>
  );
};

export default EmojiModal;
