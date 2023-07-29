import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import useGetRooms from "../../hooks/useGetRooms";
import RoomSummary from "./components/RoomSummary";
import RoomComponents from "./pages/ChatRooms/sections/RoomComponents";
import ChatOptions from "./components/ChatOptions";
import CreateGroupDrawer from "./components/CreateGroupDrawer";

const Vchat = () => {
  const { rooms } = useGetRooms();
  const [draweroptopn, setDrawerOption] = useState("");
  const [requiredRoom, setRequiredRoom] = useState("all");
  const [requiredRooms, setRequiredRooms] = useState([]);

  useEffect(() => {
    if (rooms) {
      setRequiredRooms(rooms);
    }
  }, [rooms]);

  useEffect(() => {
    if (requiredRoom === "groups") {
      setRequiredRooms(rooms?.filter((room) => room?.roomType === "group"));
    } else if (requiredRoom === "classes") {
      setRequiredRooms(rooms?.filter((room) => room?.roomType === "class"));
    } else {
      setRequiredRooms(rooms);
    }
  }, [requiredRooms, rooms, requiredRoom]);

  const summaryToggle = useRef();

  return (
    <div className="drawer lg:drawer-open w-full">
      <input
        onClick={() => setDrawerOption("")}
        ref={summaryToggle}
        id="vChatDrawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex items-center w-full">
        {/* Page content here */}

        <Outlet></Outlet>
        <CreateGroupDrawer setDrawerOption={setDrawerOption} />
      </div>
      <div className="drawer-side">
        <label htmlFor="vChatDrawer" className="drawer-overlay"></label>
        <div className="p-4 w-80 h-full bg-base-200 text-base-content overflow-y-scroll">
          {/* Sidebar content here */}
          <ChatOptions
            summaryToggle={summaryToggle}
            setRequiredRoom={setRequiredRoom}
            requiredRoom={requiredRoom}
            setDrawerOption={setDrawerOption}
          />

          {requiredRooms?.map((room) => (
            <RoomSummary
              summaryToggle={summaryToggle}
              room={room}
              key={room?._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vchat;
