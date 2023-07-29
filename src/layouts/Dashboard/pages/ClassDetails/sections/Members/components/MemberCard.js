import React from 'react';
import useGetDBUser from '../../../../../../../hooks/useGetDBUser';
import useGetClass from '../../../../../../../hooks/useGetClass';

const MemberCard = ({ member, clsId, teacher }) => {

    const { dbUser } = useGetDBUser(member)
    const { dbUser: dbTeacher } = useGetDBUser(teacher)
    const { cls } = useGetClass(clsId)

    return (
        <div className={`flex items-center justify-between mt-2 ${cls?.classTeacher === member && 'hidden'}`}>
            <div
                className="flex items-center w-full cursor-pointer"
            >
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={dbUser?.profilePic || dbTeacher?.profilePic} alt="" />
                    </div>
                </div>
                <p className="ml-2 font-bold">{dbUser?.userName || dbTeacher?.userName}</p>
            </div>
        </div>
    );
};

export default MemberCard;