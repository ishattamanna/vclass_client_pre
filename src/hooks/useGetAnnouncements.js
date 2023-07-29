import { useQuery } from "@tanstack/react-query";

const useGetAnnouncements = (classId) => {
  const {
    data: ansmnts,
    refetch: ansmntsRefetch,
    isLoading: ansmntsLoading,
  } = useQuery({
    queryKey: ["get-ansmnt-by-class", classId],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-ansmnt-by-class?classId=${classId}`
      ).then((res) => res.json()),
  });

  return { ansmnts, ansmntsRefetch, ansmntsLoading };
};

export default useGetAnnouncements;
