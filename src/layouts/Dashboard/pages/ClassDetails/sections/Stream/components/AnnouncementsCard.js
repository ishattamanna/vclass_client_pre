import React from "react";
import useGetDBUser from "../../../../../../../hooks/useGetDBUser";
import AttachIcon from "../../../../../../../tools/icons/AttachIcon";
import { useNavigate } from "react-router-dom";
import useGetComments from "../../../../../../../hooks/useGetComments";

const AnnouncementsCard = ({ ansmnt, classId }) => {
  const { dbUser } = useGetDBUser(ansmnt?.author);
  const navigator = useNavigate();

  const { comments } = useGetComments(ansmnt?._id);

  return (
    <div
      onClick={() =>
        navigator(
          `/dashboard/class-details/${classId}/announcements/${ansmnt?._id}`
        )
      }
      className="p-2 my-2 shadow-lg cursor-pointer"
    >
      <div className="flex items-center w-full">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={dbUser?.profilePic} alt="" />
          </div>
        </div>
        <div className="ml-2 flex flex-col justify-start">
          <h3 className="card-title">{dbUser?.userName}</h3>
          <p className="text-start">{ansmnt?.date}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="card-title">{ansmnt?.title}</p>
        <div
          className="text-start"
          dangerouslySetInnerHTML={{ __html: ansmnt?.details }}
        ></div>
        <div className="text-start flex items-center mt-2">
          <AttachIcon className={"w-4 h-4 mr-2"} />
          <p>{ansmnt?.attachments?.length} attachments</p>
        </div>
        <p className="border-t-2 text-start p-2">{comments?.length} comments</p>
      </div>
    </div>
  );
};

export default AnnouncementsCard;
