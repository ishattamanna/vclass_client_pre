import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useGetClassMembers from "../../../../../../hooks/useGetClassMembers";
import MemberCard from "./components/MemberCard";
import AddFriendIcon from "../../../../../../tools/icons/AddFriendIcon";
import useGetClass from "../../../../../../hooks/useGetClass";
import AddMemberModal from "./components/AddMemberModal";
import { AuthContext } from "../../../../../../contexts/AuthProvider";

const Members = () => {
  const { id } = useParams();

  const { members } = useGetClassMembers(id);
  const { cls } = useGetClass(id);
  const { authUser } = useContext(AuthContext);

  return (
    <div className="mt-5 lg:px-20 px-2">
      <div className="my-4">
        <div className="border-b-2">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">Teacher</p>
          </div>
        </div>
        <div>{<MemberCard clsId={id} teacher={cls?.classTeacher} />}</div>
      </div>
      <div>
        <div className="border-b-2">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">Students</p>
            <div className="flex items-center">
              <p className="mr-2">{members?.length - 1} students</p>
              {authUser?.email === cls?.classTeacher && (
                <label
                  htmlFor="addMembersModal"
                  className="btn btn-ghost btn-circle"
                >
                  <AddFriendIcon className={"w-6 h-6"} />
                </label>
              )}
            </div>
          </div>
        </div>
        {members?.map((member, i) => (
          <MemberCard clsId={id} member={member} key={i} />
        ))}
      </div>
      {id && <AddMemberModal clsId={id} />}
    </div>
  );
};

export default Members;
