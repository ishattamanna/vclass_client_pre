import { useEffect, useState } from "react";

const useUploadFile = (uploadingFile) => {
  const [uploadConfirmation, setUploadConfirmation] = useState(null);
  useEffect(() => {
    if (uploadingFile) {
      const formData = new FormData();
      formData.set("uploadingFile", uploadingFile);

      fetch(`${process.env.REACT_APP_serverSiteLink}upload-file`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUploadConfirmation(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [uploadingFile]);

  return { uploadConfirmation };
};

export default useUploadFile;
