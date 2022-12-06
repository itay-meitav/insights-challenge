import React, { useEffect } from "react";
import Navbar from "../Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

function Template() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/") navigate("pastes");
  }, []);

  return (
    <div className="flex flex-col align-items-center min-h-screen w-full bg-slate-100 ">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Template;
