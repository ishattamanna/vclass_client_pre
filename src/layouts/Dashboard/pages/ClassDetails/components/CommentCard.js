import React, { useContext } from "react";
import useGetDBUser from "../../../../../hooks/useGetDBUser";
import { AuthContext } from "../../../../../contexts/AuthProvider";

const CommentCard = ({ comment }) => {
  const { author, content, postId } = comment;
  const { authUser } = useContext(AuthContext);
  const { dbUser } = useGetDBUser(author);

  return (
    <div
      className={`rounded-lg flex my-2 shadow-lg p-2 ${
        authUser?.email === author
          ? "ml-auto flex-row-reverse border-r-2 border-blue-500"
          : "mr-auto flex-row border-l-2 border-green-400"
      }`}
    >
      <div className={`avatar ${authUser?.email === author ? "ml-2" : "mr-2"}`}>
        <div className="w-10 h-10 rounded-full">
          <img src={dbUser?.profilePic} alt="" />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-start">
          <h2
            className={`font-semibold ${
              authUser?.email === author ? "text-end" : "text-start"
            }`}
          >
            {dbUser?.userName}
          </h2>
          <span className="text-sm text-gray-400 break-all">{content}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
