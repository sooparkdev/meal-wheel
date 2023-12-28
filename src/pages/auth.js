import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import { isNewUser } from "@/lib/firebase/authClient";
import { useRouter } from "next/router";
import { useState } from "react";

const AuthPage = () => {
  const router = useRouter();
  const { login } = useAuthContext();
  // const [isLoginInProcess, setIsLoginInProcess] = useState(false);

  const handleLogin = async () => {
    // if (isLoginInProcess) {
    //   return;
    // }

    // setIsLoginInProcess(true);

    try {
      const userCredential = await login(); //userCredential.user.uid
      console.log("user credential", userCredential);
      checkIfNewUser(userCredential);
    } catch (error) {
      // show try again UI
      console.error("Login failed:", error);
    } 
    // finally {
    //   setIsLoginInProcess(false);
    // }
  };

  const checkIfNewUser = async (userCredential) => {
    if (isNewUser(userCredential)) {
      console.log("User is logging in for the first time.");
    } else {
      console.log("User has singed in before");
    }
  };

  // const checkIfNewUser = async (userCredential) => {
  //   if (isNewUser(userCredential)) {
  //     setIsFirstTimeLogin(true);
  //     console.log("User is logging in for the first time.");

  //     const uid = userCredential.user.uid;
  //     try {
  //       await axios.post("/api/users/createUser", { uid : uid });
  //       router.push('/onboarding');
  //     } catch (error) {
  //       console.error("Error creating user:", error);
  //     }
  //   } else {
  //     setIsFirstTimeLogin(false);
  //     console.log("User has singed in before");

  //   }
  // };

  return (
    <>
      <h1>Welcome</h1>
      <button onClick={handleLogin}>Log In</button>
    </>
  );
};

export default AuthPage;
