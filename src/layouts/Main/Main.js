import React, { useContext } from "react";
import Header from "./components/Header";
import { NavLink, Outlet } from "react-router-dom";
import Button from "../../tools/buttons/Button";
import OutlineButton from "../../tools/buttons/OutlineButton";
import IconButton from "../../tools/buttons/IconButton";
import MenuIcon from "../../tools/icons/MenuIcon";
import IconOutlineButton from "../../tools/buttons/IconOutlineButton";
import HomeIcon from "../../tools/icons/HomeIcon";
import MailIcon from "../../tools/icons/MailIcon";
import DocumentIcon from "../../tools/icons/DocumentIcon";
import Footer from "./components/Footer";
import BasicIconButton from "../../tools/buttons/BasicIconButton";
import ProfileIcon from "../../tools/icons/ProfileIcon";
import BasicIconOutlineButton from "../../tools/buttons/BasicIconOutlineButton";
import DashboardIcon from "../../tools/icons/DashboardIcon";
import LogInIcon from "../../tools/icons/LogInIcon";
import { AuthContext } from "../../contexts/AuthProvider";
import LogOutIcon from "../../tools/icons/LogOutIcon";
import useGetDBUser from "../../hooks/useGetDBUser";

const Main = () => {
  const { logOut, authUser } = useContext(AuthContext);

  const { dbUser } = useGetDBUser(authUser?.email);

  const navItems = (
    <>
      <NavLink className={"lg:mx-5 lg:my-0"}>
        <IconButton className={"w-full lg:w-auto my-2 lg:my-0"}>
          <HomeIcon />
          Home
        </IconButton>
      </NavLink>
      <NavLink className={"lg:mx-5 lg:my-0"}>
        <IconButton className={"w-full lg:w-auto my-2 lg:my-0"}>
          <MailIcon />
          Contact Us
        </IconButton>
      </NavLink>
      <NavLink className={"lg:mx-5 lg:my-0"}>
        <IconButton className={"w-full lg:w-auto my-2 lg:my-0"}>
          <DocumentIcon />
          Documentation
        </IconButton>
      </NavLink>
      <div className="divider my-2"></div>
      <div className="lg:hidden w-full">
        <NavLink className={"my-2"}>
          <BasicIconButton className={"w-full my-2"}>
            <ProfileIcon />
            Profile
          </BasicIconButton>
        </NavLink>
        <NavLink to={"/dashboard"} className="my-1">
          <BasicIconOutlineButton className={"w-full"}>
            <DashboardIcon />
            Dashboard
          </BasicIconOutlineButton>
        </NavLink>
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
    </>
  );

  return (
    <div>
      <Header navItems={navItems}></Header>
      <hr className="w-[90%]  border border-[steelblue] border-solid rounded-lg  mx-auto" />
      <div className="drawer">
        <input id="mainDrawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
        <div className="drawer-side">
          <label htmlFor="mainDrawer" className="drawer-overlay"></label>
          <div className="p-4 w-56 h-full bg-base-200 text-base-content overflow-y-scroll">
            {/* Sidebar content here */}
            <div>
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={dbUser?.profilePic} alt="" />
                </div>
              </div>
              <p className="font-bold">{dbUser?.userName}</p>
            </div>
            <div className="divider my-2"></div>
            {navItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
