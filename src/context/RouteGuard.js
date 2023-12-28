import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";

export default function RouteGuard({ children }) {
  const { userAuthStatus, userDetails } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (userAuthStatus === undefined) {
      // User status is still being determined, keep showing loading
      return;
    }

    if (!userAuthStatus) {
      // User is not authenticated, redirect to /auth

      if (router.pathname !== "/auth") {
        router.push("/auth");
      }
      return;
    }

    if (userDetails === undefined) {
      // User details still loading, keep showing loading
      return;
    }

    if (!userDetails?.hasCompletedOnboarding) {
      if (router.pathname !== "/onboarding") {
        // User is authenticated but hasn't completed onboarding
        router.push("/onboarding");
      }
      return;
    }

    if (router.pathname === "/auth" || router.pathname === "/onboarding") {
      // Authenticated user should not be on /auth page
      router.push("/");
      return;
    }
  }, [userAuthStatus, userDetails, router]);

  // if (
  //   userAuthStatus === undefined ||
  //   userDetails === undefined ||
  //   //Everytime the app mounts, determining the userAuthStatus's authentication is the first thing we do. and userAuthStatus === undefined signifies that we are in the process of verifying the userAuthStatus's authentiation.
  //   (!userAuthStatus && router.pathname !== "/auth") ||
  //   (userAuthStatus && router.pathname === "/auth") ||
  //   (userAuthStatus &&
  //     !userDetails?.hasCompletedOnboarding &&
  //     router.pathname !== "/onboarding") ||
  //   (userAuthStatus &&
  //     userDetails?.hasCompletedOnboarding &&
  //     router.pathname === "/onboarding")
  // ) {
  //   // Show a loading state or null while determining the correct route
  //   return <div>......................................Redirecting...</div>;
  // }

  if (
    userAuthStatus === undefined ||
    //Everytime the app mounts, determining the userAuthStatus's authentication is the first thing we do. and userAuthStatus === undefined signifies that we are in the process of verifying the userAuthStatus's authentiation.
    (!userAuthStatus && router.pathname !== "/auth") ||
    (userAuthStatus && router.pathname === "/auth") ||
    (userAuthStatus &&
      userDetails?.hasCompletedOnboarding === false &&
      router.pathname !== "/onboarding") ||
    (userAuthStatus &&
      userDetails?.hasCompletedOnboarding === true &&
      router.pathname === "/onboarding")
  ) {
    // Show a loading state or null while determining the correct route
    return <div>......................................Redirecting...</div>;
  }

  return children;
}
