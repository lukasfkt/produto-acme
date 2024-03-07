import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes";
import "./App.css";

import ToastContainer from "./components/Toast/ToastContainer";

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
