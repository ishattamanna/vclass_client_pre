import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useGetClasses = () => {
  const { authUser } = useContext(AuthContext);

  const {
    data: classes,
    refetch: classesRefetch,
    isLoading: classesLoading,
  } = useQuery({
    queryKey: ["get-classes", authUser],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-classes?email=${authUser?.email}`
      ).then((res) => res.json()),
  });

  return { classes, classesRefetch, classesLoading };
};

export default useGetClasses;
