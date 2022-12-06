import "./App.scss";
import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import { router } from "./components/AppRoutes";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
