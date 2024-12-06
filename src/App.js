import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginSignup from "./LoginSignup";
import TestPage from "./testpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/testpage" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
