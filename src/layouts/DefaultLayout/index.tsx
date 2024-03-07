import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <main className="w-screen h-screen overflow-hidden">
      <Outlet />
    </main>
  );
}
