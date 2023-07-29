import React, { useContext } from "react";
import BasicIconButton from "../../../../../tools/buttons/BasicIconButton";
import AddFriendIcon from "../../../../../tools/icons/AddFriendIcon";
import BasicIconOutlineButton from "../../../../../tools/buttons/BasicIconOutlineButton";
import IconButton from "../../../../../tools/buttons/IconButton";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import profileImage from "../../../../../assets/auth/blank-profile-picture-973460_1280.webp";
import IconOutlineButton from "../../../../../tools/buttons/IconOutlineButton";
import CrossIcon from "../../../../../tools/icons/CrossIcon";
import useGetAllUsers from "../../../../../hooks/useGetAllUsers";
import Button from "../../../../../tools/buttons/Button";
import OutlineButton from "../../../../../tools/buttons/OutlineButton";
import useGetFriendRequests from "../../../../../hooks/useGetFriendRequests";
import MessageIcon from "../../../../../tools/icons/MessageIcon";
import UnfriendIcon from "../../../../../tools/icons/UnfriendIcon";
import useGetFriends from "../../../../../hooks/useGetFriends";

const PeoplesCard = ({ user }) => {
  const { email, profilePic, userName, _id } = user;

  const { authUser } = useContext(AuthContext);

  const { usersRefetch } = useGetAllUsers();
  const { friendRequestsRefetch } = useGetFriendRequests();
  const { friendsRefetch } = useGetFriends();

  const handleSendRequest = () => {
    fetch(`${process.env.REACT_APP_serverSiteLink}send-friend-request`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        senderEmail: authUser?.email,
        receiverEmail: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (
          data?.receiverConfirmation?.acknowledged &&
          data?.senderConfirmation?.acknowledged
        ) {
          usersRefetch();
        }
      });
  };

  const handleCancleRequest = () => {
    fetch(`${process.env.REACT_APP_serverSiteLink}cancel-friend-request`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        senderEmail: authUser?.email,
        receiverEmail: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (
          data?.receiverConfirmation?.acknowledged &&
          data?.senderConfirmation?.acknowledged
        ) {
          usersRefetch();
        }
      });
  };

  const handleDeny = () => {
    fetch(`${process.env.REACT_APP_serverSiteLink}cancel-friend-request`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        senderEmail: email,
        receiverEmail: authUser?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (
          data?.receiverConfirmation?.acknowledged &&
          data?.senderConfirmation?.acknowledged
        ) {
          friendRequestsRefetch();
          usersRefetch();
        }
      });
  };

  const handleAccept = () => {
    fetch(`${process.env.REACT_APP_serverSiteLink}accept-request`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        senderEmail: email,
        receiverEmail: authUser?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (
          data?.receiverConfirmation?.acknowledged &&
          data?.senderConfirmation?.acknowledged &&
          data?.senderFriendConfirmation?.acknowledged &&
          data?.receiverFriendConfirmation?.acknowledged
        ) {
          const roomInfo = {
            roomName: `${authUser?.email}_${email}`,
            members: [authUser?.email, email],
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
                friendRequestsRefetch();
                usersRefetch();
              }
            });
        }
      });
  };

  const handleUnfriend = () => {
    fetch(`${process.env.REACT_APP_serverSiteLink}unfriend`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        senderEmail: authUser?.email,
        receiverEmail: email,
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
          usersRefetch();
        }
      });
  };

  return (
    <div
      className={`card bg-base-100 h-32 lg:h-auto lg:flex-col flex-row shadow-2xl ${
        email === authUser?.email ? "hidden" : ""
      }`}
    >
      <figure className="lg:px-10 lg:pt-10 py-1 pl-1 w-[30%] lg:w-auto">
        <img
          src={profilePic || profileImage}
          alt="Shoes"
          className="lg:rounded-xl rounded-full w-24 h-24 lg:w-full lg:h-40"
        />
      </figure>
      <div className="lg:px-5 lg:py-5 px-2 py-2 flex flex-col justify-evenly items-center text-center w-[70%] lg:w-auto">
        <h2 className="lg:card-title font-bold mb-2">{userName}</h2>
        <div>
          {user?.friendRequestList?.includes(authUser?.email) ? (
            <IconOutlineButton
              onClick={handleCancleRequest}
              className={"text-xs"}
            >
              <CrossIcon className={"w-4 h-4"} />
              Cancel
            </IconOutlineButton>
          ) : user?.pendingList?.includes(authUser?.email) ? (
            <div className="flex lg:flex-row flex-col  items-center">
              <Button
                onClick={handleAccept}
                className={"lg:mx-1 my-1 w-full lg:w-[50%] text-xs"}
              >
                Accept
              </Button>
              <OutlineButton
                onClick={handleDeny}
                className={"lg:mx-1 my-1 w-full lg:w-[50%] text-xs"}
              >
                Deny
              </OutlineButton>
            </div>
          ) : user?.friendList?.includes(authUser?.email) ? (
            <div className="flex lg:flex-row flex-col  items-center">
              <IconButton className={"lg:mx-1 my-1 text-xs w-full"}>
                <MessageIcon className={"w-4 h-4"} />
                Message
              </IconButton>
              <IconOutlineButton
                onClick={handleUnfriend}
                className={"lg:mx-1 my-1 text-xs w-full"}
              >
                <UnfriendIcon className={"w-4 h-4"} />
                Unfriend
              </IconOutlineButton>
            </div>
          ) : (
            <IconButton onClick={handleSendRequest} className={"text-xs"}>
              <AddFriendIcon className={"w-4 h-4"} />
              Add Friend
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeoplesCard;
