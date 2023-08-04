import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "../../../../../tools/inputs/TextField";
import SendIcon from "../../../../../tools/icons/SendIcon";
import IconCoverButton from "../../../../../tools/buttons/IconCoverButton";
import DocumentIcon from "../../../../../tools/icons/DocumentIcon";
import useGetAnnouncementInfo from "../../../../../hooks/useGetAnnouncementInfo";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import useGetClass from "../../../../../hooks/useGetClass";
import useGetDBUser from "../../../../../hooks/useGetDBUser";
import IconOutlineCoverButton from "../../../../../tools/buttons/IconOutlineCoverButton";
import { toast } from "react-toastify";
import useGetComments from "../../../../../hooks/useGetComments";
import CommentCard from "../components/CommentCard";
import ScrollToBottom from "react-scroll-to-bottom";

const AnnouncementDetails = () => {
  const { id, announcementId } = useParams();
  const { authUser } = useContext(AuthContext);
  const { cls } = useGetClass(id);
  const { dbUser } = useGetDBUser(cls?.classTeacher);
  const { ansmntInfo } = useGetAnnouncementInfo(announcementId);
  const [commentText, setCommentText] = useState("");
  const { comments, commentsRefetch } = useGetComments(announcementId);

  const sendComment = () => {
    const commentInfo = {
      author: authUser?.email,
      content: commentText,
      postId: announcementId,
    };

    console.log(commentInfo);

    fetch(`${process.env.REACT_APP_serverSiteLink}post-comment`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(commentInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          setCommentText("");
          commentsRefetch();
          toast.success("yor comment has been added");
        }
      });
  };

  return (
    <div className="lg:px-5 px-2 my-5">
      <div className="flex items-start">
        <div className="avatar">
          <div className="lg:w-16 w-12 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
            <img src={dbUser?.profilePic} alt="" />
          </div>
        </div>
        <div className="mx-2">
          <h3 className="lg:text-2xl text-xl font-bold">{dbUser?.userName}</h3>
          <p className="text-start">
            <span> {ansmntInfo?.date}</span>
          </p>
        </div>
      </div>
      <hr className="my-2 border border-black border-solid mt-5" />
      <div>
        <p className="card-title">{ansmntInfo?.title}</p>
        <div
          dangerouslySetInnerHTML={{ __html: ansmntInfo?.details }}
          className="text-start"
        ></div>
        <div className="grid grid-cols-2 gap-5">
          {ansmntInfo?.attachments?.map((file, i) => (
            <div key={i} className="btn btn-primary flex justify-between my-1">
              <a
                className="flex justify-between items-center"
                href={file?.link}
                rel="noreferrer"
                target="_blank"
              >
                <img className="w-10 h-10" src={file?.icon} alt="" />
                {file?.name}
              </a>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-2 border border-black border-solid mt-5" />
      <div className={`flex flex-col justify-between w-full`}>
        <ScrollToBottom className="h-[40vh]">
          {comments?.map((comment) => (
            <CommentCard comment={comment} key={comment?._id} />
          ))}
        </ScrollToBottom>
        <div className="flex items-center justify-between px-4 py-3 border-t gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.photoURL} alt="" />
            </div>
          </div>
          <TextField
            onChange={(event) => setCommentText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendComment();
              }
            }}
            value={commentText}
            placeholder={"Aa"}
            className={"w-full input-sm"}
          />
          <div className="flex">
            <button onClick={sendComment}>
              <SendIcon className={"cursor-pointer w-6 h-6 mx-2"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetails;
