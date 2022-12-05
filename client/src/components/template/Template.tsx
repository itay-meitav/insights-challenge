import React, { useEffect } from "react";
import Navbar from "../Navbar";
import { Outlet, useNavigate } from "react-router-dom";

function Template() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname == "/") navigate("pastes");
  }, []);
  return (
    <div className="template">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Template;
