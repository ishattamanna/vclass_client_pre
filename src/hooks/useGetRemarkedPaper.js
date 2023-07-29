import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetRemarkedPaper = (assifnmentId, studentEmail) => {
  const {
    data: remarkedPaper,
    refetch: remarkedPaperRefetch,
    isLoading: remarkedPaperLoading,
  } = useQuery({
    queryKey: ["get-remarked-paper", assifnmentId, studentEmail],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-remarked-paper?assifnmentId=${assifnmentId}&studentEmail=${studentEmail}&`
      ).then((res) => res.json()),
  });

  return { remarkedPaper, remarkedPaperRefetch, remarkedPaperLoading };
};

export default useGetRemarkedPaper;
