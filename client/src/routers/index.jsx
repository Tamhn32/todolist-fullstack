import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "../context/AuthProvider";
import ErrorPage from "../pages/ErrorPage";
import NoteList from "../components/NoteList";
import Note from "../components/Note";

// eslint-disable-next-line react-refresh/only-export-components
const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
      {/* This allows rendering children components within the AuthProvider context */}
    </AuthProvider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
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
            loader: async () => {
              const query = `query ExampleQuery {
                folders {
                  id
                   name
                 createAt
               }
                  }`;

              const res = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  query,
                }),
              });

              const { data } = await res.json();
              console.log({ data });
              return data;
            },
            children: [
              {
                element: <NoteList />,
                path: `folders/:folderId`,
                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
                  },
                ],
              },
            ],
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
