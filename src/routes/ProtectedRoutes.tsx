import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "../hooks/useUser";

export default function ProtectedRoutes() {
  const { verifyUser } = useUser();
  const { redirectTo } = verifyUser();

  if (redirectTo === "login") return <Navigate to="/login" />;

  return <Outlet />;
}
