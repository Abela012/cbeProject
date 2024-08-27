import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import AppointmentList from "./pages/AppointmentList";
import Case from "./pages/Case";
import CaseList from "./pages/CaseList";

import Registration from "./pages/Registration";
import RequireAuth from "./components/RequireAuth";
import PersistUser from "./components/PersistUser";
import CaseManagement from "./pages/CaseManagement";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import CreateUser from "./pages/CreateUser";
import { rolesList } from "./util/userRoles";
import UserMangement from "./pages/UserMangement";
import UserList from "./pages/UserList";

const router = createBrowserRouter([
  {
    path: "/login",
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
                path: "case-management",
                element: <CaseManagement />,
                children: [
                  {
                    index: true,
                    element: <Registration />,
                  },
                  {
                    path: "case",
                    element: <Case />,
                  },
                  {
                    path: "case-list",
                    element: <CaseList />,
                  },
                ],
              },
            ],
          },
        ],
      },
      // allow president, cos, vp
      {
        path: "/pvc",
        element: (
          <RequireAuth
            allowedRoles={[rolesList.president, rolesList.cos, rolesList.vp]}
          />
        ),
        children: [
          {
            path: "",
            element: <Layout />,
            children: [
              {
                path: "appointment-list",
                element: <AppointmentList />,
              },
              {
                path: "case-management",
                element: <CaseManagement />,
                children: [
                  {
                    index: true,
                    element: <Registration />,
                  },
                  {
                    path: "case",
                    element: <Case />,
                  },
                  {
                    path: "case-list",
                    element: <CaseList />,
                  },
                ],
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
              {
                path: "appointment-list",
                element: <AppointmentList />,
              },
              {
                path: "case-management",
                element: <CaseManagement />,
                children: [
                  {
                    path: "case-list",
                    element: <CaseList />,
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
                  {
                    path: "create-user",
                    element: <CreateUser />,
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
