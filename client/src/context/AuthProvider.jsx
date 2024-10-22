import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (user?.uid) {
        console.log("[From AuthProvider]", { user });
        setUser(user);
        localStorage.setItem("accessToken", user.accessToken);
        return;
      }

      // reset user info
      setUser(null);
      localStorage.clear();
      navigate("/login");
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
