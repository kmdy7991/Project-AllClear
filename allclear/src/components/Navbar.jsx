import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedInAtom } from "../stores/atoms";
import allclear from "../assets/allclear.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Navbar() {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const setIsLoggedInAtom = useSetRecoilState(isLoggedInAtom);
  const setIsLoggedIn = () => setIsLoggedInAtom((prev) => !prev);

  return (
    <>
      <NavbarContainer>
        <LogoContainer>
          <Link
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            to="/"
          >
            <Logo src={allclear} />
          </Link>
        </LogoContainer>
        {!isLoggedIn ? (
          <NavbarContent>
            <LoginLogoutButton onClick={setIsLoggedIn}>
              로그인
            </LoginLogoutButton>
          </NavbarContent>
        ) : (
          <NavbarContent>
            <div style={{ fontWeight: 600 }}>Super Admin</div>
            <LoginLogoutButton onClick={setIsLoggedIn}>
              로그아웃
            </LoginLogoutButton>
          </NavbarContent>
        )}
      </NavbarContainer>
    </>
  );
}

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #384351;
  height: 80px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18%;
  height: 100%;
  background-color: #20ade4;
`;

const LoginLogoutButton = styled.div`
  cursor: pointer;
  margin: 0 30px;
`;

const NavbarContent = styled.div`
  display: flex;
  width: 18%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  font-size: 16px;
`;

const Logo = styled.img`
  cursor: pointer;
  width: 80%;
`;

export default Navbar;
