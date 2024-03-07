import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import LoginPage from "../pages/Login";
import DefaultLayout from "../layouts/DefaultLayout";
import RedirectTo from "./RedirectTo";
import ProtectedRoutes from "./ProtectedRoutes";
import HomePage from "../pages/Home";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<RedirectTo />} />
      <Route element={<DefaultLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>

      {/* Private routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="home" element={<HomePage />} />
      </Route>
    </Route>
  )
);
