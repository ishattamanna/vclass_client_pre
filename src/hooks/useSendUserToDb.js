import { useEffect, useState } from "react";

const useSendUserToDb = (userInfo) => {
  const [dbConfirmation, setDbCOnfirmation] = useState(null);

  useEffect(() => {
    if (userInfo) {
      fetch(`${process.env.REACT_APP_serverSiteLink}send-user-to-db`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          setDbCOnfirmation(data);
        });
    }
  }, [userInfo]);

  return { dbConfirmation };
};

export default useSendUserToDb;
