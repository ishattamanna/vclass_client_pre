import React from "react";
import IconCoverButton from "../../../tools/buttons/IconCoverButton";
import MenuIcon from "../../../tools/icons/MenuIcon";
import IconOutlineCoverButton from "../../../tools/buttons/IconOutlineCoverButton";
import { Link, useNavigate } from "react-router-dom";
import MessageIcon from "../../../tools/icons/MessageIcon";
import IconOutlineCoverLabel from "../../../tools/labels/IconOutlineCoverLabel";
import logo from "../../../assets/logo/vclass_logo-removebg-preview.png";
import useGetRooms from "../../../hooks/useGetRooms";

const DashboardHeader = () => {
  const navigator = useNavigate();

  const { rooms } = useGetRooms()

  return (
    <div className="navbar bg-[#179275] text-primary-content sticky z-[100] top-0">
      <IconOutlineCoverLabel
        className={"lg:hidden"}
        htmlFor={"dashboardDrawer"}
      >
        <MenuIcon />
      </IconOutlineCoverLabel>
      <img
        onClick={() => navigator("/")}
        className="lg:h-[50px] h-[40px] rounded-lg lg:mx-0 mx-auto cursor-pointer"
        src={logo}
        alt=""
      />
      <Link to={`/vchat/chat-room/${rooms?.[0]?._id}`} className="ml-auto">
        <IconOutlineCoverButton>
          <MessageIcon className={"w-6 h-6"} />
        </IconOutlineCoverButton>
      </Link>
      {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
    </div>
  );
};

export default DashboardHeader;
