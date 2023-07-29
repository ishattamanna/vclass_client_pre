import { useQuery } from '@tanstack/react-query';

const useGetClassMembers = (clsId) => {
    const { data: members, refetch: membersRefetch, isLoading: membersLoading } = useQuery({
        queryKey: ['get-class-members', clsId],
        queryFn: () => fetch(`${process.env.REACT_APP_serverSiteLink}get-class-members?classId=${clsId}`).then(res => res.json())
    })

    return { members, membersLoading, membersRefetch }
};

export default useGetClassMembers;