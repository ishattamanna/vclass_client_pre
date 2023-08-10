import React from "react";
import useGetDBUser from "../../../../../hooks/useGetDBUser";
import { Link } from "react-router-dom";

const ClassesCard = ({ classImages, imgNumber, cls }) => {
  const { className, subject, classDetails, classTeacher, members, _id } = cls;

  const { dbUser } = useGetDBUser(classTeacher);

  return (
    <Link
      to={`/dashboard/class-details/${_id}/stream`}
      className="card static lg:h-32 h-[40vh] bg-base-100 shadow-xl image-full cursor-pointer"
    >
      <figure>
        <img className="w-full" src={classImages[imgNumber]} alt={className} />
      </figure>
      <div className="card-body static text-start">
        <h2>{className}</h2>
        <div>
          <p>{subject.length > 10 ? subject.slice(0, 10) + ' ...' : subject}</p>
          <p>{dbUser?.userName}</p>
        </div>
      </div>
    </Link>
  );
};

export default ClassesCard;
