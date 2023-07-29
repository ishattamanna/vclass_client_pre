import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import useGetDBUser from "../../../../../hooks/useGetDBUser";
import MemberCollapseCard from "./MemberCollapseCard";
import BasicButton from "../../../../../tools/buttons/BasicButton";
import BasicIconButton from "../../../../../tools/buttons/BasicIconButton";
import RightVIcon from "../../../../../tools/icons/RightVIcon";
import VIcon from "../../../../../tools/icons/VIcon";

const RoomComponents = ({ room }) => {
  const { authUser } = useContext(AuthContext);
  const [roomName, setRoomName] = useState("");
  const { dbUser } = useGetDBUser(roomName);
  const [collapseOpen, setCollapseOpen] = useState(false);

  useEffect(() => {
    if (room?.roomType !== "group" && room?.roomType !== "class") {
      setRoomName(room?.members?.find((member) => member !== authUser?.email));
    }
  }, [authUser, room]);

  return (
    <div className="drawer-end lg:drawer-open">
      <input id="RoomInfoDrawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label htmlFor="RoomInfoDrawer" className="drawer-overlay"></label>
        <div className="w-80 h-full bg-base-200 text-base-content overflow-y-scroll">
          <div className="mt-3">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
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
            <p className="font-bold mt-3">
              {room?.roomType === "group"
                ? room?.roomName
                : room?.roomType === "class"
                ? room?.roomName
                : dbUser?.userName}
            </p>
          </div>
          <div className="collapse bg-base-200 w-full">
            <input
              onClick={() => setCollapseOpen(!collapseOpen)}
              type="checkbox"
            />
            <div className="collapse-title text-xl font-medium w-full">
              <BasicIconButton className={"w-full text-start"}>
                Members
                {collapseOpen ? (
                  <VIcon className={"w-6 h-6"} />
                ) : (
                  <RightVIcon className={"w-6 h-6"} />
                )}
              </BasicIconButton>
            </div>
            <div className="collapse-content w-full">
              {room?.members?.map((member, i) => (
                <MemberCollapseCard key={i} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomComponents;
