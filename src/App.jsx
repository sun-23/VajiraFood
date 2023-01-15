import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import CreateReport from "./routes/CreateReport";
import ListAllProblems from "./routes/ListAllProblems";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./routes/Dashboard";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new_rep" element={<CreateReport />} />
        <Route path="/problems" element={<ListAllProblems />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}
