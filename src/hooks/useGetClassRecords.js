import { useQuery } from "@tanstack/react-query";

const useGetClassRecords = (classId) => {
  const {
    data: medias,
    refetch: mediasRefetch,
    isLoading: mediasLoading,
  } = useQuery({
    queryKey: ["get-class-medias", classId],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-class-medias?classId=${classId}`
      ).then((res) => res.json()),
  });

  return { medias, mediasRefetch, mediasLoading };
};

export default useGetClassRecords;
