import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Suggest from "./routes/Suggest";
import Food from "./routes/Food";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./routes/Login";
import Account from "./routes/Account";
import Signup from "./routes/Signup";

import { AuthProvider } from "./helper/auth/Context";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}/>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/suggest"
            element={
              <RequireAuth>
                <Suggest />
              </RequireAuth>
            }
          />
          {/* <Route
            path="/account"
            element={
              <RequireAuth>
                <Account />
              </RequireAuth>
            }
          /> */}
          <Route
            path="/food/:id"
            element={
              <RequireAuth>
                <Food />
              </RequireAuth>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
