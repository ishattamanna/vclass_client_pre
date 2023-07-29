import React, { useContext } from "react";
import useGetDBUser from "../../../../../hooks/useGetDBUser";
import profileImage from "../../../../../assets/auth/blank-profile-picture-973460_1280.webp";
import IconButton from "../../../../../tools/buttons/IconButton";
import MessageIcon from "../../../../../tools/icons/MessageIcon";
import IconOutlineButton from "../../../../../tools/buttons/IconOutlineButton";
import UnfriendIcon from "../../../../../tools/icons/UnfriendIcon";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import useGetFriends from "../../../../../hooks/useGetFriends";
import { Link, json } from "react-router-dom";
import useGetRooms from "../../../../../hooks/useGetRooms";
import { SocketContext } from "../../../../../contexts/SocketProvider";

const FriendsCard = ({ friend }) => {
  const { dbUser } = useGetDBUser(friend);
  const { authUser } = useContext(AuthContext);
  const { friendsRefetch } = useGetFriends();
  const { socket } = useContext(SocketContext);

  const { rooms } = useGetRooms();

  const room = rooms?.find(
    (room) =>
      room?.members?.length === 2 &&
      room?.members?.includes(dbUser?.email) &&
      room?.members?.includes(authUser?.email)
  );

  const handleUnfriend = () => {
    fetch(`${process.env.REACT_APP_serverSiteLink}unfriend`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        senderEmail: authUser?.email,
        receiverEmail: dbUser?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (
          data?.senderFriendConfirmation?.acknowledged &&
          data?.receiverFriendConfirmation?.acknowledged
        ) {
          friendsRefetch();
        }
      });
  };

  return (
    <div
      className={`card bg-base-100 h-32 lg:h-auto lg:flex-col flex-row shadow-2xl`}
    >
      <figure className="lg:px-10 lg:pt-10 py-1 pl-1 w-[30%] lg:w-auto">
        <img
          src={dbUser?.profilePic || profileImage}
          alt="Shoes"
          className="lg:rounded-xl rounded-full w-24 h-24 lg:w-full lg:h-40"
        />
      </figure>
      <div className="lg:px-5 lg:py-5 px-2 py-2 flex flex-col justify-evenly items-center text-center w-[70%] lg:w-auto">
        <h2 className="lg:card-title font-bold mb-2">{dbUser?.userName}</h2>
        <div>
          <div className="flex lg:flex-row flex-col  items-center">
            <Link
              onClick={() => socket.emit("join_room", room?._id)}
              className="lg:mx-2 my-1 w-full"
              to={`/vchat/chat-room/${room?._id}`}
            >
              <IconButton className={"lg:mx-1 my-1 text-xs w-full"}>
                <MessageIcon className={"w-4 h-4"} />
                Message
              </IconButton>
            </Link>
            <IconOutlineButton
              onClick={handleUnfriend}
              className={"lg:mx-2 my-1 text-xs w-full"}
            >
              <UnfriendIcon className={"w-4 h-4"} />
              Unfriend
            </IconOutlineButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsCard;
