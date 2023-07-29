import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import useGetDBUser from "../../../../hooks/useGetDBUser";
import EditIcon from "../../../../tools/icons/EditIcon";
import IconCoverButton from "../../../../tools/buttons/IconCoverButton";
import ProfileIcon from "../../../../tools/icons/ProfileIcon";
import MailIcon from "../../../../tools/icons/MailIcon";
import BasicIconButton from "../../../../tools/buttons/BasicIconButton";
import LocationIcon from "../../../../tools/icons/LocationIcon";
import PhoneIcon from "../../../../tools/icons/PhoneIcon";
import FriendsIcon from "../../../../tools/icons/FriendsIcon";
import useGetFriends from "../../../../hooks/useGetFriends";
import LandMarkIcon from "../../../../tools/icons/LandMarkIcon";
import useGetClasses from "../../../../hooks/useGetClasses";

const Profile = () => {
  const { authUser } = useContext(AuthContext);
  const { dbUser } = useGetDBUser(authUser?.email);
  const { friends } = useGetFriends();
  const { classes } = useGetClasses(authUser?.email);

  return (
    <div className="lg:px-10 px-2 py-10">
      <h1 className="text-center w-full font-bold text-xl lg:text-3xl">
        Welcome {dbUser?.userName} To PluggedIn
      </h1>
      <div className="relative shadow rounded-lg border pt-16 mt-20">
        <div className={`flex justify-center mx-auto`}>
          <div className="avatar absolute -top-16">
            <div className="w-24 rounded-full">
              <img src={dbUser?.profilePic} alt="" />
            </div>
          </div>
        </div>
        <div>
          <BasicIconButton
            // onClick={() => setIsOpen(true)}
            className="absolute hidden rounded top-0 right-0 px-1.5 py-0.5 lg:flex items-center gap-2 button"
          >
            <EditIcon className={"w-4 h-4"} />
            Profile
          </BasicIconButton>
          <IconCoverButton className="absolute rounded top-0 right-0 px-1.5 py-0.5 lg:hidden flex items-center gap-2 button">
            <EditIcon className={"w-4 h-4"} />
          </IconCoverButton>
          <div className="text-start">
            <h2 className="py-4 pl-6 font-bold text-xl">Personal Details</h2>
            <div className="w-full flex flex-col">
              <h3 className="flex items-center py-2 px-5 border-b-2">
                <ProfileIcon className="text-lg mr-3" />
                Name : {dbUser?.userName}
              </h3>
              <h3 className="flex items-center py-2 px-5 border-b-2">
                <MailIcon className="text-lg mr-3" />
                Email : {dbUser?.email}
              </h3>
              <h3 className="flex items-center py-2 px-5 border-b-2">
                <LocationIcon className="w-6 h-6 mr-3 mt-0.5" />
                <span className="whitespace-nowrap">Address :</span>{" "}
                {dbUser?.address ? (
                  dbUser?.address
                ) : (
                  <span className="text-error ml-2">Address not updated</span>
                )}
              </h3>
              <h3 className="flex items-center py-2 px-5">
                <PhoneIcon className="w-6 h-6 mr-3 mt-0.5" />
                <span className="whitespace-nowrap">Contact No :</span>{" "}
                {dbUser?.phone ? (
                  dbUser.phone
                ) : (
                  <span className="text-error ml-2">Contact not updated</span>
                )}
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* Start Recent Activities */}
      <div className="mt-8 shadow rounded-lg border text-start w-full">
        <h2 className="py-4 pl-6 font-bold text-xl">Stats</h2>
        <div className="w-full flex flex-col items-center overflow-hidden text-sm">
          <h3 className="flex items-center justify-start py-2 px-5 border-b-2 w-full">
            <FriendsIcon className="text-lg mr-3" />
            Friends : {friends?.length}
          </h3>
          <h3 className="flex items-center justify-start py-2 px-5 border-b-2 w-full">
            <LandMarkIcon className="w-6 h-6 mr-3" />
            Classes : {classes?.length}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
