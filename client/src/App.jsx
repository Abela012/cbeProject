import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import AppointmentList from "./pages/AppointmentList";
import Case from "./pages/Case";
import Registration from "./pages/Registration";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
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
        path: "case",
        element: <Case />,
      },
      {
        path: "register",
        element: <Registration />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
