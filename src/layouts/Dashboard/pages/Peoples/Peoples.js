import React, { useEffect, useState } from "react";
import useGetAllUsers from "../../../../hooks/useGetAllUsers";
import PeoplesCard from "./sections/PeoplesCard";
import TextField from "../../../../tools/inputs/TextField";

const Peoples = () => {
  const { users, usersLoading, usersRefetch } = useGetAllUsers();

  const [requiredUsers, setRequiredUsers] = useState([]);

  useEffect(() => {
    if (users) {
      setRequiredUsers(users);
    }
  }, [users]);

  const handleRequiredUser = (event) => {
    if (event.target.value) {
      setRequiredUsers(
        users?.filter(
          (user) =>
            user?.email.includes(event.target.value) ||
            user?.userName.includes(event.target.value)
        )
      );
    } else {
      setRequiredUsers(users);
    }
  };

  return (
    <div className="lg:px-10 px-2 py-2">
      <TextField
        onChange={handleRequiredUser}
        placeholder={"Search people by name or email"}
        className={"w-full"}
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 mt-2">
        {requiredUsers?.map((user) => (
          <PeoplesCard key={user?._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Peoples;
