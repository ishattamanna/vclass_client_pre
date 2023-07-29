import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "../../../tools/inputs/TextField";
import useGetFriends from "../../../hooks/useGetFriends";
import FriendsSearchCard from "../pages/ChatRooms/sections/FriendsSearchCard";
import BasicButton from "../../../tools/buttons/BasicButton";
import groupImg from "../../../assets/vchat/groupImg.png";
import useUploadImage from "../../../hooks/useUploadImage";
import useGetRooms from "../../../hooks/useGetRooms";
import { AuthContext } from "../../../contexts/AuthProvider";

const CreateGroupDrawer = ({ setDrawerOption }) => {
  const { friends } = useGetFriends();
  const { authUser } = useContext(AuthContext);

  const [requiredDriends, setRequiredFriends] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([authUser?.email]);
  const [uploadingImg, setUploadingImg] = useState(null);
  const { imgUrl } = useUploadImage(uploadingImg);
  const fileRef = useRef();

  const { roomsRefetch } = useGetRooms();

  useEffect(() => {
    if (friends) {
      setRequiredFriends(friends);
    }
  }, [friends]);

  const handleRequiredFriends = (event) => {
    setRequiredFriends(
      friends?.filter((friend) => friend.includes(event.target.value))
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const groupName = form.groupName.value;

    const roomInfo = {
      roomName: groupName,
      roomPhoto: imgUrl || "https://i.ibb.co/CsQFGnv/groupImg.png",
      roomType: "group",
      members: selectedMembers,
    };

    fetch(`${process.env.REACT_APP_serverSiteLink}make-room`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(roomInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          roomsRefetch();
          form.reset();
          setSelectedMembers([authUser?.email]);
        }
      });
  };

  return (
    <div className="drawer-end">
      <input
        // onClick={() => setDrawerOption("")}
        id="createGroupDrawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">{/* Page content here */}</div>
      <div className="drawer-side">
        <label htmlFor="createGroupDrawer" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 h-full bg-base-200 text-base-content overflow-y-scroll">
          <form onSubmit={handleSubmit}>
            <BasicButton
              type={"submit"}
              disabled={selectedMembers?.length < 3}
              className={"w-full mb-4"}
            >
              Create Group
            </BasicButton>
            <div>
              <div
                onClick={() => fileRef.current.click()}
                className="avatar cursor-pointer"
              >
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={imgUrl || groupImg} alt="" />
                </div>
              </div>
              <input
                onChange={(event) => setUploadingImg(event.target.files[0])}
                ref={fileRef}
                type="file"
                className="hidden"
              />
              <div className="form-control mb-2">
                <label className="label">
                  <span className="label-text font-bold">Group Name</span>
                </label>
                <TextField
                  required={true}
                  name={"groupName"}
                  placeholder={"Group Name"}
                />
                <TextField
                  onChange={handleRequiredFriends}
                  className={"mt-2"}
                  placeholder={"Search friends by email"}
                />
              </div>
              <div className="overflow-y-scroll">
                {requiredDriends?.map((friend) => (
                  <FriendsSearchCard
                    setSelectedMembers={setSelectedMembers}
                    selectedMembers={selectedMembers}
                    friend={friend}
                    key={friend?._id}
                  />
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupDrawer;
