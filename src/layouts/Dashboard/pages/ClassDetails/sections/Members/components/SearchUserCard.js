import React from 'react';
import useGetClass from '../../../../../../../hooks/useGetClass';

const SearchUserCard = ({ user, clsId, setSelectedUsers, selectedUsers }) => {

    const { cls } = useGetClass(clsId)


    const handleSelectedUsers = () => {
        if (selectedUsers.includes(user?.email)) {
            setSelectedUsers(
                selectedUsers?.filter((usr) => usr !== user?.email)
            );
            console.log(selectedUsers)
        } else {
            setSelectedUsers((usr) => [...usr, user?.email]);
            console.log(selectedUsers);
        }
    }


    return (
        <div className={`flex items-center justify-between mt-2 px-4 ${cls?.classTeacher === user?.email && 'hidden'}`}>
            <div
                className="flex items-center w-full cursor-pointer"
            >
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={user?.profilePic} alt="" />
                    </div>
                </div>
                <p className="ml-2 font-bold">{user?.email}</p>
            </div>
            <input
                checked={selectedUsers?.includes(user?.email)}
                onClick={handleSelectedUsers}
                type="checkbox"
                className="checkbox checkbox-primary"
            />
        </div>
    );
};

export default SearchUserCard;