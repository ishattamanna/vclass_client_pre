import { useQuery } from "@tanstack/react-query";
const useGetComments = (postId) => {
  const {
    data: comments,
    refetch: commentsRefetch,
    isLoading: commentsLoading,
  } = useQuery({
    queryKey: ["get-comments", postId],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-comments?postId=${postId}`
      ).then((res) => res.json()),
  });

  return { comments, commentsRefetch, commentsLoading };
};

export default useGetComments;
