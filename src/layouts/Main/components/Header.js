import React, { useContext } from "react";
import OutlineButton from "../../../tools/buttons/OutlineButton";
import IconCoverButton from "../../../tools/buttons/IconCoverButton";
import MenuIcon from "../../../tools/icons/MenuIcon";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import IconButton from "../../../tools/buttons/IconButton";
import BasicIconButton from "../../../tools/buttons/BasicIconButton";
import ProfileAvatar from "../../../tools/avatar/ProfileAvatar";
import Button from "../../../tools/buttons/Button";
import BasicButton from "../../../tools/buttons/BasicButton";
import BasicOutlineButton from "../../../tools/buttons/BasicOutlineButton";
import ProfileIcon from "../../../tools/icons/ProfileIcon";
import BasicIconOutlineButton from "../../../tools/buttons/BasicIconOutlineButton";
import DashboardIcon from "../../../tools/icons/DashboardIcon";
import LogInIcon from "../../../tools/icons/LogInIcon";
import profileImage from "../../../../src/assets/auth/blank-profile-picture-973460_1280.webp";
import IconCoverLabel from "../../../tools/labels/IconCoverLabel";
import useGetDBUser from "../../../hooks/useGetDBUser";
import logo from "../../../assets/home_images/home_page_logo.png";

const Header = ({ navItems }) => {
  const { authUser, logOut } = useContext(AuthContext);

  const { dbUser } = useGetDBUser(authUser?.email);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown"></div>
        <IconCoverLabel htmlFor={"mainDrawer"} className={"lg:hidden mr-10"}>
          <MenuIcon />
        </IconCoverLabel>
        {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
        <img
          className="lg:h-[60px] h-[50px] mx-auto lg:mr-auto"
          src={logo}
          alt=""
        />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {authUser ? (
          <div className="dropdown dropdown-end hidden lg:block">
            <label tabIndex={0}>
              <BasicIconButton>
                <div class="avatar">
                  <div class="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={dbUser?.profilePic || profileImage} alt="" />
                  </div>
                </div>
                {/* <ProfileAvatar src={`${authUser?.protoURL}`} /> */}
                {dbUser?.userName}
              </BasicIconButton>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-gray-200 rounded-box w-52"
            >
              <li className="my-1">
                <BasicIconButton>
                  <ProfileIcon />
                  Profile
                </BasicIconButton>
              </li>
              <Link to={"/dashboard"} className="my-1">
                <BasicIconOutlineButton className={"w-full"}>
                  <DashboardIcon />
                  Dashboard
                </BasicIconOutlineButton>
              </Link>
              <li className="my-1">
                <BasicIconButton
                  onClick={() => {
                    logOut()
                      .then(() => {})
                      .catch((err) => console.error(err));
                  }}
                  className={"justify-center"}
                >
                  <LogInIcon />
                  Log Out
                </BasicIconButton>
              </li>
            </ul>
          </div>
        ) : (
          <Link to={"/signup"}>
            <OutlineButton>Get Started</OutlineButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
