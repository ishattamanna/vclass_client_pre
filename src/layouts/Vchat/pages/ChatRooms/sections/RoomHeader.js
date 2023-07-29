import React, { useContext, useEffect, useState } from "react";
import useGetDBUser from "../../../../../hooks/useGetDBUser";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import PhoneIcon from "../../../../../tools/icons/PhoneIcon";
import IconCoverButton from "../../../../../tools/buttons/IconCoverButton";
import ReturnIcon from "../../../../../tools/icons/ReturnIcon";
import IIcon from "../../../../../tools/icons/IIcon";
import IconCoverLabel from "../../../../../tools/labels/IconCoverLabel";

const RoomHeader = ({ room }) => {
  const { authUser } = useContext(AuthContext);

  const [roomName, setRoomName] = useState("");
  const { dbUser } = useGetDBUser(roomName);

  useEffect(() => {
    if (room?.roomType !== "group" && room?.roomType !== "class") {
      setRoomName(room?.members?.find((member) => member !== authUser?.email));
    }
  }, [authUser, room]);

  return (
    <div className="relative px-4 py-3 border-b flex items-center justify-between h-[10vh]">
      <div className="flex items-center">
        {/* <label className="lg:hidden" htmlFor="vChatDrawer"> */}
        <IconCoverLabel htmlFor={"vChatDrawer"} className={"mr-2 lg:hidden"}>
          <ReturnIcon className={"w-6 h-6"} />
        </IconCoverLabel>
        {/* </label> */}
        <div className="avatar">
          <div className="w-10 rounded-full">
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
      </div>
      <h3 className="ml-3 text-xl font-bold">
        {room?.roomType === "group"
          ? room?.roomName
          : room?.roomType === "class"
          ? room?.roomName
          : dbUser?.userName}
      </h3>
      <div className="flex">
        {/* <label htmlFor="roomModal" className="mx-1 cursor-pointer">
          <PhoneIcon className={"w-6 h-6"} />
        </label> */}
        <label className="mx-1 cursor-pointer" htmlFor="RoomInfoDrawer">
          <IIcon className={"w-6 h-6"} />
        </label>
      </div>
      {/* <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-2.5"></span> */}
    </div>
  );
};

export default RoomHeader;
