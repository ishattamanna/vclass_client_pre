import { useQuery } from "@tanstack/react-query";

const useGetAssignmentsByClass = (classId) => {
  const {
    data: assignments = [],
    refetch: assignmentsRefetch,
    isLoading: assignmentsLoading,
  } = useQuery({
    queryKey: ["get-assignment-by-class", classId],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-assignment-by-class?classId=${classId}`
      ).then((res) => res.json()),
  });

  return { assignments, assignmentsLoading, assignmentsRefetch };
};

export default useGetAssignmentsByClass;
