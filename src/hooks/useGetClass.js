import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetClass = (classId) => {
  const {
    data: cls,
    isLoading: clsLoading,
    refetch: clsRefetch,
  } = useQuery({
    queryKey: ["get-class", classId],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-class?classId=${classId}`
      ).then((res) => res.json()),
  });

  return { cls, clsLoading, clsRefetch };
};

export default useGetClass;
