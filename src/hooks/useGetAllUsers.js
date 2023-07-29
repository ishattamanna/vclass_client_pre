import { useQuery } from "@tanstack/react-query";

const useGetAllUsers = () => {
  const {
    data: users,
    isLoading: usersLoading,
    refetch: usersRefetch,
  } = useQuery({
    queryKey: ["get-all-user"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_serverSiteLink}get-all-user`).then((res) =>
        res.json()
      ),
  });

  return { users, usersLoading, usersRefetch };
};

export default useGetAllUsers;
