import React, { useEffect, useRef, useState } from "react";
import CopyIcon from "../../../../../../../tools/icons/CopyIcon";
import TextField from "../../../../../../../tools/inputs/TextField";
import useGetAllUsers from "../../../../../../../hooks/useGetAllUsers";
import MemberCard from "./MemberCard";
import SearchUserCard from "./SearchUserCard";
import { toast } from "react-toastify";
import BasicOutlineButton from "../../../../../../../tools/buttons/BasicOutlineButton";
import BasicButton from "../../../../../../../tools/buttons/BasicButton";
import useGetClassMembers from "../../../../../../../hooks/useGetClassMembers";
import useGetClass from "../../../../../../../hooks/useGetClass";
import useGetClasses from "../../../../../../../hooks/useGetClasses";
import useGetRoomByClass from "../../../../../../../hooks/useGetRoomByClass";
import useGetRooms from "../../../../../../../hooks/useGetRooms";

const AddMemberModal = ({ clsId }) => {
  const { users } = useGetAllUsers(clsId);
  const [requiredUsers, setRequiredUsers] = useState([]);
  const copyRef = useRef();
  const modalToggleRef = useRef();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { membersRefetch } = useGetClassMembers(clsId);
  const { clsRefetch } = useGetClass(clsId);
  const { classesRefetch } = useGetClasses();
  const { roomsRefetch } = useGetRooms();
  const { classRoom, classRoomRefetch } = useGetRoomByClass(clsId);

  const handleSearch = (event) => {
    if (event.target.value) {
      setRequiredUsers(
        users?.filter((user) =>
          user?.email?.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    } else {
      setRequiredUsers([]);
    }
  };

  const copyClassCode = () => {
    if (copyRef.current) {
      const range = document.createRange();
      range.selectNode(copyRef.current);

      // Create a selection object and add the range to it
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      // Copy the selected text
      document.execCommand("copy");

      // Clear the selection to avoid any unwanted highlighting
      selection.removeAllRanges();
      toast.success("Class code copied");
    }
  };

  const handleAddMembers = () => {
    const membersInfo = {
      classId: clsId,
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
            classId: clsId,
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
                membersRefetch();
                clsRefetch();
                classesRefetch();
                setSelectedUsers([]);
                classRoomRefetch();
                roomsRefetch();
                modalToggleRef.current.click();
                toast.success("Students added successfully");
              }
            });
        }
      });
  };

  return (
    <div>
      <input
        ref={modalToggleRef}
        type="checkbox"
        id="addMembersModal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box text-start">
          <h3 className="card-title">Invite Students</h3>
          <div className="mt-4">
            <label className="font-bold">Copy Class code</label>
            <p className="flex justify-between items-center bg-white py-1 px-2 border-2 border-solid rounded-lg">
              <span ref={copyRef}>{clsId}</span>
              <button
                onClick={copyClassCode}
                className="btn btn-ghost btn-circle"
              >
                <CopyIcon className={"w-6 h-6 cursor-pointer"} />
              </button>
            </p>
            <TextField
              onChange={handleSearch}
              placeholder={"Search user by email"}
              className={"w-full mt-3"}
            />
            {requiredUsers.length > 0 && (
              <div className="h-[30vh] overflow-y-scroll mt-2">
                {requiredUsers?.map((user) => (
                  <SearchUserCard
                    setSelectedUsers={setSelectedUsers}
                    selectedUsers={selectedUsers}
                    clsId={clsId}
                    user={user}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end p-2 mt-2">
            <BasicOutlineButton
              onClick={() => modalToggleRef.current.click()}
              className={"mx-2"}
            >
              Cancel
            </BasicOutlineButton>
            <BasicButton
              onClick={handleAddMembers}
              disabled={selectedUsers?.length === 0}
              className={"mx-2"}
            >
              Add
            </BasicButton>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="addMembersModal">
          Close
        </label>
      </div>
    </div>
  );
};

export default AddMemberModal;
