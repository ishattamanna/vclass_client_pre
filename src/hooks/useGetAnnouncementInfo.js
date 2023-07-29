import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetAnnouncementInfo = (ansmntId) => {
  const {
    data: ansmntInfo,
    refetch: ansmntInfoRefetch,
    isLoading: ansmntInfoLoading,
  } = useQuery({
    queryKey: ["get-ansmnt-details", ansmntId],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-ansmnt-details?id=${ansmntId}`
      ).then((res) => res.json()),
  });

  return { ansmntInfo, ansmntInfoRefetch, ansmntInfoLoading };
};

export default useGetAnnouncementInfo;
