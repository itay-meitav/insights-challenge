import { createBrowserRouter, redirect } from "react-router-dom";
import Pastes from "./pastes/Pastes";
import Statistics from "./statistics/Statistics";
import Tags from "./tags/Tags";
import Template from "./template/Template";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      { path: "pastes", element: <Pastes />, index: true },
      { path: "statistics", element: <Statistics /> },
      { path: "tags", element: <Tags /> },
    ],
  },
]);
