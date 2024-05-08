import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Monitoring from "./components/Monitoring.jsx";
import Statistics from "./components/Statistics.jsx";

import Login from "./components/Login.jsx";
import Join from "./components/Join.jsx";
import { isLoggedInAtom } from "./recoil/login/login";
import { useRecoilValue } from "recoil";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

function App() {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  return (
    <>
      <BrowserRouter>
        {isLoggedIn ? (
          <Container>
            <Navbar />
            <MainContainer>
              <SidebarContainer>
                <Sidebar />
              </SidebarContainer>
              <ContentContainer>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/monitoring" element={<Monitoring />} />
                  <Route path="/statistics" element={<Statistics />} />
                </Routes>
              </ContentContainer>
            </MainContainer>
          </Container>
        ) : (
          <Container>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Container>
        )}
      </BrowserRouter>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  height: calc(100% - 80px);
`;

const SidebarContainer = styled.div`
  width: 18%;
  height: 100%;
  border-right: 1px solid #324254;
`;

const ContentContainer = styled.div`
  width: 82%;
  border-left: 1px solid #324254;
`;

export default App;
