import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Template from "./components/Template";
import Index from "./components/Index";
import Statistics from "./components/Statistics";
import Keywords from "./components/Keywords";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.scss";

function App() {
  return (
    <Router>
      <Template>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/keywords" element={<Keywords />} />
        </Routes>
      </Template>
    </Router>
  );
}

export default App;
