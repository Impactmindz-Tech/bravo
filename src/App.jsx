import { RouterProvider } from "react-router-dom";
import "./App.css";
import Routing from "./route/Routing";
import router from "./route/Routing";
import { Toaster } from 'react-hot-toast';
import "react-country-state-city/dist/react-country-state-city.css";


function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
