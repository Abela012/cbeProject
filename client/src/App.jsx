import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import AppointmentList from "./pages/AppointmentList";
import CaseList from "./pages/CaseList";

import Registration from "./pages/Registration";
import RequireAuth from "./components/RequireAuth";
import PersistUser from "./components/PersistUser";
import CaseManagement from "./pages/CaseManagement";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import { rolesList } from "./util/userRoles";
import UserMangement from "./pages/UserMangement";
import UserList from "./pages/UserList";
import CategoryManagement from "./pages/CategoryManagement";
import OfficeManagement from "./pages/OfficeManagement";
import CategoryList from "./pages/CategoryList";
import OfficeList from "./pages/OfficeList";
import AppointmentManagement from "./pages/AppointmentManagement";
import RoleManagement from "./pages/RoleManagement";
import RoleList from "./pages/RoleList";
import Scheduler from "./pages/Scheduler";
import Dashboard from "./pages/Dashboard";
import UpcomingCase from "./pages/UpcomingCase";
import UpcomingTask from "./pages/UpcomingTask";
import UpcomingAppointment from "./pages/UpcomingAppointment";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <PersistUser />,
    children: [
      {
        path: "/secretary",
        element: <RequireAuth allowedRoles={[rolesList.secretary]} />,
        children: [
          {
            path: "",
            element: <Layout />,
            children: [
              {
                path: "manage-appointment",
                element: <AppointmentManagement />,
                children: [
                  {
                    index: true,
                    element: <Registration />,
                  },
                  {
                    path: "appointment-list",
                    element: <AppointmentList />,
                  },
                ],
              },
            ],
          },
        ],
      },
      // allow president, cos, vp
      {
        path: "/pv",
        element: (
          <RequireAuth allowedRoles={[rolesList.president, rolesList.vp]} />
        ),
        children: [
          {
            path: "",
            element: <Layout />,
            children: [
              {
                path: "",
                element: <Dashboard />,
              },
              {
                path: "upcoming-appointment",
                element: <UpcomingAppointment />,
              },
              {
                path: "manage-appointment",
                element: <AppointmentManagement />,
                children: [
                  {
                    index: true,
                    element: <Registration />,
                  },
                  {
                    path: "appointment-list",
                    element: <AppointmentList />,
                  },
                ],
              },
              {
                path: "case-management",
                element: <CaseManagement />,
                children: [
                  {
                    index: true,
                    element: <CaseList />,
                  },
                  {
                    path: "upcoming-case",
                    element: <UpcomingCase />,
                  },
                  {
                    path: "upcoming-task",
                    element: <UpcomingTask />,
                  },
                ],
              },
              {
                path: "scheduler",
                element: <Scheduler />,
              },
            ],
          },
        ],
      },
      // allow chief of staff
      {
        path: "/cos",
        element: <RequireAuth allowedRoles={[rolesList.cos]} />,
        children: [
          {
            path: "",
            element: <Layout />,
            children: [
              {
                path: "",
                element: <Dashboard />,
              },
              {
                path: "upcoming-appointment",
                element: <UpcomingAppointment />,
              },
              {
                path: "manage-appointment",
                element: <AppointmentManagement />,
                children: [
                  {
                    index: true,
                    element: <Registration />,
                  },
                  {
                    path: "appointment-list",
                    element: <AppointmentList />,
                  },
                ],
              },
              {
                path: "case-management",
                element: <CaseManagement />,
                children: [
                  {
                    index: true,
                    element: <CaseList />,
                  },
                  {
                    path: "upcoming-case",
                    element: <UpcomingCase />,
                  },
                  {
                    path: "upcoming-task",
                    element: <UpcomingTask />,
                  },
                ],
              },
              {
                path: "scheduler",
                element: <Scheduler />,
              },
            ],
          },
        ],
      },
      //  allow boredmembers and staff
      {
        path: "/bs",
        element: (
          <RequireAuth
            allowedRoles={[rolesList.boredMembers, rolesList.staff]}
          />
        ),
        children: [
          {
            path: "",
            element: <Layout />,
            children: [
              // {
              //   path: "manage-appointment",
              //   element: <AppointmentList />,
              // },
              {
                path: "case-management",
                element: <CaseManagement />,
                children: [
                  {
                    index: true,
                    element: <CaseList />,
                  },
                  {
                    path: "upcoming-case",
                    element: <UpcomingCase />,
                  },
                  {
                    path: "upcoming-task",
                    element: <UpcomingTask />,
                  },
                ],
              },
            ],
          },
        ],
      },
      //  allow admin
      {
        path: "/admin",
        element: <RequireAuth allowedRoles={[rolesList.admin]} />,
        children: [
          {
            path: "",
            element: <Layout />,
            children: [
              {
                path: "user-mangement",
                element: <UserMangement />,
                children: [
                  {
                    index: true,
                    element: <UserList />,
                  },
                ],
              },
              {
                path: "role-mangement",
                element: <RoleManagement />,
                children: [
                  {
                    index: true,
                    element: <RoleList />,
                  },
                ],
              },
              {
                path: "category-mangement",
                element: <CategoryManagement />,
                children: [
                  {
                    index: true,
                    element: <CategoryList />,
                  },
                ],
              },
              {
                path: "office-mangement",
                element: <OfficeManagement />,
                children: [
                  {
                    index: true,
                    element: <OfficeList />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "unautherized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
