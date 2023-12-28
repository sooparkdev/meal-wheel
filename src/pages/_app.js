import "@/styles/globals.css";
import SidebarNav from "@/components/SidebarNav";
import { AuthContextProvider } from "@/context/AuthContext";
import { useRouter } from "next/router";
import RouteGuard from "@/context/RouteGuard";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <AppLayout Component={Component} pageProps={pageProps} />
    </AuthContextProvider>
  );
}

function AppLayout({ Component, pageProps }) {
  const router = useRouter();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <RouteGuard>
      <div className="appLayout">
        {router.pathname !== "/auth" && router.pathname !== "/onboarding" && (
          <SidebarNav
            isExpanded={isSidebarExpanded}
            toggleSidebar={() => setIsSidebarExpanded((prev) => !prev)}
          />
        )}
        <div className={`page ${isSidebarExpanded ? "expanded" : ""}`}>
          <Component {...pageProps} />
        </div>
      </div>
    </RouteGuard>
  );

  // return (
  //   <>
  //     <RouteGuard>
  //       {router.pathname !== "/auth" && router.pathname !== "/onboarding" && (
  //         <SidebarNav />
  //       )}
  //       <Component {...pageProps} />
  //     </RouteGuard>
  //   </>
  // );
}
