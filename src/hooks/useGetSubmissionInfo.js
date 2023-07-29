import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";

const useGetSubmissionInfo = (subId) => {
  const {
    data: subInfo,
    refetch: subInfoRefetch,
    isLoading: subInfoLoading,
  } = useQuery({
    queryKey: ["get-submissionDetails", subId],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-submissionDetails?subId=${subId}`
      ).then((res) => res.json()),
  });

  return { subInfo, subInfoRefetch, subInfoLoading };
};

export default useGetSubmissionInfo;
