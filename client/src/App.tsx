import "./App.scss";
import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import { router } from "./components/AppRoutes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
