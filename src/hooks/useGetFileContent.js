import { useQuery } from "@tanstack/react-query";

const useGetFileContent = (fileName) => {
  const {
    data: file,
    refetch: fileRefetch,
    isLoading: fileLoading,
  } = useQuery({
    queryKey: ["get-uploaded-file-content", fileName],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_serverSiteLink}get-uploaded-file-content?fileName=${fileName}`
      ).then((res) => res.blob()),
  });

  return { file, fileRefetch, fileLoading };
};

export default useGetFileContent;
