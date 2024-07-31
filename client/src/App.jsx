import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";

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
        path: "case",
        element: <h2>Case</h2>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
