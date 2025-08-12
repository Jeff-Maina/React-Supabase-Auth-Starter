import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./auth/protected-route";
import MainLayout from "./layouts/main-layout";
import ForgotPassword from "./pages/auth/forgot-password";
import Login from "./pages/auth/login";
import Profile from "./pages/auth/profile";
import Signup from "./pages/auth/register";
import ResetPassword from "./pages/auth/reset-password";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import Reports from "./pages/reports";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
]);
