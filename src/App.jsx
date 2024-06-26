import { RouterProvider } from "react-router-dom";
import "./App.css";
import Routing from "./route/Routing";
import router from "./route/Routing";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
