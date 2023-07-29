import React, { useRef } from "react";
import useGetDBUser from "../../../../../hooks/useGetDBUser";

const FriendsSearchCard = ({ friend, setSelectedMembers, selectedMembers }) => {
  const { dbUser } = useGetDBUser(friend);

  const handleSelectedMembers = () => {
    // checkPoint.current.click();
    if (selectedMembers.includes(friend)) {
      setSelectedMembers(
        selectedMembers?.filter((member) => member !== friend)
      );
    } else {
      setSelectedMembers((member) => [...member, friend]);
      console.log(selectedMembers);
    }
  };

  return (
    <div className="flex items-center justify-between mt-2">
      <div
        onClick={handleSelectedMembers}
        className="flex items-center w-full cursor-pointer"
      >
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={dbUser?.profilePic} alt="" />
          </div>
        </div>
        <p className="ml-2 font-bold">{dbUser?.userName}</p>
      </div>
      <input
        onClick={handleSelectedMembers}
        checked={selectedMembers?.includes(friend)}
        type="checkbox"
        className="checkbox checkbox-primary"
      />
    </div>
  );
};

export default FriendsSearchCard;
