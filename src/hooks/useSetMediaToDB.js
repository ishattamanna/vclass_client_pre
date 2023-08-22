import { useEffect, useState } from "react";

const useSetMediaToDB = (mediaInfo, BlobUrl) => {
  const [dbConfirmation, setDbConfirmation] = useState(null);
  useEffect(() => {
    if (mediaInfo && BlobUrl) {
      fetch(BlobUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const myFile = new File(
            [blob],
            `${mediaInfo?.mediaTitle || new Date().getTime()}`,
            { type: blob.type }
          );
          const formData = new FormData();
          formData.append("file", myFile);
          formData.append("upload_preset", "vclass");

          fetch(`https://api.cloudinary.com/v1_1/dfiotvbap/video/upload`, {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              mediaInfo.mediaUrl = data.url;
              console.log(mediaInfo);
              if (data.url) {
                fetch(
                  `${process.env.REACT_APP_serverSiteLink}send-media-todb`,
                  {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(mediaInfo),
                  }
                )
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                    setDbConfirmation(data);
                  });
              }
            });
        });
    }
  }, [mediaInfo, BlobUrl]);

  return { dbConfirmation };
};

export default useSetMediaToDB;
