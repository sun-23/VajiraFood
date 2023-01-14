import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import CreateReport from "./routes/CreateReport";
import ListAllProblems from "./routes/ListAllProblems";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new_rep" element={<CreateReport />} />
        <Route path="/problems" element={<ListAllProblems />} />
      </Routes>
      <Footer />
    </Router>
  );
}
