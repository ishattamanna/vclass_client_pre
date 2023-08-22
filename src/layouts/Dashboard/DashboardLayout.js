import React, { useContext, useRef } from "react";
import DashboardHeader from "./components/DashboardHeader";
import BasicButton from "../../tools/buttons/BasicButton";
import BasicIconButton from "../../tools/buttons/BasicIconButton";
import ProfileIcon from "../../tools/icons/ProfileIcon";
import FriendsIcon from "../../tools/icons/FriendsIcon";
import AddFriendIcon from "../../tools/icons/AddFriendIcon";
import BasicOutlineButton from "../../tools/buttons/BasicOutlineButton";
import { AuthContext } from "../../contexts/AuthProvider";
import LogOutIcon from "../../tools/icons/LogOutIcon";
import { Link, NavLink, Outlet } from "react-router-dom";
import PeopleIcon from "../../tools/icons/PeopleIcon";
import SquarePlusIcon from "../../tools/icons/SquarePlusIcon";
import BasicIconOutlineButton from "../../tools/buttons/BasicIconOutlineButton";
import PlusIcon from "../../tools/icons/PlusIcon";
import LandMarkIcon from "../../tools/icons/LandMarkIcon";
import useGetDBUser from "../../hooks/useGetDBUser";

const DashboardLayout = () => {
  const { logOut, authUser } = useContext(AuthContext);
  const { dbUser } = useGetDBUser(authUser?.email);

  const drawerToggleRef = useRef();

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input
          ref={drawerToggleRef}
          id="dashboardDrawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/* Page content here */}
          <DashboardHeader />
          <Outlet></Outlet>
        </div>
        <div className="drawer-side z-[100]">
          <label htmlFor="dashboardDrawer" className="drawer-overlay"></label>
          <div className="p-4 w-auto h-full bg-base-200 text-base-content overflow-y-scroll">
            {/* Sidebar content here */}
            <div>
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={dbUser?.profilePic} alt="" />
                </div>
              </div>
              <p className="font-bold">{dbUser?.userName}</p>
            </div>
            <div className="divider"></div>
            <NavLink
              onClick={() => drawerToggleRef.current.click()}
              to={"/dashboard"}
              className="my-2"
            >
              <BasicIconButton className={"w-full my-2"}>
                <ProfileIcon />
                Profile
              </BasicIconButton>
            </NavLink>
            <NavLink
              onClick={() => drawerToggleRef.current.click()}
              to={"/dashboard/friends"}
              className="my-2"
            >
              <BasicIconButton className={"w-full my-2"}>
                <FriendsIcon />
                Friends
              </BasicIconButton>
            </NavLink>
            <NavLink
              onClick={() => drawerToggleRef.current.click()}
              to={"/dashboard/friend-requests"}
              className="my-2"
            >
              <BasicIconButton className={"w-full my-2"}>
                <AddFriendIcon className={"w-6 h-6"} />
                Friend Requests
              </BasicIconButton>
            </NavLink>
            <NavLink
              onClick={() => drawerToggleRef.current.click()}
              to={"/dashboard/peoples"}
              className="my-2"
            >
              <BasicIconButton className={"w-full my-2"}>
                <PeopleIcon />
                Peoples
              </BasicIconButton>
            </NavLink>
            <div className="divider"></div>
            <NavLink
              to={"/dashboard/create-class"}
              onClick={() => drawerToggleRef.current.click()}
              className="my-2"
            >
              <BasicIconOutlineButton className={"w-full my-2"}>
                <SquarePlusIcon className={"w-6 h-6"} />
                Create Class
              </BasicIconOutlineButton>
            </NavLink>
            <NavLink
              to={"/dashboard/join-class"}
              onClick={() => drawerToggleRef.current.click()}
              className="my-2"
            >
              <BasicIconOutlineButton className={"w-full my-2"}>
                <PlusIcon className={"w-6 h-6"} />
                Join Class
              </BasicIconOutlineButton>
            </NavLink>
            <NavLink
              to={"/dashboard/my-classes"}
              onClick={() => {
                drawerToggleRef.current.click();
              }}
            >
              <BasicIconOutlineButton className={"w-full my-2"}>
                <LandMarkIcon className={"w-6 h-6"} />
                My Classes
              </BasicIconOutlineButton>
            </NavLink>
            <div className="divider"></div>
            <button
              onClick={() => {
                logOut()
                  .then(() => {})
                  .catch((err) => console.error(err));
              }}
              className="btn btn-neutral normal-case w-full my-2"
            >
              <LogOutIcon />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
