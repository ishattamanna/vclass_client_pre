import { useEffect, useState } from "react";

const useUploadImage = (imgFile) => {
  const [imgUrl, setImgUrl] = useState("");
  useEffect(() => {
    if (imgFile) {
      const formData = new FormData();
      formData.append("image", imgFile);

      fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgBBSecret}`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setImgUrl(data.data.url);
        });
    }
  }, [imgFile]);

  return { imgUrl };
};

export default useUploadImage;
