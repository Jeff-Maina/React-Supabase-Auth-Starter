import NavProfile from "@/components/nav-profile";
import type { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  return (
    <main className="w-full min-h-svh">
      <nav className="h-10 border-b flex items-center justify-end">
        <NavProfile />
      </nav>
      <Outlet />
    </main>
  );
};

export default MainLayout;
