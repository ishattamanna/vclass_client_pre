import { useQuery } from "@tanstack/react-query";

const useGetDBUser = (userEmail) => {
  const {
    data: dbUser,
    refetch: dbUserRefetch,
    isLoading: dbUserLoading,
  } = useQuery({
    queryKey: ["get-db-user", userEmail],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-db-user?email=${userEmail}`
      ).then((res) => res.json()),
  });

  return { dbUser, dbUserRefetch, dbUserLoading };
};

export default useGetDBUser;
