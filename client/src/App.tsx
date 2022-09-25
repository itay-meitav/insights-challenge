import React, { createContext, useEffect, useState } from "react";
import "./css/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Template from "./components/Template";
import Index from "./components/Index";
import "bootstrap/dist/css/bootstrap.min.css";
import Statistics from "./components/Statistics";
import Keywords from "./components/Keywords";
import Alerts from "./components/Alerts";
import ToastContainer from "./components/ToastContainer";

function App() {
  return (
    <Router>
      <ToastContainer>
        <Template>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/keywords" element={<Keywords />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </Template>
      </ToastContainer>
    </Router>
  );
}

export default App;
