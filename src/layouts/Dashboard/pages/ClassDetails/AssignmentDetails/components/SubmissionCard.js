import React from "react";
import useGetDBUser from "../../../../../../hooks/useGetDBUser";
import { useNavigate } from "react-router-dom";

const SubmissionCard = ({ sub, assignmentId, id }) => {
  const { dbUser } = useGetDBUser(sub?.submittedBy);
  const navigator = useNavigate();

  return (
    <div
      onClick={() =>
        navigator(
          `/dashboard/class-details/${id}/assignments/${assignmentId}/submission/${sub?._id}`
        )
      }
      className={`flex items-center justify-between mt-2 px-4 border border-black shadow-lg p-2 rounded-lg`}
    >
      <div className="flex items-center w-full cursor-pointer">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={dbUser?.profilePic} alt="" />
          </div>
        </div>
        <div className="text-start ml-2">
          <p className="font-bold">{dbUser?.userName}</p>
          <p>{sub?.date}</p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;
