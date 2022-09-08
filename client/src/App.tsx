import React, { useEffect, useState } from "react";
import "./css/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Template from "./components/Template";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Template>
        <Routes>
          <Route path="/" element={<div>hey</div>} />
        </Routes>
      </Template>
    </Router>
  );
}

export default App;
