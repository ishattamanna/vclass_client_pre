import React, { useContext, useRef } from "react";
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
import logo from "../../assets/home_images/home_page_logo.png";

const Main = () => {
  const { logOut, authUser } = useContext(AuthContext);

  const { dbUser } = useGetDBUser(authUser?.email);
  const drawerToggleRef = useRef();

  const navItems = (
    <>
      <NavLink
        onClick={() => {
          if (window.innerWidth <= 768) {
            drawerToggleRef.current.click();
          }
        }}
        className={"lg:mx-5 lg:my-0"}
      >
        <IconButton className={"w-full lg:w-auto my-2 lg:my-0"}>
          <HomeIcon />
          Home
        </IconButton>
      </NavLink>
      <NavLink
        onClick={() => {
          if (window.innerWidth <= 768) {
            drawerToggleRef.current.click();
          }
        }}
        to={"/contact-us"}
        className={"lg:mx-5 lg:my-0"}
      >
        <IconButton className={"w-full lg:w-auto my-2 lg:my-0"}>
          <MailIcon />
          Contact Us
        </IconButton>
      </NavLink>
      <NavLink
        onClick={() => {
          if (window.innerWidth <= 768) {
            drawerToggleRef.current.click();
          }
        }}
        to={"/doc"}
        className={"lg:mx-5 lg:my-0"}
      >
        <IconButton className={"w-full lg:w-auto my-2 lg:my-0"}>
          <DocumentIcon />
          Documentation
        </IconButton>
      </NavLink>
      <div className="divider my-2"></div>
      {authUser?.email ? (
        <div className="lg:hidden w-full">
          <NavLink
            onClick={() => {
              if (window.innerWidth <= 768) {
                drawerToggleRef.current.click();
              }
            }}
            className={"my-2"}
          >
            <BasicIconButton className={"w-full my-2"}>
              <ProfileIcon />
              Profile
            </BasicIconButton>
          </NavLink>
          <NavLink
            onClick={() => {
              if (window.innerWidth <= 768) {
                drawerToggleRef.current.click();
              }
            }}
            to={"/dashboard"}
            className="my-1"
          >
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
      ) : (
        <NavLink
          onClick={() => {
            if (window.innerWidth <= 768) {
              drawerToggleRef.current.click();
            }
          }}
          className="my-1 lg:hidden"
          to={"/signup"}
        >
          <OutlineButton className={"w-full"}>Get Started</OutlineButton>
        </NavLink>
      )}
    </>
  );

  return (
    <div>
      <Header navItems={navItems}></Header>
      <hr className="w-[90%]  border border-[green] border-solid rounded-lg  mx-auto" />
      <div className="drawer">
        <input
          ref={drawerToggleRef}
          id="mainDrawer"
          type="checkbox"
          className="drawer-toggle lg:hidden"
        />
        <div className="drawer-content">
          {/* Page content here */}
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
        <div className="drawer-side">
          <label htmlFor="mainDrawer" className="drawer-overlay"></label>
          <div className="p-4 w-56 h-full bg-base-200 text-base-content overflow-y-scroll lg:hidden">
            {/* Sidebar content here */}
            {authUser?.email ? (
              <div>
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={dbUser?.profilePic} alt="" />
                  </div>
                </div>
                <p className="font-bold">{dbUser?.userName}</p>
              </div>
            ) : (
              <img
                className="lg:h-[60px] h-[50px] mx-auto lg:mr-auto"
                src={logo}
                alt=""
              />
            )}
            <div className="divider my-2"></div>
            {navItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
