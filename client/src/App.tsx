import React, { useEffect, useState } from "react";
import "./css/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Template from "./components/Template";
import Index from "./components/Index";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Template>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </Template>
    </Router>
  );
}

export default App;
