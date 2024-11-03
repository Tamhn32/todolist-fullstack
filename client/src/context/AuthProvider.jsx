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

// import React, { createContext, useEffect, useState } from "react";
// import { getAuth } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null); // New state to store the ID token
//   const navigate = useNavigate();
//   const auth = getAuth();

//   useEffect(() => {
//     const unsubscribe = auth.onIdTokenChanged(async (user) => {
//       if (user?.uid) {
//         console.log("[From AuthProvider]", { user });
//         setUser(user);
//         const idToken = await user.getIdToken(); // Get the initial ID token
//         setToken(idToken); // Set the token in state
//         localStorage.setItem("accessToken", idToken); // Store the token in localStorage
//         return;
//       }

//       // Reset user info if not signed in
//       setUser(null);
//       setToken(null);
//       localStorage.clear();
//       navigate("/login");
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [auth, navigate]);

//   // Function to manually refresh the token
//   const refreshIdToken = async () => {
//     if (user) {
//       try {
//         const newToken = await user.getIdToken(true); // Force refresh the token
//         setToken(newToken); // Update state with new token
//         localStorage.setItem("accessToken", newToken); // Update localStorage with new token
//         return newToken;
//       } catch (error) {
//         console.error("Error refreshing ID token:", error);
//         // Optionally, handle re-authentication or other actions here
//       }
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, refreshIdToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
