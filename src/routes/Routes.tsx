import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import LoginPage from "../pages/Login";
import DefaultLayout from "../layouts/DefaultLayout";
import RedirectTo from "./RedirectTo";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<RedirectTo />} />
      <Route element={<DefaultLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Route>
  )
);
