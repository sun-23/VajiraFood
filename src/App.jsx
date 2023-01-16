import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import CreateReport from "./routes/CreateReport";
import ListAllProblems from "./routes/ListAllProblems";
import EditStatus from "./routes/EditStatus";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { AuthProvider } from "./helper/auth/Context";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new_rep" element={<CreateReport />} />
          <Route path="/problems" element={<ListAllProblems />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/problems/:id"
            element={
              <RequireAuth>
                <EditStatus />
              </RequireAuth>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
