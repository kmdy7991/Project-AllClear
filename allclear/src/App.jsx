import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Monitoring from "./components/Monitoring.jsx";
import Statistics from "./components/Statistics.jsx";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <div className="container">
            <Navbar />
            <div className="main-container">
              <div className="sidebar-container">
                <Sidebar />
              </div>
              <div className="content-container">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />}></Route>
                  <Route path="/monitoring" element={<Monitoring />}></Route>
                  <Route path="/statistics" element={<Statistics />}></Route>
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
