import { useContext, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";
import { graphQLRequest } from "../utils/request";

export default function Login() {
  const auth = getAuth();
  //const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const {
        user: { uid, displayName },
      } = await signInWithPopup(auth, provider);
      const { data } = await graphQLRequest({
        query: `mutation register($uid: String!, $name: String!) {
          register(uid: $uid, name: $name) {
            uid
            name
          }
        }`,
        variables: { uid, name: displayName },
      });
      console.log({ data });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  if (localStorage.getItem("accessToken")) {
    // navigate("/"); // Redirect to home if user is already authenticated
    return <Navigate to="/" />;
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Welcome to Note App
      </Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  );
}
