import { useQuery } from "@tanstack/react-query";

const useGetSubByAs = (asId) => {
  const {
    data: asSubs,
    refetch: asSubsRefetch,
    isLoading: asSubsLoading,
  } = useQuery({
    queryKey: ["get-submission-by-asnmnt", asId],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-submission-by-asnmnt?assignmentId=${asId}`
      ).then((res) => res.json()),
  });

  return { asSubs, asSubsRefetch, asSubsLoading };
};

export default useGetSubByAs;
