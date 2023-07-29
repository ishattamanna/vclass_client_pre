import React, { useState } from "react";
import LikeIcon from "../../../../../tools/icons/LikeIcon";
import SendIcon from "../../../../../tools/icons/SendIcon";
import TextField from "../../../../../tools/inputs/TextField";
import AttachIcon from "../../../../../tools/icons/AttachIcon";
import SentiEmojiIcon from "../../../../../tools/icons/SentiEmojiIcon";
import PlusIcon from "../../../../../tools/icons/PlusIcon";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import DropboxChooser from "react-dropbox-chooser";
// h-max

const RoomFooter = ({
  setMsgContent,
  handleSendMsg,
  msgContent,
  setFileContent,
  fileContent,
}) => {
  const [typing, setTyping] = useState(false);

  const handleChange = (files) => {
    console.log(files[0]);
    setFileContent(files[0]);
  };

  return (
    <div className={`${fileContent ? "h-[20vh]" : "h-[10vh]"}`}>
      {fileContent && (
        <a
          href={fileContent?.link}
          target="_blank"
          className="btn btn-neutral w-[50%]"
          rel="noreferrer"
        >
          <img className="w-10 h-10" src={fileContent?.icon} alt="" />
          {fileContent?.name}
        </a>
      )}
      <div className="flex items-center justify-between px-4 py-3 border-t gap-3">
        <div>
          {msgContent && typing ? (
            <button onClick={() => setTyping(false)}>
              <PlusIcon className={"cursor-pointer w-6 h-6 mx-2"} />
            </button>
          ) : (
            <div className="flex">
              <label>
                <SentiEmojiIcon className={"cursor-pointer w-6 h-6 mx-2"} />
              </label>
              <DropboxChooser
                appKey={`${process.env.REACT_APP_dropbox_secret}`}
                success={handleChange}
                cancel={() => console.log("canceled")}
              >
                <AttachIcon className={"cursor-pointer w-6 h-6 mx-2"} />
              </DropboxChooser>
            </div>
          )}
        </div>
        <TextField
          value={msgContent}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSendMsg();
            }
          }}
          onChange={(event) => {
            setTyping(true);
            setMsgContent(event.target.value);
          }}
          placeholder={"Aa"}
          className={"w-full input-sm"}
        />
        <div className="flex">
          {msgContent || fileContent ? (
            <button onClick={handleSendMsg}>
              <SendIcon className={"cursor-pointer w-6 h-6 mx-2"} />
            </button>
          ) : (
            <button>
              <LikeIcon className={"cursor-pointer w-6 h-6 mx-2"} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomFooter;
