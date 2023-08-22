import React, { useRef } from "react";
import TextField from "../../../../../../tools/inputs/TextField";
import TextArea from "../../../../../../tools/inputs/TextArea";
import BasicButton from "../../../../../../tools/buttons/BasicButton";
import { toast } from "react-toastify";
import useGetClassRecords from "../../../../../../hooks/useGetClassRecords";

const EditMediaModal = ({
  mediaDetails,
  mediaDetailsRefetch,
  classId,
  setEditingMedia,
}) => {
  const modalToggleRef = useRef();
  const { mediasRefetch } = useGetClassRecords(classId);
  const { _id } = mediaDetails;
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const mediaTitle = form.mediaTitle.value;
    const mediaDetails = form.mediaDetails.value;
    const mediaInfo = {
      mediaTitle,
      mediaDetails,
    };

    console.log(mediaInfo);

    fetch(`${process.env.REACT_APP_serverSiteLink}edit-media?mediaId=${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(mediaInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          mediaDetailsRefetch();
          mediasRefetch();
          form.reset();
          toast.success("Media Info changed successfully");
          setEditingMedia(null);
          modalToggleRef.current.click();
        }
      });
  };

  return (
    <div>
      <input
        ref={modalToggleRef}
        type="checkbox"
        id="editMediaModal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom lg:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Media Title</span>
              </label>
              <TextField
                type="text"
                defaultValue={mediaDetails?.mediaTitle}
                name="mediaTitle"
                placeholder="Media Title"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Media Details</span>
              </label>
              <TextArea
                type="text"
                defaultValue={mediaDetails?.mediaDetails}
                name="mediaDetails"
                placeholder="Media Details"
              />
            </div>
            <BasicButton type={"submit"} className={"mt-2 w-full"}>
              Save
            </BasicButton>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="editMediaModal">
          Close
        </label>
      </div>
    </div>
  );
};

export default EditMediaModal;
