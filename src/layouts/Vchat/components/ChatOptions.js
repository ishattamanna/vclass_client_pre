import React, { useContext, useRef } from "react";
import ReturnIcon from "../../../tools/icons/ReturnIcon";
import IconCoverButton from "../../../tools/buttons/IconCoverButton";
import IconButton from "../../../tools/buttons/IconButton";
import { Link } from "react-router-dom";
import BasicIconButton from "../../../tools/buttons/BasicIconButton";
import GroupIcon from "../../../tools/icons/GroupIcon";
import LogOutIcon from "../../../tools/icons/LogOutIcon";
import ProfileIcon from "../../../tools/icons/ProfileIcon";
import IconOutlineCoverButton from "../../../tools/buttons/IconOutlineCoverButton";
import IconCoverLabel from "../../../tools/labels/IconCoverLabel";
import { AuthContext } from "../../../contexts/AuthProvider";

const ChatOptions = ({
  setDrawerOption,
  summaryToggle,
  requiredRoom,
  setRequiredRoom,
}) => {
  const labelRef = useRef();
  const { logOut } = useContext(AuthContext);

  return (
    <div>
      <div className="px-5">
        <Link to={"/dashboard"} className="mx-1">
          <IconCoverButton>
            <ReturnIcon className={"w-6 h-6"} />
          </IconCoverButton>
        </Link>
        <IconCoverButton className={"mx-1"}>
          <ProfileIcon className={"w-6 h-6"} />
        </IconCoverButton>
        <label
          onClick={() => {
            summaryToggle.current.click();
            setDrawerOption("createGroupDrawer");
          }}
          ref={labelRef}
          className="hidden"
          htmlFor="createGroupDrawer"
        ></label>
        <IconCoverButton
          onClick={() => labelRef.current.click()}
          className={"mx-1"}
        >
          <GroupIcon className={"w-6 h-6"} />
        </IconCoverButton>
        <IconOutlineCoverButton
          onClick={() => {
            logOut()
              .then(() => {})
              .catch((err) => console.error(err));
          }}
          className={"mx-1"}
        >
          <LogOutIcon className={"w-6 h-6"} />
        </IconOutlineCoverButton>
      </div>
      <hr className="mt-2" />
      <div className="tabs tabs-boxed">
        <button
          onClick={() => setRequiredRoom("all")}
          className={`tab w-[33%] ${requiredRoom === "all" && "tab-active"}`}
        >
          All
        </button>
        <button
          onClick={() => setRequiredRoom("groups")}
          className={`tab w-[33%] ${requiredRoom === "groups" && "tab-active"}`}
        >
          Groups
        </button>
        <button
          onClick={() => setRequiredRoom("classes")}
          className={`tab w-[33%] ${
            requiredRoom === "classes" && "tab-active"
          }`}
        >
          Classes
        </button>
      </div>
      <hr className="mb-2" />
    </div>
  );
};

export default ChatOptions;
