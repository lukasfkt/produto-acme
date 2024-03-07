import { useUser } from "../hooks/useUser";
import { Navigate } from "react-router-dom";

export default function RedirectTo() {
  const { verifyUser } = useUser();
  const { redirectTo } = verifyUser();

  if (redirectTo === "home") return <Navigate to="/home" />;

  return <Navigate to="/login" />;
}
