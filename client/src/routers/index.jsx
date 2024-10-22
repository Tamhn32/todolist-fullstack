import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "../context/AuthProvider";
// eslint-disable-next-line react-refresh/only-export-components
const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />{" "}
      {/* This allows rendering children components within the AuthProvider context */}
    </AuthProvider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
          },
        ],
      },
      // {
      //   element: <Home />,
      //   path: "/",
      // },
    ],
  },
]);
