import React, { useContext } from "react";
import TextField from "../../../../tools/inputs/TextField";
import TextArea from "../../../../tools/inputs/TextArea";
import BasicButton from "../../../../tools/buttons/BasicButton";
import { AuthContext } from "../../../../contexts/AuthProvider";
import useGetClasses from "../../../../hooks/useGetClasses";
import useGetRooms from "../../../../hooks/useGetRooms";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateClass = () => {
  const { authUser } = useContext(AuthContext);
  const { classesRefetch } = useGetClasses();
  const { roomsRefetch } = useGetRooms();
  const navigator = useNavigate();

  const handleCreateClass = (event) => {
    event.preventDefault();
    const form = event.target;
    const className = form.className.value;
    const subject = form.subject.value;
    const classDetails = form.details.value;
    const classTeacher = authUser?.email;
    const members = [authUser?.email];
    const classInfo = {
      className,
      subject,
      classDetails,
      classTeacher,
      members,
    };

    console.log(classInfo);

    fetch(`${process.env.REACT_APP_serverSiteLink}create-class`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(classInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          const roomInfo = {
            roomName: className,
            roomPhoto: "https://i.ibb.co/CsQFGnv/groupImg.png",
            roomType: "class",
            members: members,
            classId: data?.insertedId,
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
              if (data?.acknowledged) {
                form.reset();
                classesRefetch();
                roomsRefetch();
                console.log(data);
                navigator(
                  `/dashboard/class-details/${roomInfo?.classId}/stream`
                );
                toast.success("class created successfully");
              }
            });
        }
      });
  };

  return (
    <form
      onSubmit={handleCreateClass}
      className="card-body lg:w-[80%] w-[90%] border-2 border-solid border-gray-200 rounded-lg my-5 mx-auto"
    >
      <div className="form-control">
        <label className="label">
          <span className="label-text">Class Name</span>
        </label>
        <TextField
          type="text"
          name="className"
          placeholder="Class Name"
          className="input input-bordered"
          required={true}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Subject</span>
        </label>
        <TextField
          type="text"
          placeholder="subject"
          name={"subject"}
          className="input input-bordered"
          required={true}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Details</span>
        </label>
        <TextArea name={"details"} type="text" placeholder="Details" />
      </div>
      <div className="form-control mt-6">
        <BasicButton type={"submit"}>Create Class</BasicButton>
      </div>
    </form>
  );
};

export default CreateClass;
