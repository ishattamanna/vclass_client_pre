import React, { useContext, useEffect, useRef } from "react";
import useGetDBUser from "../../../../../../../hooks/useGetDBUser";
import MenuIcon from "../../../../../../../tools/icons/MenuIcon";
import ThreeDotIcon from "../../../../../../../tools/icons/ThreeDotIcon";
import BasicIconButton from "../../../../../../../tools/buttons/BasicIconButton";
import TrushIcon from "../../../../../../../tools/icons/TrushIcon";
import DownloadIcon from "../../../../../../../tools/icons/DownloadIcon";
import ShareIcon from "../../../../../../../tools/icons/ShareIcon";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import "./confirmclass.css";
import { useNavigate } from "react-router-dom";
import audioDisplay from "../../../../../../../assets/audio.png";
import { AuthContext } from "../../../../../../../contexts/AuthProvider";

const MediaCard = ({ media, mediasRefetch, setSharingRecord }) => {
  const { author, classId, date, mediaTitle, mediaType, mediaUrl, _id } = media;
  const { dbUser } = useGetDBUser(author);
  const { authUser } = useContext(AuthContext);
  const hiddenDownloadRef = useRef();
  const hiddenShareLabel = useRef();
  const navigator = useNavigate();

  const handleDeletConfirm = () => {
    confirmAlert({
      title: (
        <div>
          <p>Confirm to delete media</p>
          <p>title : {mediaTitle}</p>
        </div>
      ),
      message: (
        <div className="bg-warning p-2 rounded-lg text-red-600 font-bold">
          <p>Are you sure to delete this Media ? </p>
          <p>This action can't be undo</p>
        </div>
      ),
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(
              `${process.env.REACT_APP_serverSiteLink}delete-record?mediaId=${_id}`,
              {
                method: "DELETE",
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data?.deletedCount > 0) {
                  toast.info("Media deleted successfully");
                  mediasRefetch();
                }
              });
          },
        },
        {
          label: "No",
          onClick: () => console.log("No"),
        },
      ],
      overlayClassName: "confirmClass",
    });
  };

  const handleMainDivClick = (event) => {
    const isDropdownClick =
      event.target.closest(".dropdown") !== null ||
      event.target.closest(".dropdown-end") !== null;

    if (!isDropdownClick) {
      navigator(`/dashboard/class-details/${classId}/class-records/${_id}`);
    }
  };

  return (
    <div
      onClick={handleMainDivClick}
      className={`card h-auto ${
        setSharingRecord ? "card-compact" : "card-side"
      }  bg-base-100 shadow-xl cursor-pointer`}
    >
      <figure className={`${!setSharingRecord && "w-[50%]"}`}>
        {mediaType === "audio" ? (
          <img src={audioDisplay} alt="" />
        ) : (
          <video
            muted
            title={mediaTitle}
            src={mediaUrl}
            download={mediaTitle}
            className="w-full h-[100%]"
          ></video>
        )}
      </figure>
      <div className={`${setSharingRecord && "card-body"}`}>
        <div className="flex items-start">
          {setSharingRecord && (
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={dbUser?.profilePic} alt="" />
              </div>
            </div>
          )}
          <div className="ml-2 text-start">
            <h2 className="card-title">{mediaTitle}</h2>
            <p className="opacity-75 font-bold">{dbUser?.userName}</p>
            <p className="opacity-75 font-bold">{date}</p>
          </div>
          <div className="dropdown dropdown-end ml-auto">
            {setSharingRecord && (
              <>
                <label tabIndex={0} className="btn btn-sm btn-circle m-1">
                  <ThreeDotIcon className={"w-6 h-6"} />
                </label>
                <a
                  ref={hiddenDownloadRef}
                  download={`${mediaUrl}/fl_attachment/${mediaTitle}.mp4`}
                  className="hidden"
                  href={mediaUrl}
                >
                  Download
                </a>
                <label
                  onClick={() => setSharingRecord(media)}
                  ref={hiddenShareLabel}
                  htmlFor="shareModal"
                  className="hidden"
                ></label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-green-300"
                >
                  {authUser?.email === author && (
                    <li className="mt-2">
                      <BasicIconButton onClick={handleDeletConfirm}>
                        Delete
                        <TrushIcon className={"w-6 h-6"} />
                      </BasicIconButton>
                    </li>
                  )}
                  <li className="mt-2">
                    <BasicIconButton
                      onClick={() => hiddenDownloadRef.current.click()}
                    >
                      Download
                      <DownloadIcon />
                    </BasicIconButton>
                  </li>
                  <li className="mt-2">
                    <BasicIconButton
                      onClick={() => hiddenShareLabel.current.click()}
                    >
                      Share
                      <ShareIcon />
                    </BasicIconButton>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
