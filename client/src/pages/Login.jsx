import { useContext, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      console.log({ res });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // Handle navigation after checking the user state
  useEffect(() => {
    if (user?.uid) {
      navigate("/"); // Redirect to home if user is already authenticated
    }
  }, [user, navigate]); // Only runs when 'user' or 'navigate' changes

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
