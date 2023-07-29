import React, { useContext, useEffect, useState } from "react";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextEditor from "../../components/TextEditor";
import { useNavigate, useParams } from "react-router-dom";
import useGetClass from "../../../../../../hooks/useGetClass";
import useGetDBUser from "../../../../../../hooks/useGetDBUser";
import BasicButton from "../../../../../../tools/buttons/BasicButton";
import BasicOutlineButton from "../../../../../../tools/buttons/BasicOutlineButton";
import AttachIcon from "../../../../../../tools/icons/AttachIcon";
import IconCoverButton from "../../../../../../tools/buttons/IconCoverButton";
import DropboxChooser from "react-dropbox-chooser";
import TextField from "../../../../../../tools/inputs/TextField";
import CrossIcon from "../../../../../../tools/icons/CrossIcon";
import IconOutlineCoverButton from "../../../../../../tools/buttons/IconOutlineCoverButton";
import { toast } from "react-toastify";
import useGetAssignmentsByClass from "../../../../../../hooks/useGetAssignmentsByClass";
import BasicIconButton from "../../../../../../tools/buttons/BasicIconButton";
import DocumentIcon from "../../../../../../tools/icons/DocumentIcon";
import ThreeDotIcon from "../../../../../../tools/icons/ThreeDotIcon";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AuthContext } from "../../../../../../contexts/AuthProvider";
import AssignmentCard from "../Stream/components/AssignmentCard";

const Assignments = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [points, setPoints] = useState(0);
  const navigator = useNavigate();
  const { authUser } = useContext(AuthContext);

  const { assignments, assignmentsRefetch } = useGetAssignmentsByClass(id);

  const { cls } = useGetClass(id);
  const { dbUser } = useGetDBUser(cls?.classTeacher);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        HTMLAttributes: {
          class: "text-primary opacity-90 underline",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "textarea focus:outline-none textarea-bordered w-full h-[30vh] pt-4 leading-5",
      },
    },
    content: "",
  });

  const handlePost = (event) => {
    event.preventDefault();
    console.log(editor.getHTML());
    const form = event.target;
    const title = form.title.value;
    const deadline = form.deadline.value;
    if (editor.getHTML() !== "<p></p>" || attachments?.length > 0) {
      const assignmentInfo = {
        classId: id,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`,
        deadline,
        title,
        totalPoints: points,
        attachments,
        details: editor.getHTML(),
      };

      fetch(`${process.env.REACT_APP_serverSiteLink}post-assignment`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(assignmentInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.acknowledged) {
            editor.commands.clearContent();
            form.reset();
            setAttachments([]);
            assignmentsRefetch();
            setIsEditing(false);
            toast.success("Assignment added successfully");
          }
        });
    }
  };

  const handleChange = (files) => {
    setAttachments((file) => [...file, files[0]]);
  };

  const handleDeletConfirm = (assignment) => {
    confirmAlert({
      title: `Confirm to delete assignment ,title : ${assignment?.title}`,
      message:
        "Are you sure to delete this assignment ? This action can't be undo",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch(
              `${process.env.REACT_APP_serverSiteLink}delete-assignment?id=${assignment?._id}`,
              {
                method: "DELETE",
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data?.deletedCount > 0) {
                  toast.success("Assignment deleted successfully");
                  assignmentsRefetch();
                }
              });
          },
        },
        {
          label: "No",
          onClick: () => console.log("No"),
        },
      ],
    });
  };

  return (
    <div className="lg:px-10 px-2 py-2 pb-5">
      <div className={`${authUser?.email !== dbUser?.email ? "hidden" : ""}`}>
        {isEditing ? (
          <form
            id="assignmentForm"
            onSubmit={handlePost}
            className="shadow-lg p-5 lg:h-auto h-[90vh]"
          >
            <div>
              {/* <label htmlFor="" className="text-start font-bold mr-auto">
                Adjust points
              </label> */}
              <div className="flex items-center my-2">
                <span className="badge badge-primary">0</span>
                <input
                  onChange={(event) => setPoints(event.target.value)}
                  type="range"
                  min={0}
                  max="100"
                  value={points}
                  className="range range-primary mx-2"
                />
                <span className="badge badge-primary">{points}</span>
              </div>
            </div>
            <TextField
              name={"title"}
              className={"w-full mb-2"}
              placeholder={"Title"}
            />
            <TextField
              type={"date"}
              name={"deadline"}
              className={"w-full mb-2"}
              placeholder={"Title"}
            />

            <TextEditor editor={editor} />
            <div className="flex lg:flex-row flex-col-reverse items-start justify-between">
              <div className="w-full flex flex-col">
                {attachments?.map((file, i) => (
                  <div
                    key={i}
                    className="btn btn-primary flex justify-between lg:w-[50%] my-1"
                  >
                    <a
                      className="flex justify-between items-center"
                      href={file?.link}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <img className="w-10 h-10" src={file?.icon} alt="" />
                      {file?.name}
                    </a>
                    <IconOutlineCoverButton
                      onClick={() => {
                        setAttachments(
                          attachments?.filter?.(
                            (deletingFile) => deletingFile !== file
                          )
                        );
                      }}
                    >
                      <CrossIcon className={"w-4 h-4"} />
                    </IconOutlineCoverButton>
                  </div>
                ))}
              </div>
              <div className="my-2 flex items-center justify-end">
                <DropboxChooser
                  appKey={`${process.env.REACT_APP_dropbox_secret}`}
                  success={handleChange}
                  cancel={() => console.log("canceled")}
                >
                  <IconCoverButton type={"button"}>
                    <AttachIcon className={"w-6 h-6"} />
                  </IconCoverButton>
                </DropboxChooser>

                <BasicOutlineButton
                  onClick={() => setIsEditing(false)}
                  className={"w-32 mx-2"}
                >
                  Cancel
                </BasicOutlineButton>
                <BasicButton type={"submit"} className={"w-32 mx-2"}>
                  Post
                </BasicButton>
              </div>
            </div>
          </form>
        ) : (
          <a
            href="#assignmentForm"
            onClick={() => setIsEditing(true)}
            className="btn btn-ghost w-full flex justify-start shadow-lg normal-case"
          >
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={dbUser?.profilePic} alt="" />
              </div>
            </div>
            Make Assignment
          </a>
        )}
      </div>
      <div className="mt-5 lg:px-20">
        {assignments?.map((assignment) => (
          <AssignmentCard
            key={assignment?._id}
            classId={id}
            assignment={assignment}
            handleDeletConfirm={handleDeletConfirm}
          />
        ))}
      </div>
    </div>
  );
};

export default Assignments;
