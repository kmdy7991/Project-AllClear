import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Monitoring from "./components/Monitoring.jsx";
import Statistics from "./components/Statistics.jsx";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Container>
            <Navbar />
            <MainContainer>
              <SidebarContainer>
                <Sidebar />
              </SidebarContainer>
              <ContentContainer>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />}></Route>
                  <Route path="/monitoring" element={<Monitoring />}></Route>
                  <Route path="/statistics" element={<Statistics />}></Route>
                </Routes>
              </ContentContainer>
            </MainContainer>
          </Container>
        </BrowserRouter>
      </RecoilRoot>
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
  overflow: scroll;
  width: 82%;
  border-left: 1px solid #324254;
`;
export default App;
