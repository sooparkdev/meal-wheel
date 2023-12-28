import { useState, useEffect, createContext, useContext } from "react";
import { login, logout, onUserStateChange } from "@/lib/firebase/authClient";
import axios from "axios";

const AuthContext = createContext();

// if user is authenticated(logged in), fetch user doc from firestore
// Q: is it better to do it immedietaly after when the login was successful? i am worried  about the timing and delays and stuff?

export function AuthContextProvider({ children }) {
  const [userAuthStatus, setUserAuthStatus] = useState();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const unsubscribe = onUserStateChange(async (firebaseAuthUser) => {
      setUserAuthStatus(firebaseAuthUser);
      // if (firebaseAuthUser && !userDetails) {
      //   try {
      //     const uid = firebaseAuthUser.uid;
      //     const firebaseFirestoreUser = await axios.get("/api/users/getUser", {
      //       params: { uid },
      //     });
      //     setUserDetails(firebaseFirestoreUser.data.user);
      //   } catch (error) {
      //     console.error("Error fetching user data:", error);
      //   }
      // }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchUserDetails() {
      if (userAuthStatus) {
        try {
          const uid = userAuthStatus.uid;
          const firebaseFirestoreUser = await axios.get(
            "/api/users/getOrCreateUser",
            {
              params: { uid },
            }
          );
          setUserDetails(firebaseFirestoreUser.data.user);
        } catch (error) {
          console.error("Error getting or creating user data:", error);
        }
      }
    }
    fetchUserDetails();
  }, [userAuthStatus]);

  return (
    <AuthContext.Provider
      value={{
        userAuthStatus,
        userDetails,
        setUserDetails,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuthContext() {
  return useContext(AuthContext);
}
