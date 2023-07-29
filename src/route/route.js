import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Home from "../layouts/Main/pages/HomePage/Home";
import SignIn from "../layouts/Main/pages/SignIn/SignIn";
import SignUp from "../layouts/Main/pages/SignUp/SignUp";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";
import Profile from "../layouts/Dashboard/pages/Profile/Profile";
import Friends from "../layouts/Dashboard/pages/Friends/Friends";
import PrivateRoute from "./PrivateRoute";
import Peoples from "../layouts/Dashboard/pages/Peoples/Peoples";
import FriendRequests from "../layouts/Dashboard/pages/FriendRequests/FriendRequests";
import Vchat from "../layouts/Vchat/Vchat";
import ChatRooms from "../layouts/Vchat/pages/ChatRooms/ChatRooms";
import CreateClass from "../layouts/Dashboard/pages/CreateClass/CreateClass";
import MyClasses from "../layouts/Dashboard/pages/MyClasses/MyClasses";
import ClassDetails from "../layouts/Dashboard/pages/ClassDetails/ClassDetails";
import Stream from "../layouts/Dashboard/pages/ClassDetails/sections/Stream/Stream";
import Assignments from "../layouts/Dashboard/pages/ClassDetails/sections/Assignments/Assignments";
import Members from "../layouts/Dashboard/pages/ClassDetails/sections/Members/Members";
import AssignmentDetails from "../layouts/Dashboard/pages/ClassDetails/AssignmentDetails/AssignmentDetails";
import AnnouncementDetails from "../layouts/Dashboard/pages/ClassDetails/AnnouncementDetails/AnnouncementDetails";
import SubmissionDetails from "../layouts/Dashboard/pages/ClassDetails/SubmissionDetails/SubmissionDetails";
import JoinClass from "../layouts/Dashboard/pages/JoinClass/JoinClass";
import PageNotFound from "../404/404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/friends",
        element: (
          <PrivateRoute>
            <Friends></Friends>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/peoples",
        element: (
          <PrivateRoute>
            <Peoples></Peoples>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/friend-requests",
        element: (
          <PrivateRoute>
            <FriendRequests></FriendRequests>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/create-class",
        element: (
          <PrivateRoute>
            <CreateClass></CreateClass>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-classes",
        element: <MyClasses></MyClasses>,
      },
      {
        path: "/dashboard/join-class",
        element: <JoinClass></JoinClass>,
      },
      {
        path: "/dashboard/class-details/:id",
        element: <ClassDetails></ClassDetails>,
        children: [
          {
            path: "/dashboard/class-details/:id/stream",
            element: <Stream></Stream>,
          },
          {
            path: "/dashboard/class-details/:id/assignments",
            element: <Assignments></Assignments>,
          },
          {
            path: "/dashboard/class-details/:id/members",
            element: <Members></Members>,
          },
          {
            path: "/dashboard/class-details/:id/assignments/:assignmentId",
            element: <AssignmentDetails></AssignmentDetails>,
          },
          {
            path: "/dashboard/class-details/:id/announcements/:announcementId",
            element: <AnnouncementDetails></AnnouncementDetails>,
          },
          {
            path: "/dashboard/class-details/:id/assignments/:assignmentId/submission/:subId",
            element: <SubmissionDetails></SubmissionDetails>,
          },
        ],
      },
    ],
  },
  {
    path: "/vchat",
    element: (
      <PrivateRoute>
        <Vchat></Vchat>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/vchat/chat-room/:id",
        element: <ChatRooms></ChatRooms>,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

export default router;
