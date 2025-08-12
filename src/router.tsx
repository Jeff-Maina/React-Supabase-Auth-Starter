import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/login";
import { ProtectedRoute } from "./auth/protected-route";
import MainLayout from "./layouts/main-layout";
import Home from "./pages/home";
import Reports from "./pages/reports";
import NotFound from "./pages/not-found";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import Signup from "./pages/auth/register";

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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
]);
