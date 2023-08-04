import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import useGetDBUser from "../../../../hooks/useGetDBUser";
import BasicIconButton from "../../../../tools/buttons/BasicIconButton";
import LogOutIcon from "../../../../tools/icons/LogOutIcon";
import TextField from "../../../../tools/inputs/TextField";
import BasicButton from "../../../../tools/buttons/BasicButton";
import useGetRoomByClass from "../../../../hooks/useGetRoomByClass";
import { toast } from "react-toastify";
import useGetClassMembers from "../../../../hooks/useGetClassMembers";
import useGetClass from "../../../../hooks/useGetClass";
import useGetClasses from "../../../../hooks/useGetClasses";
import useGetRooms from "../../../../hooks/useGetRooms";
import { useNavigate } from "react-router-dom";

const JoinClass = () => {
  const { authUser, logOut } = useContext(AuthContext);

  const { dbUser } = useGetDBUser(authUser?.email);
  const [classId, setClassId] = useState("");
  //   const { membersRefetch } = useGetClassMembers(classId);
  //   const { clsRefetch } = useGetClass(classId);
  //   const { classRoom, classRoomRefetch } = useGetRoomByClass(classId);
  const { classesRefetch } = useGetClasses();
  const { roomsRefetch } = useGetRooms();
  const [selectedUsers, setSelectedUsers] = useState([authUser?.email]);
  const navigator = useNavigate();

  const handleAddMembers = () => {
    const membersInfo = {
      classId: classId,
      members: selectedUsers,
    };

    fetch(`${process.env.REACT_APP_serverSiteLink}add-class-member`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(membersInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          const roomMembersInfo = {
            classId: classId,
            members: selectedUsers,
          };
          fetch(`${process.env.REACT_APP_serverSiteLink}join-class-room`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(roomMembersInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.acknowledged) {
                // membersRefetch();
                // clsRefetch();
                classesRefetch();
                setSelectedUsers([]);
                roomsRefetch();
                setClassId("");
                navigator(
                  `/dashboard/class-details/${membersInfo?.classId}/stream`
                );
                toast.success("Successfully joined room");
              }
            });
        }
      });
  };

  return (
    <div className="lg:px-10 px-2 py-5">
      <div className="p-5 rounded-lg border-2 mt-5 w-full">
        <p className="text-start">You are currently signed in as</p>
        <div className="flex items-center justify-between mt-2 w-full">
          <div
            // onClick={handleSelectedMembers}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full"
          >
            <div className="flex items-center">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={dbUser?.profilePic} alt="" />
                </div>
              </div>
              <div className="text-start">
                <p className="ml-2 font-bold">{dbUser?.userName}</p>
                <p className="ml-2">{dbUser?.email}</p>
              </div>
            </div>
            <BasicIconButton
              onClick={() => {
                logOut()
                  .then(() => {})
                  .catch((err) => console.error(err));
              }}
              className={"mt-2 lg:mt-0"}
            >
              <LogOutIcon className={"w-6 h-6"} />
              Log Out
            </BasicIconButton>
          </div>
        </div>
      </div>
      <div className="p-5 rounded-lg border-2 mt-5 w-full">
        <p className="text-start">Class Code</p>
        <p className="text-start">
          Ask your teacher for the class code , to join
        </p>
        <div className="flex items-center justify-between mt-2 w-full">
          <div
            // onClick={handleSelectedMembers}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full"
          >
            <TextField
              onChange={(event) => setClassId(event.target.value)}
              value={classId}
              placeholder={"Class code"}
            />
            <BasicButton
              disabled={!classId}
              onClick={handleAddMembers}
              className={"mt-2 lg:mt-0"}
            >
              Join
            </BasicButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinClass;
