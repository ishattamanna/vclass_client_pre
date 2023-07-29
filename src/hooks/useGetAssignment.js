import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetAssignment = (assignmentId) => {
  const {
    data: asnment,
    isLoading: assignmentLaoding,
    refetch: assignemntRefetch,
  } = useQuery({
    queryKey: ["get-assignment-details", assignmentId],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-assignment-details?id=${assignmentId}`
      ).then((res) => res.json()),
  });

  return { asnment, assignemntRefetch, assignmentLaoding };
};

export default useGetAssignment;
