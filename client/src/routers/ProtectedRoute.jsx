import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

// import { useContext } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { AuthContext } from "../context/AuthProvider";

// export default function ProtectedRoute({children}) {
//   const { user } = useContext(AuthContext);

//   // Check if user is not authenticated and redirect to login page
//   if (!user?.uid) {
//     return <Navigate to="/login" replace />;
//   }

//   // If user is authenticated, render the child components
//   return <Outlet />;
// }
