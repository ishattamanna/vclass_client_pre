import React from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import StreamIcon from "../../../../tools/icons/StreamIcon";
import DocumentIcon from "../../../../tools/icons/DocumentIcon";
import PeopleIcon from "../../../../tools/icons/PeopleIcon";
import useGetDBUser from "../../../../hooks/useGetDBUser";
import useGetClass from "../../../../hooks/useGetClass";

const ClassDetails = () => {
  const { id } = useParams();

  const { pathname } = useLocation();
  const lastPath = pathname?.split("/")[pathname.split("/").length - 1];

  const { cls } = useGetClass(id);
  const { dbUser } = useGetDBUser(cls?.classTeacher);
  return (
    <div>
      <div
        className={`tabs tabs-boxed hidden  ${
          lastPath !== "assignments" &&
          lastPath !== "stream" &&
          lastPath !== "members"
            ? "lg:hidden"
            : "lg:flex"
        }`}
      >
        <Link
          to={`/dashboard/class-details/${id}/stream`}
          className={`tab w-[33%] ${
            pathname.split("/")[pathname.split("/").length - 1] === "stream"
              ? "tab-active"
              : ""
          }`}
        >
          Stream
        </Link>
        <Link
          to={`/dashboard/class-details/${id}/assignments`}
          className={`tab w-[33%] ${
            pathname.split("/")[pathname.split("/").length - 1] ===
            "assignments"
              ? "tab-active"
              : ""
          }`}
        >
          Assignments
        </Link>
        <Link
          to={`/dashboard/class-details/${id}/members`}
          className={`tab w-[33%] ${
            pathname.split("/")[pathname.split("/").length - 1] === "members"
              ? "tab-active"
              : ""
          }`}
        >
          Members
        </Link>
      </div>
      <section
        className={`w-full h-[30vh] mb-12 lg:mb-44 ${
          lastPath !== "assignments" &&
          lastPath !== "stream" &&
          lastPath !== "members"
            ? "hidden"
            : ""
        }`}
      >
        <div
          className="hero lg:h-[50vh] h-[30vh]"
          style={{
            backgroundImage:
              "url(https://i.pinimg.com/originals/c0/c4/f0/c0c4f06b14625c8fb9c4cdcbaa58c6d8.png)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-3xl lg:text-5xl font-bold">
                {cls?.className}
              </h1>
              <p className="mb-5">{cls?.subject}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <div className="avatar -mt-20 shadow-md lg:-mt-40 rounded-full lg:ml-10 ml-5">
            <div className="lg:w-40 w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img className="w-full" src={dbUser?.profilePic} alt="" />
            </div>
          </div>
          <p className="lg:text-3xl text-xl font-bold">{dbUser?.userName}</p>
        </div>
      </section>
      <div className="w-full pb-20">
        <Outlet></Outlet>
      </div>
      <div
        className={`btm-nav lg:hidden ${
          lastPath !== "assignments" &&
          lastPath !== "stream" &&
          lastPath !== "members"
            ? "hidden"
            : ""
        }`}
      >
        <Link
          to={`/dashboard/class-details/${id}/stream`}
          className={`text-primary ${
            pathname.split("/")[pathname.split("/").length - 1] === "stream"
              ? "active"
              : ""
          }`}
        >
          <StreamIcon className={"w-6 h-6"} />
          Stream
        </Link>
        <Link
          to={`/dashboard/class-details/${id}/assignments`}
          className={`text-primary ${
            pathname.split("/")[pathname.split("/").length - 1] ===
            "assignments"
              ? "active"
              : ""
          }`}
        >
          <DocumentIcon />
          Assignments
        </Link>
        <Link
          to={`/dashboard/class-details/${id}/members`}
          className={`text-primary ${
            pathname.split("/")[pathname.split("/").length - 1] === "members"
              ? "active"
              : ""
          }`}
        >
          <PeopleIcon />
          Members
        </Link>
      </div>
    </div>
  );
};

export default ClassDetails;
