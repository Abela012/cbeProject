import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import AppointmentList from "./pages/AppointmentList";
import Case from "./pages/Case";

import CaseList from "./pages/CaseList";

import Registration from "./pages/Registration";
import RequireAuth from "./components/RequireAuth";
import PersistUser from "./components/PersistUser";
import CaseManagement from "./pages/CaseManagement";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <PersistUser />,
    children: [
      {
        path: "/",
        element: <RequireAuth allowedRoles={[1234, 4321]} />,
        children: [
          {
            path: "",
            element: <Layout />,
            children: [
              {
                index: true,
                element: <Appointment />,
              },
              {
                path: "appointment-list",
                element: <AppointmentList />,
              },
              {
                path:'case-management',
                element: <CaseManagement />,
                children:[
                  {
                    index:true,
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

                ]
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "unautherized",
    element: <h2> Unautherized :(</h2>,
  },
  {
    path: "*",
    element: <h2> 404 Not found :(</h2>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
