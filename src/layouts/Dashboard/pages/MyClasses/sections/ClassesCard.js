import React from "react";
import useGetDBUser from "../../../../../hooks/useGetDBUser";
import { Link } from "react-router-dom";

const ClassesCard = ({ classImages, imgNumber, cls }) => {
  const { className, subject, classDetails, classTeacher, members, _id } = cls;

  const { dbUser } = useGetDBUser(classTeacher);

  return (
    <Link
      to={`/dashboard/class-details/${_id}/stream`}
      className="card lg:h-32 h-[40vh] bg-base-100 shadow-xl image-full cursor-pointer"
    >
      <figure>
        <img className="w-full" src={classImages[imgNumber]} alt="Shoes" />
      </figure>
      <div className="card-body text-start">
        <h2 className="card-title">{className}</h2>
        <div>
          <p>{subject}</p>
          <p>{dbUser?.userName}</p>
        </div>
      </div>
    </Link>
  );
};

export default ClassesCard;
