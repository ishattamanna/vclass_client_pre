import React, { useContext } from "react";
import useGetDBUser from "../../../../../hooks/useGetDBUser";
import profileImage from "../../../../../assets/auth/blank-profile-picture-973460_1280.webp";
import Button from "../../../../../tools/buttons/Button";
import OutlineButton from "../../../../../tools/buttons/OutlineButton";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import useGetFriendRequests from "../../../../../hooks/useGetFriendRequests";

const FriendRequestsCard = ({ request }) => {
  const { dbUser } = useGetDBUser(request);
  const { authUser } = useContext(AuthContext);

  const { friendRequestsRefetch } = useGetFriendRequests();

  const handleDeny = () => {
    fetch(`${process.env.REACT_APP_serverSiteLink}cancel-friend-request`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        senderEmail: dbUser?.email,
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
        senderEmail: dbUser?.email,
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
            roomName: `${authUser?.email}_${dbUser?.email}`,
            members: [authUser?.email, dbUser?.email],
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
              }
            });
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
        </div>
      </div>
    </div>
  );
};

export default FriendRequestsCard;
