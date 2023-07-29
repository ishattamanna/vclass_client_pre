import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useGetClass from "../../../../../../hooks/useGetClass";
import useGetDBUser from "../../../../../../hooks/useGetDBUser";
import { AuthContext } from "../../../../../../contexts/AuthProvider";
import TextField from "../../../../../../tools/inputs/TextField";
import TextEditor from "../../components/TextEditor";
import IconOutlineCoverButton from "../../../../../../tools/buttons/IconOutlineCoverButton";
import CrossIcon from "../../../../../../tools/icons/CrossIcon";
import IconCoverButton from "../../../../../../tools/buttons/IconCoverButton";
import AttachIcon from "../../../../../../tools/icons/AttachIcon";
import BasicOutlineButton from "../../../../../../tools/buttons/BasicOutlineButton";
import BasicButton from "../../../../../../tools/buttons/BasicButton";
import DropboxChooser from "react-dropbox-chooser";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import useGetClasses from "../../../../../../hooks/useGetClasses";
import { toast } from "react-toastify";
import useGetAnnouncements from "../../../../../../hooks/useGetAnnouncements";
import AnnouncementsCard from "./components/AnnouncementsCard";

const Stream = () => {
  const { id } = useParams();
  const { authUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const { cls } = useGetClass(id);
  const { dbUser } = useGetDBUser(cls?.classTeacher);
  const { classesRefetch } = useGetClasses();
  const { clsRefetch } = useGetClass(id);

  const { ansmnts, ansmntsRefetch } = useGetAnnouncements(id);

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

  const handleChange = (files) => {
    setAttachments((file) => [...file, files[0]]);
  };

  const handlePost = (event) => {
    event.preventDefault();
    console.log(editor.getHTML());
    const form = event.target;
    const title = form.title.value;
    if (editor.getHTML() !== "<p></p>" || attachments?.length > 0) {
      const announcementsInfo = {
        classId: id,
        author: authUser?.email,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`,
        title,
        attachments,
        details: editor.getHTML(),
      };

      fetch(`${process.env.REACT_APP_serverSiteLink}post-announcement`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(announcementsInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.acknowledged) {
            editor.commands.clearContent();
            form.reset();
            classesRefetch();
            clsRefetch();
            setAttachments([]);
            setIsEditing(false);
            ansmntsRefetch();
            toast.success("Announcement posted successfully");
          }
        });
    }
  };

  return (
    <div className="lg:px-10 px-2 py-2 pb-5">
      <div>
        {isEditing ? (
          <form
            id="announcementForm"
            onSubmit={handlePost}
            className="shadow-lg p-5 lg:h-auto h-[80vh]"
          >
            <TextField
              name={"title"}
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
            href="#announcementForm"
            onClick={() => setIsEditing(true)}
            className="btn btn-ghost w-full flex justify-start shadow-lg normal-case"
          >
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={authUser?.photoURL} alt="" />
              </div>
            </div>
            Make Announcement
          </a>
        )}
      </div>
      <div className="mt-5 lg:px-20">
        {ansmnts?.map((ansmnt) => (
          <AnnouncementsCard key={ansmnt?._id} classId={id} ansmnt={ansmnt} />
        ))}
      </div>
    </div>
  );
};

export default Stream;
